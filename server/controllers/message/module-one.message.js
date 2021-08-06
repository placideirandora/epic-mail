import sql from '../../db/queries';
import databaseClient from '../../db';
import Message from '../../models/message';
import {
  findUser,
  sendInboxMessage,
  sendDraftMessage,
  sendOutboxMessage,
  findReceivedEmail,
  markEmailAsRead,
} from './extracts/user.extract-methods';
import { findAdmin } from '../group/extracts/admin.extract-methods';
import { adminFindReceivedEmail } from './extracts/admin.extract-methods';

class ModuleOneMessageController {
  static async sendEmail(req, res) {
    try {
      const { subject, message, receiverEmail, status } = req.body;
      const senderEmail = req.userEmail;

      const receiver = await findUser(receiverEmail);

      if (!receiver.length) {
        return res
          .status(404)
          .json({ message: 'the receiver is not registered' });
      }

      if (senderEmail === receiverEmail) {
        return res.status(400).json({
          message: 'the sender and receiver email must not be the same',
        });
      }

      const messageObj = new Message(
        subject,
        message,
        senderEmail,
        receiverEmail,
        status
      );

      if (status === 'sent') {
        await sendInboxMessage(messageObj);

        return sendOutboxMessage(res, messageObj);
      }

      if (status === 'draft') {
        sendDraftMessage(res, messageObj);
      }
    } catch (error) {
      const message = 'Something went wrong while attempting to send the email';

      res.status(500).json({
        message,
      });
    }
  }

  static async retrieveReceivedEmails(req, res) {
    const isAdmin = true;
    const { userEmail } = req;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    // ADMIN CAN RETRIEVE ALL RECEIVED EMAILS
    if (admin.length) {
      const emails = await databaseClient.query(sql.retrieveAllEmails);

      if (!emails.length) {
        return res.status(404).json({
          message: 'admin, received emails not found',
        });
      }

      return res.status(200).json({
        message: 'admin, received emails retrieved',
        data: emails,
      });
    }

    // USER CAN ONLY RETRIEVE THEIR EMAILS
    const userEmails = await databaseClient.query(
      sql.retrieveSpecificUserEmails,
      [userEmail]
    );

    if (!userEmails.length) {
      return res.status(404).json({ message: 'received emails not found' });
    }

    res.status(200).json({
      message: 'received emails retrieved',
      data: userEmails,
    });
  }

  static async retrieveSpecificReceivedEmail(req, res) {
    const { userEmail } = req;
    const emailId = req.params.id;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminFindReceivedEmail(res, emailId);
    }

    const unreadEmail = await findReceivedEmail(emailId, userEmail);

    if (!unreadEmail.length) {
      return res.status(404).json({ message: 'received email not found' });
    }

    const readEmail = await markEmailAsRead(emailId);

    res.status(200).json({
      message: 'received email retrieved',
      data: readEmail,
    });
  }

  static async retrieveSentEmails(req, res) {
    const isAdmin = true;
    const user = req.userEmail;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      user,
      isAdmin,
    ]);

    // ADMIN CAN RETRIEVE ALL USER'S SENT EMAILS
    if (admin.length) {
      const emails = await databaseClient.query(sql.adminGetSentEmails);

      if (!emails.length) {
        return res.status(404).json({ message: 'admin, no sent emails found' });
      }

      return res.status(200).json({
        message: 'admin, sent emails retrieved',
        data: emails,
      });
    }

    // USER CAN ONLY RETRIEVE THEIR SENT EMAILS
    const emails = await databaseClient.query(sql.retrieveSentEmails, [user]);

    if (!emails.length) {
      return res
        .status(404)
        .json({ message: 'sorry! you have sent no emails!' });
    }

    res.status(200).json({
      message: 'your sent emails retrieved',
      data: emails,
    });
  }
}

export default ModuleOneMessageController;
