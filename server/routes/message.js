import express from 'express';

import email from '../middleware/validate';
import controller from '../controllers/message';
import authentication from '../middleware/authenticate';

const router = express.Router();

router.post(
  '/messages',
  authentication.verifyUser,
  email.validateEmail,
  controller.sendEmail
);

router.get(
  '/messages',
  authentication.verifyUser,
  controller.retrieveReceivedEmails
);

router.get(
  '/messages/sent',
  authentication.verifyUser,
  controller.retrieveSentEmails
);

router.get(
  '/messages/read',
  authentication.verifyUser,
  controller.retrieveReadEmails
);

router.get(
  '/messages/unread',
  authentication.verifyUser,
  controller.retrieveUnReadEmails
);

router.get(
  '/messages/draft',
  authentication.verifyUser,
  controller.retrieveDraftEmails
);

router.get(
  '/messages/:id',
  authentication.verifyUser,
  email.validateEmailId,
  controller.retrieveSpecificReceivedEmail
);

router.delete(
  '/messages/:id',
  authentication.verifyUser,
  email.validateEmailId,
  controller.deleteSpecificReceivedEmail
);

router.get(
  '/messages/sent/:id',
  authentication.verifyUser,
  email.validateEmailId,
  controller.retrieveSpecificSentEmail
);

router.get(
  '/messages/draft/:id',
  authentication.verifyUser,
  email.validateEmailId,
  controller.retrieveSpecificDraftEmail
);

router.delete(
  '/messages/sent/:id',
  authentication.verifyUser,
  email.validateEmailId,
  controller.deleteSpecificSentEmail
);

router.delete(
  '/messages/draft/:id',
  authentication.verifyUser,
  email.validateEmailId,
  controller.deleteSpecificDraftEmail
);

export default router;
