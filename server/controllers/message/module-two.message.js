import sql from '../../db/queries';
import databaseClient from '../../db';
import { findAdmin } from '../group/extracts/admin.extract-methods';
import { deleteReceivedEmail } from './extracts/user.extract-methods';
import {
  adminDeleteReceivedEmail,
  adminFindDraftEmail,
} from './extracts/admin.extract-methods';

class ModuleTwoMessageController {
  static async retrieveSpecificDraftEmail(req, res) {
    const { userEmail } = req;
    const emailId = req.params.id;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminFindDraftEmail(res, emailId);
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
    const { userEmail } = req;
    const emailId = req.params.id;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminDeleteReceivedEmail(res, emailId);
    }

    deleteReceivedEmail(res, emailId, userEmail);
  }

  static async deleteSpecificSentEmail(req, res) {
    const isAdmin = true;
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
    const isAdmin = true;
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

export default ModuleTwoMessageController;
