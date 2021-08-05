import sql from '../../db/queries';
import databaseClient from '../../db';
import GroupMember from '../../models/member';

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

    const group = await databaseClient.query(sql.retrieveSpecificGroupOwner, [
      groupId,
      owner,
    ]);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    const member = await databaseClient.query(sql.retrieveSpecificUser, [
      email,
    ]);

    if (member.length) {
      const memberWithUsername = await databaseClient.query(
        sql.retrieveMemberByUsername,
        [username, groupId]
      );

      if (memberWithUsername.length) {
        return res.status(400).json({
          message:
            'the specified username is already taken. choose another unique name',
        });
      }

      const memberWithEmail = await databaseClient.query(
        sql.retrieveMemberByEmail,
        [email, groupId]
      );

      if (memberWithEmail.length) {
        return res.status(400).json({
          message: 'user with the specified email is already registered',
        });
      }

      const newMember = new GroupMember(username, email, groupId);

      const registeredMember = await databaseClient.query(
        sql.registerGroupMember,
        [newMember.username, newMember.email, newMember.group]
      );

      return res.status(201).json({
        message: 'group member registered',
        data: registeredMember[0],
      });
    }

    res.status(404).json({
      message:
        'user with the specified email is not even registered. the email is incorrect',
    });
  }

  static async retrieveGroupMembers(req, res) {
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

      const members = await databaseClient.query(
        sql.retrieveSpecificGroupMembers,
        [groupId]
      );

      if (!members.length) {
        return res
          .status(404)
          .json({ message: 'admin, no group members found' });
      }

      return res.status(200).json({
        message: 'admin, group members retrieved',
        data: members,
      });
    }

    const group = await databaseClient.query(sql.retrieveUserGroup, [
      groupId,
      userEmail,
    ]);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    const members = await databaseClient.query(
      sql.retrieveSpecificGroupMembers,
      [groupId]
    );

    if (!members.length) {
      return res.status(404).json({ message: 'no group members found' });
    }

    return res.status(200).json({
      message: 'group members retrieved',
      data: members,
    });
  }
}

export default ModuleTwoGroupController;
