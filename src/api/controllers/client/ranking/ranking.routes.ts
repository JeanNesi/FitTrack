import { Router } from 'express';
import { listGeneralRakingController } from './listGeneralRakingController';
import { listFriendRakingController } from './listFriendRakingController';

export const rankingRouter = Router();

rankingRouter.get('/general', listGeneralRakingController);
rankingRouter.get('/friends', listFriendRakingController);
