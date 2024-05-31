/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'express-async-errors';
import { initCron } from './cron';
import { corsOptions } from './config/corsOptions';
import { serverRouter } from './api/routes';
import { errorHandler } from './api/utils/error';
import 'dotenv/config';

export const server = express();

initCron();

server.use(cors(corsOptions));
server.use(express.json());

server.use('/api', serverRouter);
server.get('/', (_req, res) => res.status(200).send('OK'));

server.use(helmet());
server.use(errorHandler);

server.listen(process.env.PORT || 8080, () =>
  console.log('\n\n\n 🚀️ Server is running 🚀️ \n\n\n'),
);
