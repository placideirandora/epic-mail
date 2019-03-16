import express from "express";
import controller from "../controllers/message";
import email from "../middleware/validate";

const router = express.Router();

router.post("/messages", email.validateEmail, controller.sendEmail);
router.get("/messages", controller.retrieveMails);
router.get("/messages/sent", controller.retrieveSentEmails);
router.get("/messages/read", controller.retrieveReadEmails);
router.get("/messages/unread", controller.retrieveUnReadEmails);
router.get("/messages/:id", email.validateEmailId, controller.retrieveSpecificEmail);
router.delete("/messages/:id", email.validateEmailId, controller.deleteMail);

export default router;
