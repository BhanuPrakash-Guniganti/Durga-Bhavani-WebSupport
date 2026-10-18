import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UserModel, IUser } from '../models/User.js';
import { isDbConnected } from '../config/db.js';

export interface AuthUserPayload {
  id: string;
  email: string;
  name: string;
  role: 'super-admin' | 'editor' | 'media-manager';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

/**
 * Checks whether an email address is authorized in the administrator allowlist.
 */
export const isEmailAllowed = (email: string): boolean => {
  const normalized = email.trim().toLowerCase();
  const allowed = env.ADMIN_ALLOWED_EMAILS.split(',').map((e) => e.trim().toLowerCase());
  return allowed.includes(normalized);
};

/**
 * Middleware to verify JWT token and attach user to Request.
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required. Please log in.' }
      });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUserPayload;

    // Check allowlist
    if (!isEmailAllowed(decoded.email)) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN_USER', message: 'Your account is not on the approved administrator allowlist.' }
      });
      return;
    }

    // If database is connected, check that user is active
    if (isDbConnected()) {
      const user = await UserModel.findOne({ email: decoded.email.toLowerCase() });
      if (!user || !user.active) {
        res.status(403).json({
          success: false,
          error: { code: 'ACCOUNT_DEACTIVATED', message: 'Administrator account is deactivated or not found.' }
        });
        return;
      }
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: { code: 'TOKEN_INVALID_OR_EXPIRED', message: 'Session expired or invalid token. Please log in again.' }
    });
  }
};

/**
 * Role-based authorization middleware.
 */
export const requireRole = (allowedRoles: Array<'super-admin' | 'editor' | 'media-manager'>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required.' }
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: { code: 'INSUFFICIENT_PERMISSIONS', message: 'You do not have permission to perform this action.' }
      });
      return;
    }

    next();
  };
};

export const requirePublisher = requireRole(['super-admin', 'editor']);
export const requireSuperAdmin = requireRole(['super-admin']);
