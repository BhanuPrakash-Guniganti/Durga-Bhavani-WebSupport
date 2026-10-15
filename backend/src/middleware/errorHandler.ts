import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: statusCode === 500 && env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred. Please try again later.'
        : message,
      details: err.details || null,
      ...(env.NODE_ENV !== 'production' && { stack: err.stack })
    }
  });
};
