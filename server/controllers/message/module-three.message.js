import sql from '../../db/queries';
import databaseClient from '../../db';
import { findAdmin } from '../group/extracts/admin.extract-methods';
import {
  findDraftEmails,
  findReadEmails,
  findUnreadEmails,
} from './extracts/user.extract-methods';
import {
  adminFindDraftEmails,
  adminFindReadEmails,
  adminFindSentEmail,
  adminFindUnreadEmails,
} from './extracts/admin.extract-methods';

class ModuleThreeMessageController {
  static async retrieveSpecificSentEmail(req, res) {
    const { userEmail } = req;
    const emailId = req.params.id;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminFindSentEmail(res, emailId);
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
    const { userEmail } = req;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminFindReadEmails(res);
    }

    findReadEmails(res, userEmail);
  }

  static async retrieveUnReadEmails(req, res) {
    const { userEmail } = req;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminFindUnreadEmails(res);
    }

    findUnreadEmails(res, userEmail);
  }

  static async retrieveDraftEmails(req, res) {
    const { userEmail } = req;

    const admin = await findAdmin(userEmail);

    if (admin.length) {
      return adminFindDraftEmails(res);
    }

    findDraftEmails(res, userEmail);
  }
}

export default ModuleThreeMessageController;
