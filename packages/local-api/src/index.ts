import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';

export const serve = (port: number, filename: string, dir: string, useDevProxy: boolean) => {
  const app = express();

  if (useDevProxy) {
    // Development mode
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    // Production mode
    // Link the local-client package as static resource to serve the Cheatsheets app with an absolute path
    const localClientPath = require.resolve('local-client/build/index.html');
    app.use(express.static(path.dirname(localClientPath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};;