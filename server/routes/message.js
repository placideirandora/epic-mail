import express from "express";
import controller from "../controllers/messages";

const router = express.Router();

router.post("/messages", controller.sendEmail);
router.get("/messages", controller.retrieveMails);
router.get("/messages/:id", controller.retrieveSpecificEmail);
router.delete("/messages/:id", controller.deleteMail);

export default router;
