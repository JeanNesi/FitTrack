import { Router } from 'express';
import { clientLoginController } from './clientLoginController';
import { clientRegisterController } from './clientRegisterController';

export const authRouter = Router();

authRouter.post('/login', clientLoginController);
authRouter.post('/register', clientRegisterController);
