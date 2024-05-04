// #region IMPORTS
import { Router } from 'express';

import { adminPermissionMiddleware } from '../../utils/middlewares/adminPermissionMiddleware';
import { checkToken } from '../../utils/middlewares';
import { authRouter } from './auth';
import { userRouter } from './users';

// #endregion

export const clientRouter: Router = Router();

clientRouter.use('/auth', authRouter);
clientRouter.use('/user', checkToken, adminPermissionMiddleware, userRouter);
