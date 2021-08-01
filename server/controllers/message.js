/* eslint-disable max-len */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
import dotenv from 'dotenv';

import sql from '../db/queries';
import databaseClient from '../db';
import Message from '../models/message';

dotenv.config();

const messages = {
  /**
   * send email endpoint
   * @param {object} req
   * @param {object} res
   */
  async sendEmail(req, res) {
    const {
      subject, message, receiverEmail, status,
    } = req.body;
    const senderEmail = req.userEmail;
    const trueReceiver = await databaseClient.query(sql.retrieveSpecificUser, [receiverEmail]);
    const responseOne = await trueReceiver;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res.status(404).json({ status: 404, error: 'the receiver is not registered' });
    } else if (senderEmail === receiverEmail) {
      res.status(400).json({ status: 400, error: 'the sender and receiver email must not be the same' });
    } else {
      const messagee = new Message(
        subject, message, senderEmail, receiverEmail, status,
      );
      if (status === 'sent') {
        const delivered = await databaseClient.query(sql.delivered, [messagee.subject, messagee.message, messagee.senderEmail, messagee.receiverEmail, 'unread']);
        const responseTwo = await delivered;
        if (responseTwo) {
          const query = await databaseClient.query(sql.sendEmail, [messagee.subject, messagee.message, messagee.senderEmail, messagee.receiverEmail, messagee.status]);
          const responseThree = await query;
          const {
            id, subject, message, senderEmail, receiverEmail, status, createdAt,
          } = responseThree[0];
          res.status(201).json({
            status: 201,
            success: 'email sent',
            data: [{
              id, subject, message, senderEmail, receiverEmail, status, createdAt
            }],
          });
        }
      } else if (status === 'draft') {
        const query = await databaseClient.query(sql.draftEmail, [messagee.subject, messagee.message, messagee.senderEmail, messagee.receiverEmail, messagee.status]);
        const responseFour = await query;
        const {
          id, subject, message, senderemail, receiveremail, status, createdAt,
        } = responseFour[0];
        res.status(201).json({
          status: 201,
          success: 'email drafted',
          data: [{
            id, subject, message, senderemail, receiveremail, status, createdAt,
          }],
        });
      }
    }
  },

  /**
   * retrieve all received emails endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveReceivedEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const findAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await findAdmin;
    if (responseOne.length !== 0) {
      const allEmails = await databaseClient.query(sql.retrieveAllEmails);
      const responseTwo = await allEmails;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({
          status: 404,
          error: 'admin, received emails not found',
        });
      } else {
        res.status(200).json({
          status: 200,
          success: 'admin, received emails retrieved',
          data: responseTwo,
        });
      }
    } else {
      const specificUserEmails = await databaseClient.query(sql.retrieveSpecificUserEmails, [user]);
      const responseThree = await specificUserEmails;
      if (responseThree.length === 0 || responseThree.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'received emails not found' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'received emails retrieved',
          data: responseThree,
        });
      }
    }
  },

  /**
   * retrieve a single received email endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveSpecificReceivedEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const findAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await findAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = await databaseClient.query(sql.adminRetrieveUserSpecificReceivedEmail, [emailId]);
      const responseTwo = await specificEmail;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, received email not found' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'admin, received email retrieved',
          data: responseTwo,
        });
      }
    } else {
      const userSpecificEmail = await databaseClient.query(sql.retrieveUserSpecificReceivedEmail, [emailId, user]);
      const responseThree = await userSpecificEmail;
      if (responseThree.length === 0 || responseThree.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'received email not found' });
      } else {
        const status = 'read';
        const readEmail = await databaseClient.query(sql.emailRead, [status, emailId]);
        const responseFour = await readEmail;
        if (responseFour) {
          res.status(200).json({
            status: 200,
            success: 'received email retrieved',
            data: responseFour,
          });
        }
      }
    }
  },

  /**
   * retrieve all sent emails endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveSentEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const adminGetSentEmails = await databaseClient.query(sql.adminGetSentEmails);
      const responseTwo = await adminGetSentEmails;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, no sent emails found' });
      } else if (responseTwo.length !== 0) {
        res.status(200).json({
          status: 200,
          success: 'admin, sent emails retrieved',
          data: responseTwo,
        });
      }
    } else {
      const sentEmails = await databaseClient.query(sql.retrieveSentEmails, [user]);
      const responseTwo = await sentEmails;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'sorry! you have sent no emails!' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'your sent emails retrieved',
          data: responseTwo,
        });
      }
    }
  },

  /**
   * retrieve a single sent email endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveSpecificSentEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const findAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await findAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = await databaseClient.query(sql.adminRetrieveUserSpecificSentEmail, [emailId]);
      const responseTwo = await specificEmail;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, sent email not found' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'admin, sent email retrieved',
          data: responseTwo,
        });
      }
    } else {
      const userSpecificEmail = await databaseClient.query(sql.retrieveUserSpecificSentEmail, [emailId, user]);
      const responseThree = await userSpecificEmail;
      if (responseThree.length === 0 || responseThree.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'sent email not found' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'sent email retrieved',
          data: responseThree,
        });
      }
    }
  },

  /**
   * retrieve all read emails endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveReadEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const status = 'read';
    const retrieveAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const adminGetReadEmails = await databaseClient.query(sql.adminGetReadEmails, [status]);
      const responseTwo = await adminGetReadEmails;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, no read emails found' });
      } else if (responseTwo.length !== 0) {
        res.status(200).json({
          status: 200,
          success: 'admin, read emails retrieved',
          data: responseTwo,
        });
      }
    } else {
      const readEmails = await databaseClient.query(sql.retrieveReadEmails, [status, user]);
      const responseThree = await readEmails;
      if (responseThree.length === 0 || responseThree.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'sorry! you have read no emails!' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'your read emails retrieved',
          data: responseThree,
        });
      }
    }
  },

  /**
   * retrieve all unread emails endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveUnReadEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const status = 'unread';
    const retrieveAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const adminGetUnreadEmails = await databaseClient.query(sql.adminGetUnreadEmails, [status]);
      const responseTwo = await adminGetUnreadEmails;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, no unread emails found' });
      } else if (responseTwo.length !== 0) {
        res.status(200).json({
          status: 200,
          success: 'admin, unread emails retrieved',
          data: responseTwo,
        });
      }
    } else {
      const unreadEmails = await databaseClient.query(sql.retrieveUnreadEmails, [status, user]);
      const responseThree = await unreadEmails;
      if (responseThree.length === 0 || responseThree.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'sorry! you have no unread emails!' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'your unread emails retrieved',
          data: responseThree,
        });
      }
    }
  },

  /**
   * retrieve all draft emails endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveDraftEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const status = 'draft';
    const retrieveAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const adminGetDraftEmails = await databaseClient.query(sql.adminGetDraftEmails, [status]);
      const responseOne = await adminGetDraftEmails;
      if (responseOne.length === 0 || responseOne.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, no draft emails found' });
      } else if (responseOne.length !== 0) {
        res.status(200).json({
          status: 200,
          success: 'admin, draft emails retrieved',
          data: responseOne,
        });
      }
    } else {
      const draftEmails = await databaseClient.query(sql.retrieveDraftEmails, [status, user]);
      const responseTwo = await draftEmails;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'sorry! you have no draft emails!' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'your draft emails retrieved',
          data: responseTwo,
        });
      }
    }
  },

  /**
   * retrieve a single draft email endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveSpecificDraftEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const findAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await findAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = await databaseClient.query(sql.adminRetrieveUserSpecificDraftEmail, [emailId]);
      const responseTwo = await specificEmail;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, draft email not found' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'admin, draft email retrieved',
          data: responseTwo,
        });
      }
    } else {
      const userSpecificEmail = await databaseClient.query(sql.retrieveUserSpecificDraftEmail, [emailId, user]);
      const responseThree = await userSpecificEmail;
      if (responseThree.length === 0 || responseThree.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'draft email not found' });
      } else {
        res.status(200).json({
          status: 200,
          success: 'draft email retrieved',
          data: responseThree,
        });
      }
    }
  },

  /**
   * delete a single received email endpoint
   * @param {object} req
   * @param {object} res
   */
  async deleteSpecificReceivedEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = await databaseClient.query(sql.adminRetrieveUserSpecificReceivedEmail, [emailId]);
      const responseTwo = await specificEmail;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, received email not found' });
      } else {
        const deleteEmail = await databaseClient.query(sql.deleteSpecificEmail, [emailId]);
        const responseThree = await deleteEmail;
        if (responseThree) {
          res.status(200).json({ status: 200, success: 'received email deleted by admin' });
        }
      }
    } else {
      const userSpecificEmail = await databaseClient.query(sql.retrieveUserSpecificReceivedEmail, [emailId, user]);
      const responseFour = await userSpecificEmail;
      if (responseFour.length === 0 || responseFour.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'received email not found' });
      } else {
        const deleteEmail = await databaseClient.query(sql.deleteSpecificEmail, [emailId]);
        const responseFive = await deleteEmail;
        if (responseFive) {
          res.status(200).json({ status: 200, success: 'received email deleted' });
        }
      }
    }
  },

  /**
   * delete a single sent email endpoint
   * @param {object} req
   * @param {object} res
   */
  async deleteSpecificSentEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = await databaseClient.query(sql.adminRetrieveUserSpecificSentEmail, [emailId]);
      const responseTwo = await specificEmail;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, sent email not found' });
      } else {
        const deleteEmail = await databaseClient.query(sql.deleteSpecificSentEmail, [emailId]);
        const responseThree = await deleteEmail;
        if (responseThree) {
          res.status(200).json({ status: 200, success: 'sent email deleted by admin' });
        }
      }
    } else {
      const userSpecificEmail = await databaseClient.query(sql.retrieveUserSpecificSentEmail, [emailId, user]);
      const responseFour = await userSpecificEmail;
      if (responseFour.length === 0 || responseFour.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'sent email not found' });
      } else {
        const deleteEmail = await databaseClient.query(sql.deleteSpecificSentEmail, [emailId]);
        const responseFive = await deleteEmail;
        if (responseFive) {
          res.status(200).json({ status: 200, success: 'sent email deleted' });
        }
      }
    }
  },

  /**
   * delete a single draft email endpoint
   * @param {object} req
   * @param {object} res
   */
  async deleteSpecificDraftEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = await databaseClient.query(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = await databaseClient.query(sql.adminRetrieveUserSpecificDraftEmail, [emailId]);
      const responseTwo = await specificEmail;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, draft email not found' });
      } else {
        const deleteEmail = await databaseClient.query(sql.deleteSpecificDraftEmail, [emailId]);
        const responseThree = await deleteEmail;
        if (responseThree) {
          res.status(200).json({ status: 200, success: 'draft email deleted by admin' });
        }
      }
    } else {
      const userSpecificEmail = await databaseClient.query(sql.retrieveUserSpecificDraftEmail, [emailId, user]);
      const responseFour = await userSpecificEmail;
      if (responseFour.length === 0 || responseFour.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'draft email not found' });
      } else {
        const deleteEmail = await databaseClient.query(sql.deleteSpecificDraftEmail, [emailId]);
        const responseFive = await deleteEmail;
        if (responseFive) {
          res.status(200).json({ status: 200, success: 'draft email deleted' });
        }
      }
    }
  },
};

export default messages;
