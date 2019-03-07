import express from "express";
import controller from "../controllers/message";

const router = express.Router();

router.post("/messages", controller.sendEmail);
router.get("/messages", controller.retrieveMails);
router.get("/messages/sent", controller.retrieveSentEmails);
router.get("/messages/read", controller.retrieveReadEmails);
router.get("/messages/:id", controller.retrieveSpecificEmail);
router.delete("/messages/:id", controller.deleteMail);

export default router;
