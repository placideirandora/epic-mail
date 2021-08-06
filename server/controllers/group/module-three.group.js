import sql from '../../db/queries';
import databaseClient from '../../db';
import GroupMessage from '../../models/group-message';
import {
  findUserGroup,
  findGroupMessages,
  memberFindGroupMessages,
} from './extracts/user.extract-methods';
import {
  findAdmin,
  adminFindGroupMessages,
} from './extracts/admin.extract-methods';

class ModuleThreeGroupController {
  static async retrieveGroupMember(req, res) {
    const owner = req.userEmail;
    const groupId = req.params.id;
    const groupMemberId = req.params.memberId;

    const group = await databaseClient.query(sql.retrieveSpecificGroupOwner, [
      groupId,
      owner,
    ]);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    const member = await databaseClient.query(
      sql.retrieveSpecificGroupMemberById,
      [groupMemberId, groupId]
    );

    if (!member.length) {
      return res.status(404).json({ message: 'group member not found' });
    }

    res.status(200).json({
      message: 'group member retrieved',
      data: member[0],
    });
  }

  static async deleteGroupMember(req, res) {
    const owner = req.userEmail;
    const groupId = req.params.id;
    const groupMemberId = req.params.memberId;

    const group = await databaseClient.query(sql.retrieveSpecificGroupOwner, [
      groupId,
      owner,
    ]);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    const member = await databaseClient.query(
      sql.retrieveSpecificGroupMemberById,
      [groupMemberId, groupId]
    );

    if (!member.length) {
      return res.status(404).json({ message: 'group member not found' });
    }

    await databaseClient.query(sql.deleteSpecificGroupMember, [
      groupMemberId,
      groupId,
    ]);

    res.status(200).json({ message: 'group member deleted' });
  }

  static async sendGroupEmail(req, res) {
    const owner = req.userEmail;
    const { message } = req.body;
    const groupId = req.params.id;

    const group = await databaseClient.query(sql.retrieveSpecificGroupOwner, [
      groupId,
      owner,
    ]);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    const newMessage = new GroupMessage(message, groupId);

    const sentMessage = await databaseClient.query(sql.sendGroupEmail, [
      newMessage.message,
      newMessage.groupId,
    ]);

    res.status(201).json({
      message: 'group email sent',
      data: sentMessage[0],
    });
  }

  static async retrieveGroupMessages(req, res) {
    const { userEmail } = req;
    const groupId = req.params.id;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminFindGroupMessages(res, groupId);
    }

    const group = await findUserGroup(groupId, userEmail);

    if (!group.length) {
      return memberFindGroupMessages(res, userEmail, groupId);
    }

    const messages = await findGroupMessages(groupId);

    if (!messages.length) {
      return res.status(404).json({ message: 'no group messages found' });
    }

    res.status(200).json({
      message: 'group messages found',
      data: messages,
    });
  }
}

export default ModuleThreeGroupController;
