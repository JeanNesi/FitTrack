import { Router } from 'express';
import { listUserMetricsController } from './listUserMetricsController';

export const homeRouter = Router();

homeRouter.get('/metrics', listUserMetricsController);
