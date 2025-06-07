import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import routes from './routers/index.js';
import cookieParser from 'cookie-parser';
import path from 'node:path';

import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

const setupServer = () => {
  const app = express();

  app.use('/photos', express.static(path.resolve('src', 'uploads', 'photos')));

  app.use(cookieParser());

  app.use('/', routes);

  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
