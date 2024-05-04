import { Router } from 'express';

import { clientRouter } from './controllers/client/client.routes';
import { uploadRouter } from './utils/upload/upload.routes';

export const serverRouter = Router();

serverRouter.use('/client', clientRouter);
serverRouter.use('/upload', uploadRouter);
