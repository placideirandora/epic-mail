import sql from '../../../db/queries';
import databaseClient from '../../../db';
import GroupMember from '../../../models/member';

export const findUserGroup = async (groupId, email) => {
  const group = await databaseClient.query(sql.retrieveUserGroup, [
    groupId,
    email,
  ]);

  return group;
};

export const findUserGroupByName = async (name, email) => {
  const group = await databaseClient.query(sql.findGroup, [name, email]);

  return group;
};

export const findGroupMessages = async (groupId) => {
  const messages = await databaseClient.query(sql.retrieveSpecificGroupEmails, [
    groupId,
  ]);

  return messages;
};

export const memberFindGroupMessages = async (res, email, groupId) => {
  const member = await databaseClient.query(sql.retrieveSpecificGroupMember, [
    email,
    groupId,
  ]);

  if (!member.length) {
    return res.status(404).json({
      message: 'you are not a member of the group or it does not exist',
    });
  }

  const emails = await findGroupMessages(groupId);

  if (!emails.length) {
    return res.status(404).json({ message: 'no group messages found' });
  }

  return res.status(200).json({
    message: 'group messages found',
    data: emails,
  });
};

export const findMemberByUsername = async (username, groupId) => {
  const member = await databaseClient.query(sql.retrieveMemberByUsername, [
    username,
    groupId,
  ]);

  return member;
};

export const findMemberByEmail = async (email, groupId) => {
  const member = await databaseClient.query(sql.retrieveMemberByEmail, [
    email,
    groupId,
  ]);

  return member;
};

export const registerMember = async (res, username, groupId, email) => {
  const memberWithUsername = await findMemberByUsername(username, groupId);

  if (memberWithUsername.length) {
    return res.status(400).json({
      message:
        'the specified username is already taken. choose another unique name',
    });
  }

  const memberWithEmail = await findMemberByEmail(email, groupId);

  if (memberWithEmail.length) {
    return res.status(400).json({
      message: 'user with the specified email is already registered',
    });
  }

  const newMember = new GroupMember(username, email, groupId);

  const registeredMember = await databaseClient.query(sql.registerGroupMember, [
    newMember.username,
    newMember.email,
    newMember.group,
  ]);

  return res.status(201).json({
    message: 'group member registered',
    data: registeredMember[0],
  });
};

export const updateGroupName = async (res, name, email, groupId) => {
  const newGroupNameTaken = await findUserGroupByName(name, email);

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
};

export const findGroupMembers = async (res, groupId) => {
  const members = await databaseClient.query(sql.retrieveSpecificGroupMembers, [
    groupId,
  ]);

  if (!members.length) {
    return res.status(404).json({ message: 'no group members found' });
  }

  return res.status(200).json({
    message: 'group members retrieved',
    data: members,
  });
};
