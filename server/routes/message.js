import { Router } from 'express';

import email from '../middleware/validate';
import MessageController from '../controllers/message';
import authentication from '../middleware/authenticate';

const router = Router();

router.post(
  '/messages',
  authentication.verifyUser,
  email.validateEmail,
  MessageController.sendEmail
);

router.get(
  '/messages',
  authentication.verifyUser,
  MessageController.retrieveReceivedEmails
);

router.get(
  '/messages/sent',
  authentication.verifyUser,
  MessageController.retrieveSentEmails
);

router.get(
  '/messages/read',
  authentication.verifyUser,
  MessageController.retrieveReadEmails
);

router.get(
  '/messages/unread',
  authentication.verifyUser,
  MessageController.retrieveUnReadEmails
);

router.get(
  '/messages/draft',
  authentication.verifyUser,
  MessageController.retrieveDraftEmails
);

router.get(
  '/messages/:id',
  authentication.verifyUser,
  email.validateEmailId,
  MessageController.retrieveSpecificReceivedEmail
);

router.delete(
  '/messages/:id',
  authentication.verifyUser,
  email.validateEmailId,
  MessageController.deleteSpecificReceivedEmail
);

router.get(
  '/messages/sent/:id',
  authentication.verifyUser,
  email.validateEmailId,
  MessageController.retrieveSpecificSentEmail
);

router.get(
  '/messages/draft/:id',
  authentication.verifyUser,
  email.validateEmailId,
  MessageController.retrieveSpecificDraftEmail
);

router.delete(
  '/messages/sent/:id',
  authentication.verifyUser,
  email.validateEmailId,
  MessageController.deleteSpecificSentEmail
);

router.delete(
  '/messages/draft/:id',
  authentication.verifyUser,
  email.validateEmailId,
  MessageController.deleteSpecificDraftEmail
);

export default router;
