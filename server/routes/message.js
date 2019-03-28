import express from 'express';
import controller from '../controllers/message';
import authenticate from '../middleware/authenticate';
import email from '../middleware/validate';

const router = express.Router();

router.post('/messages', authenticate.verifyUser, email.validateEmail, controller.sendEmail);
router.get('/messages', authenticate.verifyUser, controller.retrieveReceivedEmails);
router.get('/messages/sent', authenticate.verifyUser, controller.retrieveSentEmails);
router.get('/messages/read', authenticate.verifyUser, controller.retrieveReadEmails);
router.get('/messages/unread', authenticate.verifyUser, controller.retrieveUnReadEmails);
router.get('/messages/draft', authenticate.verifyUser, controller.retrieveDraftEmails);
router.get('/messages/:id', authenticate.verifyUser, email.validateEmailId, controller.retrieveSpecificReceivedEmail);
router.delete('/messages/:id', authenticate.verifyUser, email.validateEmailId, controller.deleteSpecificReceivedEmail);
router.get('/messages/sent/:id', authenticate.verifyUser, email.validateEmailId, controller.retrieveSpecificSentEmail);
router.get('/messages/draft/:id', authenticate.verifyUser, email.validateEmailId, controller.retrieveSpecificDraftEmail);
router.delete('/messages/sent/:id', authenticate.verifyUser, email.validateEmailId, controller.deleteSpecificSentEmail);
router.delete('/messages/draft/:id', authenticate.verifyUser, email.validateEmailId, controller.deleteSpecificDraftEmail);

export default router;
