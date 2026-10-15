import { Router } from 'express';

const apiRouter = Router();

// Base health check
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'durga-bhavani-backend'
  });
});

export default apiRouter;
