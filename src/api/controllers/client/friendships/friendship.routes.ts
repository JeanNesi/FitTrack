import { Router } from 'express';
import { sendFriendInvitationController } from './sendFriendInvitationController';
import { findManyFriendshipController } from './findManyFriendshipController';
import { acceptFriendInvitationController } from './acceptFriendInvitationController';
import { deleteFriendshipController } from './deleteFriendshipController';

export const friendshipsRouter = Router();

friendshipsRouter.post('/send-invitation', sendFriendInvitationController);
friendshipsRouter.post('/list', findManyFriendshipController);
friendshipsRouter.put('/accept-invitation', acceptFriendInvitationController);
friendshipsRouter.delete('/delete', deleteFriendshipController);
