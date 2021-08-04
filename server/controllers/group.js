import sql from '../db/queries';
import databaseClient from '../db';
import Group from '../models/group';
import GroupMember from '../models/member';
import GroupMessage from '../models/group-message';

class GroupController {
  static async createGroup(req, res) {
    const { userEmail } = req;
    const { name, purpose } = req.body;

    const group = await databaseClient.query(sql.findGroup, [name, userEmail]);

    if (group.length) {
      return res.status(400).json({
        message: 'group with the specified name already exists',
      });
    }

    const groupObj = new Group(name, purpose, userEmail);

    const newGroup = await databaseClient.query(sql.createGroup, [
      groupObj.name,
      groupObj.purpose,
      groupObj.owner,
    ]);

    res.status(201).json({
      message: 'group created',
      data: newGroup[0],
    });
  }

  static async retrieveGroups(req, res) {
    const isAdmin = true;
    const { userEmail } = req;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    if (admin.length) {
      const groups = await databaseClient.query(sql.retrieveAllGroups);

      if (!groups.length) {
        return res.status(404).json({
          message: 'admin, no groups found',
        });
      }

      return res.status(200).json({
        message: 'admin, groups retrieved',
        data: groups,
      });
    }

    const groups = await databaseClient.query(sql.retrieveUserGroups, [
      userEmail,
    ]);

    if (!groups.length) {
      return res.status(404).json({ message: 'no groups found' });
    }

    res.status(200).json({
      message: 'groups retrieved',
      data: groups,
    });
  }

  static async retrieveGroup(req, res) {
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

      if (!group) {
        return res.status(404).json({ message: 'admin, group not found' });
      }

      return res.status(200).json({
        message: 'admin, group retrieved',
        data: group[0],
      });
    }

    const group = await databaseClient.query(sql.retrieveUserGroup, [
      groupId,
      userEmail,
    ]);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    res.status(200).json({
      message: 'group retrieved',
      data: group[0],
    });
  }

  static async changeGroupName(req, res) {
    const isAdmin = true;
    const { userEmail } = req;
    const { name } = req.body;
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
        return res.status(404).json({
          message: 'admin, group with the specified id, not found',
        });
      }

      const updatedGroup = await databaseClient.query(sql.updateSpecificGroup, [
        name,
        groupId,
      ]);

      return res.status(200).json({
        message: 'admin, group name changed',
        data: updatedGroup[0],
      });
    }

    const group = await databaseClient.query(sql.retrieveUserGroup, [
      groupId,
      userEmail,
    ]);

    if (!group.length) {
      return res.status(404).json({ message: 'group not found' });
    }

    const newGroupNameTaken = await databaseClient.query(sql.findGroup, [
      name,
      userEmail,
    ]);

    if (newGroupNameTaken.length) {
      return res.status(400).json({
        message: 'the specified group name is already taken',
      });
    }

    const updatedGroup = await databaseClient.query(sql.updateSpecificGroup, [
      name,
      groupId,
    ]);

    res.status(200).json({
      message: 'group name changed',
      data: updatedGroup[0],
    });
  }

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

export default GroupController;
