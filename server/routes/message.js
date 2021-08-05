import { Router } from 'express';

import email from '../middleware/validate';
import messageController from '../controllers/message';
import authentication from '../middleware/authenticate';

const router = Router();

router.post(
  '/messages',
  authentication.verifyUser,
  email.validateEmail,
  messageController.moduleOne.sendEmail
);

router.get(
  '/messages',
  authentication.verifyUser,
  messageController.moduleOne.retrieveReceivedEmails
);

router.get(
  '/messages/sent',
  authentication.verifyUser,
  messageController.moduleOne.retrieveSentEmails
);

router.get(
  '/messages/read',
  authentication.verifyUser,
  messageController.moduleThree.retrieveReadEmails
);

router.get(
  '/messages/unread',
  authentication.verifyUser,
  messageController.moduleThree.retrieveUnReadEmails
);

router.get(
  '/messages/draft',
  authentication.verifyUser,
  messageController.moduleThree.retrieveDraftEmails
);

router.get(
  '/messages/:id',
  authentication.verifyUser,
  email.validateEmailId,
  messageController.moduleOne.retrieveSpecificReceivedEmail
);

router.delete(
  '/messages/:id',
  authentication.verifyUser,
  email.validateEmailId,
  messageController.moduleTwo.deleteSpecificReceivedEmail
);

router.get(
  '/messages/sent/:id',
  authentication.verifyUser,
  email.validateEmailId,
  messageController.moduleThree.retrieveSpecificSentEmail
);

router.get(
  '/messages/draft/:id',
  authentication.verifyUser,
  email.validateEmailId,
  messageController.moduleTwo.retrieveSpecificDraftEmail
);

router.delete(
  '/messages/sent/:id',
  authentication.verifyUser,
  email.validateEmailId,
  messageController.moduleTwo.deleteSpecificSentEmail
);

router.delete(
  '/messages/draft/:id',
  authentication.verifyUser,
  email.validateEmailId,
  messageController.moduleTwo.deleteSpecificDraftEmail
);

export default router;
