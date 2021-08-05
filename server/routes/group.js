import { Router } from 'express';

import group from '../middleware/validate';
import groupController from '../controllers/group';
import authentication from '../middleware/authenticate';

const router = Router();

router.post(
  '/groups',
  authentication.verifyUser,
  group.validateGroup,
  groupController.moduleOne.createGroup
);

router.get(
  '/groups',
  authentication.verifyUser,
  groupController.moduleOne.retrieveGroups
);

router.get(
  '/groups/:id',
  authentication.verifyUser,
  group.validateGroupId,
  groupController.moduleOne.retrieveGroup
);

router.patch(
  '/groups/:id/name',
  authentication.verifyUser,
  group.validateGroupId,
  group.validateGroupName,
  groupController.moduleOne.changeGroupName
);

router.delete(
  '/groups/:id',
  authentication.verifyUser,
  group.validateGroupId,
  groupController.moduleTwo.deleteGroup
);

router.post(
  '/groups/:id/users',
  authentication.verifyUser,
  group.validateGroupId,
  group.validateGroupMember,
  groupController.moduleTwo.addGroupMember
);

router.get(
  '/groups/:id/users',
  authentication.verifyUser,
  group.validateGroupId,
  groupController.moduleTwo.retrieveGroupMembers
);

router.get(
  '/groups/:id/:users/:memberId',
  authentication.verifyUser,
  group.validateGroupIdAndMemberId,
  groupController.moduleThree.retrieveGroupMember
);

router.delete(
  '/groups/:id/:users/:memberId',
  authentication.verifyUser,
  group.validateGroupIdAndMemberId,
  groupController.moduleThree.deleteGroupMember
);

router.post(
  '/groups/:id/messages',
  authentication.verifyUser,
  group.validateGroupEmail,
  groupController.moduleThree.sendGroupEmail
);

router.get(
  '/groups/:id/messages',
  authentication.verifyUser,
  group.validateGroupId,
  groupController.moduleThree.retrieveGroupMessages
);

export default router;
