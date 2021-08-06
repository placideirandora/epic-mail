import sql from '../../../db/queries';
import databaseClient from '../../../db';

export const findAdmin = async (email) => {
  const admin = await databaseClient.query(sql.retrieveAdmin, [email, true]);
  return admin;
};

export const adminFindGroupMessages = async (res, groupId) => {
  const group = await databaseClient.query(sql.retrieveSpecificGroup, [
    groupId,
  ]);

  if (!group.length) {
    return res.status(404).json({ message: 'admin, group not found' });
  }

  const messages = await databaseClient.query(sql.retrieveSpecificGroupEmails, [
    groupId,
  ]);

  if (!messages.length) {
    return res.status(404).json({ message: 'admin, no group messages found' });
  }

  return res.status(200).json({
    message: 'admin, group messages found',
    data: messages,
  });
};

export const adminFindUserGroup = async (groupId) => {
  const group = await databaseClient.query(sql.retrieveSpecificGroup, [
    groupId,
  ]);

  return group;
};

export const adminUpdateGroupName = async (res, name, groupId) => {
  const group = await adminFindUserGroup(groupId);

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
};

export const adminFindGroupMembers = async (res, groupId) => {
  const group = await adminFindUserGroup(groupId);

  if (!group.length) {
    return res.status(404).json({ message: 'admin, group not found' });
  }

  const members = await databaseClient.query(sql.retrieveSpecificGroupMembers, [
    groupId,
  ]);

  if (!members.length) {
    return res.status(404).json({ message: 'admin, no group members found' });
  }

  return res.status(200).json({
    message: 'admin, group members retrieved',
    data: members,
  });
};
