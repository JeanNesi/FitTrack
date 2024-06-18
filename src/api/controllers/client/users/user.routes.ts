import { Router } from 'express';
import { updateUserPasswordController } from './updatePasswordRouter';
import { findManyUserController } from './findManyUserController';
import { updateUserController } from './updateUserController';
import { listUserPermissionsController } from './listUserPermissionsController';
import { deleteUserController } from './deleteUserController';
import { findUserController } from './findUserController';

export const userRouter = Router();

userRouter.get('/list', findManyUserController);
userRouter.get('/list/permissions', listUserPermissionsController);
userRouter.put('/update', updateUserController);
userRouter.put('/update/password', updateUserPasswordController);
userRouter.delete('/delete', deleteUserController);
userRouter.get('/info', findUserController);
