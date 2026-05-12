import { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { categoryService } from '../services/categoryService';
import { validate } from '../middleware/validate';
import { sendSuccess, sendCreated, sendNotFound, sendBadRequest } from '../utils/response';

export const categoryValidators = {
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name must not exceed 100 characters'),
    body('color')
      .optional()
      .matches(/^#([A-Fa-f0-9]{6})$/).withMessage('Color must be a valid hex color (e.g. #3B82F6)'),
    validate,
  ],
  update: [
    param('id').isInt({ min: 1 }).withMessage('Invalid category ID'),
    body('name')
      .optional()
      .trim()
      .notEmpty().withMessage('Name cannot be empty')
      .isLength({ max: 100 }).withMessage('Name must not exceed 100 characters'),
    body('color')
      .optional()
      .matches(/^#([A-Fa-f0-9]{6})$/).withMessage('Color must be a valid hex color'),
    validate,
  ],
};

export const categoryController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await categoryService.findAll();
      sendSuccess(res, categories);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, color } = req.body;
      const exists = await categoryService.nameExists(name);
      if (exists) {
        sendBadRequest(res, `Category "${name}" already exists`);
        return;
      }
      const category = await categoryService.create({ name, color });
      sendCreated(res, category, 'Category created successfully');
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { name, color } = req.body;

      if (name) {
        const exists = await categoryService.nameExists(name, id);
        if (exists) {
          sendBadRequest(res, `Category "${name}" already exists`);
          return;
        }
      }

      const category = await categoryService.update(id, { name, color });
      if (!category) {
        sendNotFound(res, 'Category');
        return;
      }
      sendSuccess(res, category, 'Category updated successfully');
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await categoryService.delete(id);
      if (!deleted) {
        sendNotFound(res, 'Category');
        return;
      }
      sendSuccess(res, null, 'Category deleted successfully');
    } catch (err) {
      next(err);
    }
  },
};
