import { Router } from 'express';
import { listUserMetricsController } from './listUserMetricsController';
import { teste } from './teste';

export const homeRouter = Router();

homeRouter.get('/metrics', listUserMetricsController);
homeRouter.get('/teste', teste);
