// #region IMPORTS
import { Router } from 'express';

import { checkToken } from '../../utils/middlewares';
import { authRouter } from './auth';
import { userRouter } from './users';
import { friendshipsRouter } from './friendships';
import { rankingRouter } from './ranking';
import { workoutRouter } from './workouts';
import { homeRouter } from './home';
import { missionRouter } from './missions';

// #endregion

export const clientRouter: Router = Router();

clientRouter.use('/auth', authRouter);
clientRouter.use('/user', checkToken, userRouter);
clientRouter.use('/friendship', checkToken, friendshipsRouter);
clientRouter.use('/ranking', checkToken, rankingRouter);
clientRouter.use('/workout', checkToken, workoutRouter);
clientRouter.use('/home', checkToken, homeRouter);
clientRouter.use('/mission', checkToken, missionRouter);
