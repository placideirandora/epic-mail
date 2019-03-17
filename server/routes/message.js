import express from "express";
import controller from "../controllers/message";
import authenticate from "../middleware/authenticate";
import email from "../middleware/validate";

const router = express.Router();

router.post("/messages", authenticate.verifyUser, email.validateEmail, controller.sendEmail);
router.get("/messages", authenticate.verifyUser, controller.retrieveMails);
router.get("/messages/sent", authenticate.verifyUser, controller.retrieveSentEmails);
router.get("/messages/read", authenticate.verifyUser, controller.retrieveReadEmails);
router.get("/messages/unread", authenticate.verifyUser, controller.retrieveUnReadEmails);
router.get("/messages/draft", authenticate.verifyUser, controller.retrieveDraftEmails);
router.get("/messages/:id", authenticate.verifyUser, email.validateEmailId, controller.retrieveSpecificEmail);
router.delete("/messages/:id", authenticate.verifyUser, email.validateEmailId, controller.deleteSpecificEmail);

export default router;
