import sql from '../db/queries';
import databaseClient from '../db';
import Message from '../models/message';

class MessageController {
  static async sendEmail(req, res) {
    try {
      const { subject, message, receiverEmail, status } = req.body;
      const senderEmail = req.userEmail;

      const receiver = await databaseClient.query(sql.retrieveSpecificUser, [
        receiverEmail,
      ]);

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
        // SEND MESSAGE TO THE RECEIVER'S INBO
        await databaseClient.query(sql.delivered, [
          messageObj.subject,
          messageObj.message,
          messageObj.senderEmail,
          messageObj.receiverEmail,
          'unread',
        ]);

        // KEEP TRACK OF THE SENT MESSAGE
        const sentMessage = await databaseClient.query(sql.sendEmail, [
          messageObj.subject,
          messageObj.message,
          messageObj.senderEmail,
          messageObj.receiverEmail,
          messageObj.status,
        ]);

        return res.status(201).json({
          message: 'email sent',
          data: sentMessage[0],
        });
      }

      if (status === 'draft') {
        const draftedMessage = await databaseClient.query(sql.draftEmail, [
          messageObj.subject,
          messageObj.message,
          messageObj.senderEmail,
          messageObj.receiverEmail,
          messageObj.status,
        ]);

        res.status(201).json({
          message: 'email drafted',
          data: draftedMessage[0],
        });
      }
    } catch (error) {
      const message = 'Something went wrong while attempting to send the email';

      res.status(500).json({
        message,
      });
    }
  }

  static async retrieveReceivedEmails(req, res) {
    const isAdmin = 'true';
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
    const isAdmin = 'true';

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    // ADMIN CAN RETRIEVE ALL USER'S RECEIVED EMAIL
    if (admin.length) {
      const email = await databaseClient.query(
        sql.adminRetrieveUserSpecificReceivedEmail,
        [emailId]
      );

      if (!email.length) {
        return res
          .status(404)
          .json({ message: 'admin, received email not found' });
      }

      return res.status(200).json({
        message: 'admin, received email retrieved',
        data: email,
      });
    }

    // USER CAN ONLY RETRIEVE THEIR RECEIVED EMAIL
    const unreadEmail = await databaseClient.query(
      sql.retrieveUserSpecificReceivedEmail,
      [emailId, userEmail]
    );

    if (!unreadEmail.length) {
      return res.status(404).json({ message: 'received email not found' });
    }

    // AFTER RETRIEVING THE EMAIL IT IS MARKED AS READ
    const status = 'read';
    const readEmail = await databaseClient.query(sql.emailRead, [
      status,
      emailId,
    ]);

    res.status(200).json({
      message: 'received email retrieved',
      data: readEmail,
    });
  }

  static async retrieveSentEmails(req, res) {
    const user = req.userEmail;
    const isAdmin = 'true';

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

  static async retrieveSpecificSentEmail(req, res) {
    const { userEmail } = req;
    const emailId = req.params.id;
    const isAdmin = 'true';

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    if (admin.length) {
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
    }

    const email = await databaseClient.query(
      sql.retrieveUserSpecificSentEmail,
      [emailId, userEmail]
    );

    if (!email.length) {
      return res.status(404).json({ message: 'sent email not found' });
    }

    res.status(200).json({
      message: 'sent email retrieved',
      data: email,
    });
  }

  static async retrieveReadEmails(req, res) {
    const status = 'read';
    const isAdmin = 'true';
    const { userEmail } = req;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    // ADMIN CAN RETRIEVE ALL USER'S READ EMAILS
    if (admin.length) {
      const emails = await databaseClient.query(sql.adminGetReadEmails, [
        status,
      ]);

      if (!emails.length) {
        return res.status(404).json({ message: 'admin, no read emails found' });
      }

      return res.status(200).json({
        message: 'admin, read emails retrieved',
        data: emails,
      });
    }

    // USER CAN ONLY RETRIEVE THEIR READ EMAILS
    const emails = await databaseClient.query(sql.retrieveReadEmails, [
      status,
      userEmail,
    ]);

    if (!emails.length) {
      return res
        .status(404)
        .json({ message: 'sorry! you have read no emails!' });
    }

    res.status(200).json({
      message: 'your read emails retrieved',
      data: emails,
    });
  }

  static async retrieveUnReadEmails(req, res) {
    const isAdmin = 'true';
    const status = 'unread';
    const { userEmail } = req;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    // ADMIN CAN RETRIEVE ALL USER'S UNREAD EMAILS
    if (admin.length) {
      const emails = await databaseClient.query(sql.adminGetUnreadEmails, [
        status,
      ]);

      if (!emails.length) {
        return res
          .status(404)
          .json({ message: 'admin, no unread emails found' });
      }

      return res.status(200).json({
        message: 'admin, unread emails retrieved',
        data: emails,
      });
    }

    // USER CAN ONLY RETRIEVE THEIR UNREAD EMAILS
    const emails = await databaseClient.query(sql.retrieveUnreadEmails, [
      status,
      userEmail,
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
  }

  static async retrieveDraftEmails(req, res) {
    const status = 'draft';
    const isAdmin = 'true';
    const { userEmail } = req;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    // ADMIN CAN RETRIEVE ALL USER'S DRAFT EMAILS
    if (admin.length) {
      const emails = await databaseClient.query(sql.adminGetDraftEmails, [
        status,
      ]);

      if (!emails.length) {
        return res
          .status(404)
          .json({ message: 'admin, no draft emails found' });
      }

      return res.status(200).json({
        message: 'admin, draft emails retrieved',
        data: emails,
      });
    }

    // USER CAN ONLY RETRIEVE THEIR DRAFT EMAILS
    const emails = await databaseClient.query(sql.retrieveDraftEmails, [
      status,
      userEmail,
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
  }

  static async retrieveSpecificDraftEmail(req, res) {
    const isAdmin = 'true';
    const { userEmail } = req;
    const emailId = req.params.id;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    if (admin.length) {
      const email = await databaseClient.query(
        sql.adminRetrieveUserSpecificDraftEmail,
        [emailId]
      );

      if (!email.length) {
        return res
          .status(404)
          .json({ message: 'admin, draft email not found' });
      }

      return res.status(200).json({
        message: 'admin, draft email retrieved',
        data: email,
      });
    }

    const email = await databaseClient.query(
      sql.retrieveUserSpecificDraftEmail,
      [emailId, userEmail]
    );

    if (!email.length) {
      return res.status(404).json({ message: 'draft email not found' });
    }

    res.status(200).json({
      message: 'draft email retrieved',
      data: email,
    });
  }

  static async deleteSpecificReceivedEmail(req, res) {
    const isAdmin = 'true';
    const { userEmail } = req;
    const emailId = req.params.id;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    // ADMIN CAN DELETE ANY USER'S RECEIVED EMAILS
    if (admin.length) {
      const email = await databaseClient.query(
        sql.adminRetrieveUserSpecificReceivedEmail,
        [emailId]
      );

      if (!email.length) {
        return res
          .status(404)
          .json({ message: 'admin, received email not found' });
      }

      await databaseClient.query(sql.deleteSpecificEmail, [emailId]);

      return res
        .status(200)
        .json({ message: 'received email deleted by admin' });
    }

    // USER CAN ONLY DELETE THEIR RECEIVED EMAIL
    const email = await databaseClient.query(
      sql.retrieveUserSpecificReceivedEmail,
      [emailId, userEmail]
    );

    if (!email.length) {
      return res.status(404).json({ message: 'received email not found' });
    }

    await databaseClient.query(sql.deleteSpecificEmail, [emailId]);

    res.status(200).json({ message: 'received email deleted' });
  }

  static async deleteSpecificSentEmail(req, res) {
    const isAdmin = 'true';
    const { userEmail } = req;
    const emailId = req.params.id;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    // ADMIN CAN DELETE ANY USER'S SENT EMAILS
    if (admin.length) {
      const email = await databaseClient.query(
        sql.adminRetrieveUserSpecificSentEmail,
        [emailId]
      );

      if (!email.length) {
        return res.status(404).json({ message: 'admin, sent email not found' });
      }

      await databaseClient.query(sql.deleteSpecificSentEmail, [emailId]);

      return res.status(200).json({ message: 'sent email deleted by admin' });
    }

    // USER CAN ONLY DELETE THEIR SENT EMAIL
    const email = await databaseClient.query(
      sql.retrieveUserSpecificSentEmail,
      [emailId, userEmail]
    );

    if (!email.length) {
      return res.status(404).json({ message: 'sent email not found' });
    }

    await databaseClient.query(sql.deleteSpecificSentEmail, [emailId]);

    res.status(200).json({ message: 'sent email deleted' });
  }

  static async deleteSpecificDraftEmail(req, res) {
    const isAdmin = 'true';
    const { userEmail } = req;
    const emailId = req.params.id;

    const admin = await databaseClient.query(sql.retrieveAdmin, [
      userEmail,
      isAdmin,
    ]);

    // ADMIN CAN DELETE ANY USER'S DRAFT EMAILS
    if (admin.length) {
      const email = await databaseClient.query(
        sql.adminRetrieveUserSpecificDraftEmail,
        [emailId]
      );

      if (!email.length) {
        return res
          .status(404)
          .json({ message: 'admin, draft email not found' });
      }

      await databaseClient.query(sql.deleteSpecificDraftEmail, [emailId]);

      return res.status(200).json({ message: 'draft email deleted by admin' });
    }

    // USER CAN ONLY DELETE THEIR DRAFT EMAIL
    const email = await databaseClient.query(
      sql.retrieveUserSpecificDraftEmail,
      [emailId, userEmail]
    );

    if (!email.length) {
      return res.status(404).json({ message: 'draft email not found' });
    }

    await databaseClient.query(sql.deleteSpecificDraftEmail, [emailId]);

    res.status(200).json({ message: 'draft email deleted' });
  }
}

export default MessageController;
