import express from 'express';
import controller from '../controllers/group';
import authenticate from '../middleware/authenticate';
import group from '../middleware/validate';

const router = express.Router();

router.post('/groups', authenticate.verifyUser, group.validateGroup, controller.createGroup);
router.get('/groups', authenticate.verifyUser, controller.retrieveGroups);
router.get('/groups/:id', authenticate.verifyUser, group.validateGroupId, controller.retrieveGroup);
router.patch('/groups/:id/name', authenticate.verifyUser, group.validateGroupId, group.validateGroupName, controller.changeGroupName);
router.delete('/groups/:id', authenticate.verifyUser, group.validateGroupId, controller.deleteGroup);
router.post('/groups/:id/users', authenticate.verifyUser, group.validateGroupId, controller.addGroupMember);
router.get('/groups/:id/users', authenticate.verifyUser, group.validateGroupId, controller.retrieveGroupMembers);
router.get('/groups/:id/:users/:mid', authenticate.verifyUser, group.validateGroupIdAndMemberId, controller.retrieveGroupMember);
router.delete('/groups/:id/:users/:mid', authenticate.verifyUser, group.validateGroupIdAndMemberId, controller.deleteGroupMember);
router.post('/groups/:id/messages', authenticate.verifyUser, group.validateGroupEmail, controller.sendGroupEmail);
router.get('/groups/:id/messages', authenticate.verifyUser, group.validateGroupId, controller.retrieveGroupEmails);

export default router;
