import sql from '../../db/queries';
import databaseClient from '../../db';
import { findUser } from '../message/extracts/user.extract-methods';
import {
  findGroupMembers,
  findUserGroup,
  registerMember,
} from './extracts/user.extract-methods';
import {
  adminFindGroupMembers,
  findAdmin,
} from './extracts/admin.extract-methods';

class ModuleTwoGroupController {
  static async deleteGroup(req, res) {
    const isAdmin = true;
    const { userEmail } = req;
    const groupId = req.params.id;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    if (admin.length) {
      const group = await databaseClient.query(sql.retrieveSpecificGroup, [
        groupId,
      ]);

      if (!group.length) {
        return res.status(404).json({ message: 'admin, group not found' });
      }

      await databaseClient.query(sql.deleteSpecificGroup, [groupId]);

      return res.status(200).json({ message: 'admin, group deleted' });
    }

    const group = await databaseClient.query(sql.retrieveUserGroup, [
      groupId,
      userEmail,
    ]);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    await databaseClient.query(sql.deleteSpecificGroup, [groupId]);

    res.status(200).json({ message: 'group deleted' });
  }

  static async addGroupMember(req, res) {
    const owner = req.userEmail;
    const groupId = req.params.id;
    const { username, email } = req.body;
    const usernameArr = Array.from(username);

    if (!isNaN(usernameArr[0])) {
      return res
        .status(400)
        .json({ message: 'username must not start with a number' });
    }

    const group = await findUserGroup(groupId, owner);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    const member = await findUser(email);

    if (member.length) {
      return registerMember(res, username, groupId, email);
    }

    res.status(404).json({
      message:
        'user with the specified email is not even registered. the email is incorrect',
    });
  }

  static async retrieveGroupMembers(req, res) {
    const { userEmail } = req;
    const groupId = req.params.id;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminFindGroupMembers(res, groupId);
    }

    const group = await findUserGroup(groupId, userEmail);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    findGroupMembers(res, groupId);
  }
}

export default ModuleTwoGroupController;
