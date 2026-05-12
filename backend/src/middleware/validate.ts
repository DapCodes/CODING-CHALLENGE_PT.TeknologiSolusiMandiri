import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendBadRequest } from '../utils/response';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.type === 'field' ? err.path : 'unknown',
      message: err.msg,
    }));
    sendBadRequest(res, 'Validation failed', formattedErrors);
    return;
  }
  next();
};
