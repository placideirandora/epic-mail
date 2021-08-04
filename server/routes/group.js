import { Router } from 'express';

import group from '../middleware/validate';
import GroupController from '../controllers/group';
import authentication from '../middleware/authenticate';

const router = Router();

router.post(
  '/groups',
  authentication.verifyUser,
  group.validateGroup,
  GroupController.createGroup
);

router.get(
  '/groups',
  authentication.verifyUser,
  GroupController.retrieveGroups
);

router.get(
  '/groups/:id',
  authentication.verifyUser,
  group.validateGroupId,
  GroupController.retrieveGroup
);

router.patch(
  '/groups/:id/name',
  authentication.verifyUser,
  group.validateGroupId,
  group.validateGroupName,
  GroupController.changeGroupName
);

router.delete(
  '/groups/:id',
  authentication.verifyUser,
  group.validateGroupId,
  GroupController.deleteGroup
);

router.post(
  '/groups/:id/users',
  authentication.verifyUser,
  group.validateGroupId,
  group.validateGroupMember,
  GroupController.addGroupMember
);

router.get(
  '/groups/:id/users',
  authentication.verifyUser,
  group.validateGroupId,
  GroupController.retrieveGroupMembers
);

router.get(
  '/groups/:id/:users/:memberId',
  authentication.verifyUser,
  group.validateGroupIdAndMemberId,
  GroupController.retrieveGroupMember
);

router.delete(
  '/groups/:id/:users/:memberId',
  authentication.verifyUser,
  group.validateGroupIdAndMemberId,
  GroupController.deleteGroupMember
);

router.post(
  '/groups/:id/messages',
  authentication.verifyUser,
  group.validateGroupEmail,
  GroupController.sendGroupEmail
);

router.get(
  '/groups/:id/messages',
  authentication.verifyUser,
  group.validateGroupId,
  GroupController.retrieveGroupMessages
);

export default router;
