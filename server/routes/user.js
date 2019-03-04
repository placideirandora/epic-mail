import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.post('/auth/signup', controller.registerUser);

export default router;
