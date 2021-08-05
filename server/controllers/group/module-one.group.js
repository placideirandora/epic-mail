import sql from '../../db/queries';
import databaseClient from '../../db';
import Group from '../../models/group';

class ModuleOneGroupController {
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
}

export default ModuleOneGroupController;
