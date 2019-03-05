import express from "express";
import controller from "../controllers/messages";

const router = express.Router();

router.post("/messages", controller.sendEmail);

export default router;
