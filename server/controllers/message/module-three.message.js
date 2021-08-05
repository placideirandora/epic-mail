import sql from '../../db/queries';
import databaseClient from '../../db';

class ModuleThreeMessageController {
  static async retrieveSpecificSentEmail(req, res) {
    const isAdmin = true;
    const { userEmail } = req;
    const emailId = req.params.id;

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
    const isAdmin = true;
    const status = 'read';
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
    const isAdmin = true;
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
    const isAdmin = true;
    const status = 'draft';
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
}

export default ModuleThreeMessageController;
