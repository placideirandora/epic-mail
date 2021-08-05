import sql from '../../db/queries';
import databaseClient from '../../db';
import GroupMessage from '../../models/group-message';

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

      const messages = await databaseClient.query(
        sql.retrieveSpecificGroupEmails,
        [groupId]
      );

      if (!messages.length) {
        return res
          .status(404)
          .json({ message: 'admin, no group messages found' });
      }

      return res.status(200).json({
        message: 'admin, group messages found',
        data: messages,
      });
    }

    const group = await databaseClient.query(sql.retrieveUserGroup, [
      groupId,
      userEmail,
    ]);

    if (!group.length) {
      const member = await databaseClient.query(
        sql.retrieveSpecificGroupMember,
        [userEmail, groupId]
      );

      if (!member.length) {
        return res.status(404).json({
          message: 'you are not a member of the group or it does not exist',
        });
      }

      const emails = await databaseClient.query(sql.retrieveMemberEmails, [
        groupId,
      ]);

      if (!emails.length) {
        return res.status(404).json({ message: 'no group messages found' });
      }

      return res.status(200).json({
        message: 'group messages found',
        data: emails,
      });
    }

    const emails = await databaseClient.query(sql.retrieveSpecificGroupEmails, [
      groupId,
    ]);

    if (!emails.length) {
      return res.status(404).json({ message: 'no group messages found' });
    }

    res.status(200).json({
      message: 'group messages found',
      data: emails,
    });
  }
}

export default ModuleThreeGroupController;
