import express from "express";
import controller from "../controllers/user";

const router = express.Router();

router.post("/auth/signup", controller.registerUser);
router.post("/auth/login", controller.loginUser);

export default router;
