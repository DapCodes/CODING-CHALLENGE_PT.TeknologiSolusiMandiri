import { Response } from 'express';
import { ApiResponse, PaginationMeta } from '../types';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
  pagination?: PaginationMeta
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    ...(pagination && { pagination }),
  };
  return res.status(statusCode).json(response);
};

export const sendCreated = <T>(res: Response, data: T, message = 'Created successfully'): Response => {
  return sendSuccess(res, data, message, 201);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  errors?: Record<string, string>[]
): Response => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(response);
};

export const sendNotFound = (res: Response, resource = 'Resource'): Response => {
  return sendError(res, `${resource} not found`, 404);
};

export const sendBadRequest = (
  res: Response,
  message: string,
  errors?: Record<string, string>[]
): Response => {
  return sendError(res, message, 400, errors);
};
