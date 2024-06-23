import { Router } from 'express';
import { findManyMissionsController } from './findManyMissionsController';

export const missionRouter = Router();

missionRouter.get('/list', findManyMissionsController);
