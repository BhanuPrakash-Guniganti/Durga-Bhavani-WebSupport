import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import apiRouter from './routes/index.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

export const createApp = (): Express => {
  const app = express();

  // 1. Configure Express to trust the reverse proxy (Render deploys behind 1 reverse proxy hop).
  // Setting trust proxy to 1 tells Express that the immediate proxy in front of it is trusted.
  // This allows Express to correctly resolve req.ip from the client IP appended by Render's proxy,
  // preventing client IP spoofing from forged X-Forwarded-For headers and resolving ERR_ERL_UNEXPECTED_X_FORWARDED_FOR.
  app.set('trust proxy', env.TRUST_PROXY);

  // Security HTTP headers
  app.use(helmet());

  // CORS configuration with support for trailing-slash normalization and multi-origins
  const configuredOrigins = (env.FRONTEND_ORIGIN || '')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, verify-api tests)
        if (!origin) {
          return callback(null, true);
        }
        const normalizedOrigin = origin.trim().replace(/\/+$/, '');
        const isAllowed =
          configuredOrigins.includes('*') ||
          configuredOrigins.includes(normalizedOrigin) ||
          configuredOrigins.includes(origin) ||
          (env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalizedOrigin));

        if (isAllowed) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      credentials: true
    })
  );

  // Rate limiting for standard API requests
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 300 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip || req.socket.remoteAddress || '127.0.0.1',
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests from this IP, please try again after 15 minutes.'
      }
    }
  });

  // Dedicated rate limiting for authentication/login requests to prevent brute force attacks
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 login attempts per window
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip || req.socket.remoteAddress || '127.0.0.1',
    message: {
      success: false,
      error: {
        code: 'AUTH_RATE_LIMIT_EXCEEDED',
        message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.'
      }
    }
  });

  app.use('/api/v1/auth/login', authLimiter);
  app.use('/api', apiLimiter);

  // Body and cookie parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Mount API v1 routes
  app.use('/api/v1', apiRouter);

  // 404 handler for unknown routes
  app.use(notFoundHandler);

  // Centralized error handler
  app.use(errorHandler);

  return app;
};
