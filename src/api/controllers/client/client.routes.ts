// #region IMPORTS
import { Router } from 'express';

import { checkToken } from '../../utils/middlewares';
import { authRouter } from './auth';
import { userRouter } from './users';

// #endregion

export const clientRouter: Router = Router();

clientRouter.use('/auth', authRouter);
clientRouter.use('/user', checkToken, userRouter);
