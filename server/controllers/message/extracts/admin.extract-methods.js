import sql from '../../../db/queries';
import databaseClient from '../../../db';

export const adminFindReceivedEmail = async (res, emailId) => {
  const email = await databaseClient.query(
    sql.adminRetrieveUserSpecificReceivedEmail,
    [emailId]
  );

  if (!email.length) {
    return res.status(404).json({ message: 'admin, received email not found' });
  }

  return res.status(200).json({
    message: 'admin, received email retrieved',
    data: email,
  });
};

export const adminFindSentEmail = async (res, emailId) => {
  const email = await databaseClient.query(
    sql.adminRetrieveUserSpecificSentEmail,
    [emailId]
  );

  if (!email.length) {
    return res.status(404).json({ message: 'admin, sent email not found' });
  }

  return res.status(200).json({
    message: 'admin, sent email retrieved',
    data: email,
  });
};

export const adminFindDraftEmails = async (res) => {
  const emails = await databaseClient.query(sql.adminGetDraftEmails, ['draft']);

  if (!emails.length) {
    return res.status(404).json({ message: 'admin, no draft emails found' });
  }

  return res.status(200).json({
    message: 'admin, draft emails retrieved',
    data: emails,
  });
};

export const adminFindUnreadEmails = async (res) => {
  const emails = await databaseClient.query(sql.adminGetUnreadEmails, [
    'unread',
  ]);

  if (!emails.length) {
    return res.status(404).json({ message: 'admin, no unread emails found' });
  }

  return res.status(200).json({
    message: 'admin, unread emails retrieved',
    data: emails,
  });
};

export const adminFindDraftEmail = async (res, emailId) => {
  const email = await databaseClient.query(
    sql.adminRetrieveUserSpecificDraftEmail,
    [emailId]
  );

  if (!email.length) {
    return res.status(404).json({ message: 'admin, draft email not found' });
  }

  return res.status(200).json({
    message: 'admin, draft email retrieved',
    data: email,
  });
};

export const adminFindReadEmails = async (res) => {
  const emails = await databaseClient.query(sql.adminGetReadEmails, ['read']);

  if (!emails.length) {
    return res.status(404).json({ message: 'admin, no read emails found' });
  }

  return res.status(200).json({
    message: 'admin, read emails retrieved',
    data: emails,
  });
};

export const adminDeleteReceivedEmail = async (res, emailId) => {
  const email = await databaseClient.query(
    sql.adminRetrieveUserSpecificReceivedEmail,
    [emailId]
  );

  if (!email.length) {
    return res.status(404).json({ message: 'admin, received email not found' });
  }

  await databaseClient.query(sql.deleteSpecificEmail, [emailId]);

  return res.status(200).json({ message: 'received email deleted by admin' });
};
