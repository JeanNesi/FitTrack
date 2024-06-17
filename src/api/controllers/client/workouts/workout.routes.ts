// #region IMPORTS
import { Router } from 'express';
import { findManyWorkoutTypesController } from './findManyWorkoutTypesController';
import { startWorkoutController } from './startWorkoutController';
import { findManyWorkoutController } from './findManyWorkoutController';
import { finishWorkoutController } from './finishWorkoutController';

// #endregion

export const workoutRouter: Router = Router();

workoutRouter.get('/types-list', findManyWorkoutTypesController);
workoutRouter.post('/start', startWorkoutController);
workoutRouter.post('/list', findManyWorkoutController);
workoutRouter.patch('/finish', finishWorkoutController);
