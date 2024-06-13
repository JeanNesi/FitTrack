// #region IMPORTS
import { Router } from 'express';

import { checkToken } from '../../utils/middlewares';
import { authRouter } from './auth';
import { userRouter } from './users';
import { friendshipsRouter } from './friendships';

// #endregion

export const clientRouter: Router = Router();

clientRouter.use('/auth', authRouter);
clientRouter.use('/user', checkToken, userRouter);
clientRouter.use('/friendship', checkToken, friendshipsRouter);
