import sql from '../../../db/queries';
import databaseClient from '../../../db';

export const findUser = async (email) => {
  const user = await databaseClient.query(sql.retrieveSpecificUser, [email]);

  return user;
};

export const sendInboxMessage = async (payload) => {
  const message = await databaseClient.query(sql.delivered, [
    payload.subject,
    payload.message,
    payload.senderEmail,
    payload.receiverEmail,
    'unread',
  ]);

  return message;
};

export const sendOutboxMessage = async (res, payload) => {
  const message = await databaseClient.query(sql.sendEmail, [
    payload.subject,
    payload.message,
    payload.senderEmail,
    payload.receiverEmail,
    payload.status,
  ]);

  return res.status(201).json({
    message: 'email sent',
    data: message[0],
  });
};

export const sendDraftMessage = async (res, payload) => {
  const message = await databaseClient.query(sql.draftEmail, [
    payload.subject,
    payload.message,
    payload.senderEmail,
    payload.receiverEmail,
    payload.status,
  ]);

  return res.status(201).json({
    message: 'email drafted',
    data: message[0],
  });
};

export const findReceivedEmail = async (emailId, user) => {
  const email = await databaseClient.query(
    sql.retrieveUserSpecificReceivedEmail,
    [emailId, user]
  );

  return email;
};

export const markEmailAsRead = async (emailId) => {
  const email = await databaseClient.query(sql.emailRead, ['read', emailId]);

  return email;
};

export const findDraftEmails = async (res, email) => {
  const emails = await databaseClient.query(sql.retrieveDraftEmails, [
    'draft',
    email,
  ]);

  if (!emails.length) {
    return res
      .status(404)
      .json({ message: 'sorry! you have no draft emails!' });
  }

  res.status(200).json({
    message: 'your draft emails retrieved',
    data: emails,
  });
};

export const findUnreadEmails = async (res, email) => {
  const emails = await databaseClient.query(sql.retrieveUnreadEmails, [
    'unread',
    email,
  ]);

  if (!emails.length) {
    return res
      .status(404)
      .json({ message: 'sorry! you have no unread emails!' });
  }

  res.status(200).json({
    message: 'your unread emails retrieved',
    data: emails,
  });
};

export const findReadEmails = async (res, email) => {
  const emails = await databaseClient.query(sql.retrieveReadEmails, [
    'read',
    email,
  ]);

  if (!emails.length) {
    return res.status(404).json({ message: 'sorry! you have read no emails!' });
  }

  res.status(200).json({
    message: 'your read emails retrieved',
    data: emails,
  });
};

export const deleteReceivedEmail = async (res, emailId, user) => {
  const email = await databaseClient.query(
    sql.retrieveUserSpecificReceivedEmail,
    [emailId, user]
  );

  if (!email.length) {
    return res.status(404).json({ message: 'received email not found' });
  }

  await databaseClient.query(sql.deleteSpecificEmail, [emailId]);

  res.status(200).json({ message: 'received email deleted' });
};
