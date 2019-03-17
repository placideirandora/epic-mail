import express from "express";
import controller from "../controllers/group";
import authenticate from "../middleware/authenticate";
import group from "../middleware/validate";

const router = express.Router();

router.post("/groups", authenticate.verifyUser, group.validateGroup, controller.createGroup);

export default router;
