import { Router } from 'express';
import celebrations2025Router from './celebrations2025.js';
import authRouter from './auth.js';
import mediaRouter from './media.js';

const apiRouter = Router();

// Base health check
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'durga-bhavani-backend'
  });
});

// Authentication endpoints (/api/v1/auth/*)
apiRouter.use('/auth', authRouter);

// Media Upload endpoints (/api/v1/admin/media/*)
apiRouter.use('/admin/media', mediaRouter);

// Celebrations & public/admin content endpoints
apiRouter.use('/', celebrations2025Router);

export default apiRouter;
