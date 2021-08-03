import express from 'express';

import group from '../middleware/validate';
import controller from '../controllers/group';
import authentication from '../middleware/authenticate';

const router = express.Router();

router.post(
  '/groups',
  authentication.verifyUser,
  group.validateGroup,
  controller.createGroup
);

router.get('/groups', authentication.verifyUser, controller.retrieveGroups);

router.get(
  '/groups/:id',
  authentication.verifyUser,
  group.validateGroupId,
  controller.retrieveGroup
);

router.patch(
  '/groups/:id/name',
  authentication.verifyUser,
  group.validateGroupId,
  group.validateGroupName,
  controller.changeGroupName
);

router.delete(
  '/groups/:id',
  authentication.verifyUser,
  group.validateGroupId,
  controller.deleteGroup
);

router.post(
  '/groups/:id/users',
  authentication.verifyUser,
  group.validateGroupId,
  group.validateGroupMember,
  controller.addGroupMember
);

router.get(
  '/groups/:id/users',
  authentication.verifyUser,
  group.validateGroupId,
  controller.retrieveGroupMembers
);

router.get(
  '/groups/:id/:users/:mid',
  authentication.verifyUser,
  group.validateGroupIdAndMemberId,
  controller.retrieveGroupMember
);

router.delete(
  '/groups/:id/:users/:mid',
  authentication.verifyUser,
  group.validateGroupIdAndMemberId,
  controller.deleteGroupMember
);

router.post(
  '/groups/:id/messages',
  authentication.verifyUser,
  group.validateGroupEmail,
  controller.sendGroupEmail
);

router.get(
  '/groups/:id/messages',
  authentication.verifyUser,
  group.validateGroupId,
  controller.retrieveGroupEmails
);

export default router;
