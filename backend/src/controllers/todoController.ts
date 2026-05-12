import { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { todoService } from '../services/todoService';
import { validate } from '../middleware/validate';
import { sendSuccess, sendCreated, sendNotFound } from '../utils/response';
import { TodoFilters, PaginationParams } from '../types';

export const todoValidators = {
  create: [
    body('title')
      .trim()
      .notEmpty().withMessage('Title is required')
      .isLength({ max: 255 }).withMessage('Title must not exceed 255 characters'),
    body('description')
      .optional({ nullable: true })
      .isString().withMessage('Description must be a string'),
    body('category_id')
      .optional({ nullable: true })
      .isInt({ min: 1 }).withMessage('category_id must be a positive integer'),
    body('priority')
      .optional()
      .isIn(['high', 'medium', 'low']).withMessage('Priority must be high, medium, or low'),
    body('due_date')
      .optional({ nullable: true })
      .isISO8601().withMessage('due_date must be a valid ISO 8601 date'),
    validate,
  ],
  update: [
    param('id').isInt({ min: 1 }).withMessage('Invalid todo ID'),
    body('title')
      .optional()
      .trim()
      .notEmpty().withMessage('Title cannot be empty')
      .isLength({ max: 255 }).withMessage('Title must not exceed 255 characters'),
    body('description')
      .optional({ nullable: true })
      .isString(),
    body('completed')
      .optional()
      .isBoolean().withMessage('completed must be a boolean'),
    body('category_id')
      .optional({ nullable: true })
      .isInt({ min: 1 }).withMessage('category_id must be a positive integer'),
    body('priority')
      .optional()
      .isIn(['high', 'medium', 'low']).withMessage('Priority must be high, medium, or low'),
    body('due_date')
      .optional({ nullable: true })
      .isISO8601().withMessage('due_date must be a valid ISO 8601 date'),
    validate,
  ],
};

export const todoController = {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination: PaginationParams = {
        page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
      };

      const filters: TodoFilters = {
        search: req.query.search as string | undefined,
        sort_by: req.query.sort_by as TodoFilters['sort_by'],
        sort_order: (req.query.sort_order as 'ASC' | 'DESC') ?? 'DESC',
      };

      if (req.query.completed !== undefined) {
        filters.completed = req.query.completed === 'true';
      }
      if (req.query.category_id) {
        filters.category_id = parseInt(req.query.category_id as string, 10);
      }
      if (req.query.priority) {
        filters.priority = req.query.priority as TodoFilters['priority'];
      }

      const { todos, pagination: meta } = await todoService.findAll(filters, pagination);
      sendSuccess(res, todos, 'Todos retrieved successfully', 200, meta);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const todo = await todoService.findById(id);
      if (!todo) {
        sendNotFound(res, 'Todo');
        return;
      }
      sendSuccess(res, todo);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const todo = await todoService.create(req.body);
      sendCreated(res, todo, 'Todo created successfully');
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const todo = await todoService.update(id, req.body);
      if (!todo) {
        sendNotFound(res, 'Todo');
        return;
      }
      sendSuccess(res, todo, 'Todo updated successfully');
    } catch (err) {
      next(err);
    }
  },

  async toggleComplete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const todo = await todoService.toggleComplete(id);
      if (!todo) {
        sendNotFound(res, 'Todo');
        return;
      }
      sendSuccess(res, todo, `Todo marked as ${todo.completed ? 'completed' : 'incomplete'}`);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deleted = await todoService.delete(id);
      if (!deleted) {
        sendNotFound(res, 'Todo');
        return;
      }
      sendSuccess(res, null, 'Todo deleted successfully');
    } catch (err) {
      next(err);
    }
  },
};
