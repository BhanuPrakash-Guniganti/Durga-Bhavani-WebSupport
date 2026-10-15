import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`[Backend] Server listening on port ${env.PORT} (${env.NODE_ENV})`);
  console.log(`[Backend] Health check available at http://localhost:${env.PORT}/api/v1/health`);
});

const handleShutdown = (signal: string) => {
  console.log(`[Backend] Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    console.log('[Backend] HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
