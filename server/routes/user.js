import express from "express";
import controller from "../controllers/user";
import user from "../middleware/validate";

const router = express.Router();

router.post("/auth/signup", user.validateRegistration, controller.registerUser);
router.post("/auth/login", user.validateLogin, controller.loginUser);

export default router;
