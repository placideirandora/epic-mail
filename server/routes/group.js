import express from "express";
import controller from "../controllers/group";
import authenticate from "../middleware/authenticate";
import group from "../middleware/validate";

const router = express.Router();

router.post("/groups", authenticate.verifyUser, group.validateGroup, controller.createGroup);
router.delete("/groups/:id", authenticate.verifyUser, group.validateGroupId, controller.deleteGroup);
router.post("/groups/:id/users", authenticate.verifyUser, group.validateGroupId, controller.addGroupMember);

export default router;
