import express from "express";
import controller from "../controllers/group";
import authenticate from "../middleware/authenticate";
import group from "../middleware/validate";

const router = express.Router();

router.post("/groups", authenticate.verifyUser, group.validateGroup, controller.createGroup);
router.delete("/groups/:id", authenticate.verifyUser, group.validateGroupId, controller.deleteGroup);
router.post("/groups/:id/users", authenticate.verifyUser, group.validateGroupId, controller.addGroupMember);
router.delete("/groups/:id/:users/:mid", authenticate.verifyUser, group.validateGroupIdAndMemberId, controller.deleteGroupMember);
router.post("/groups/:id/messages", authenticate.verifyUser, group.validateGroupEmail, controller.sendGroupEmail);

export default router;
