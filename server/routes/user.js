import express from "express";
import controller from "../controllers/user";
import authenticate from "../middleware/authenticate";
import user from "../middleware/validate";

const router = express.Router();

router.post("/auth/signup", user.validateRegistration, controller.registerUser);
router.post("/auth/login", user.validateLogin, controller.loginUser);
router.get("/users", authenticate.verifyAdmin, controller.retrieveUsers);

export default router;
