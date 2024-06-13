import { Router } from 'express';
import { sendFriendInvitationController } from './sendFriendInvitationController';
import { findManyFriendshipController } from './findManyFriendshipController';

export const friendshipsRouter = Router();

friendshipsRouter.post('/send-invitation', sendFriendInvitationController);
friendshipsRouter.post('/list-friendships', findManyFriendshipController);
