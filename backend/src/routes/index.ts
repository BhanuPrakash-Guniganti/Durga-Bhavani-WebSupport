import { Router } from 'express';
import celebrations2025Router from './celebrations2025.js';

const apiRouter = Router();

// Base health check
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'durga-bhavani-backend'
  });
});

// Mount 2025 celebrations and admin endpoints
apiRouter.use('/', celebrations2025Router);

export default apiRouter;
