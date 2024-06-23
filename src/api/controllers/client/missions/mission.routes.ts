import { Router } from 'express';
import { findManyMissionsController } from './findManyMissionsController';
import { collectMissionController } from './collectMissionController';

export const missionRouter = Router();

missionRouter.get('/list', findManyMissionsController);
missionRouter.post('/collect', collectMissionController);
