/* eslint-disable max-len */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
import dotenv from 'dotenv';
import moment from 'moment';
import Message from '../models/message';
import database from '../db/database';
import sql from '../helpers/sql';

dotenv.config();

const messages = {
  /**
   * send email endpoint
   * @param {object} req
   * @param {object} res
   */
  async sendEmail(req, res) {
    const {
      subject, message, parentMessageId, receiverEmail, status,
    } = req.body;
    const senderEmail = req.userEmail;
    const trueReceiver = database(sql.retrieveSpecificUser, [receiverEmail]);
    const responseOne = await trueReceiver;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res.status(404).json({ status: 404, error: 'the receiver is not registered' });
    } else if (senderEmail === receiverEmail) {
      res.status(400).json({ status: 400, error: 'the sender and receiver email must not be the same' });
    } else {
      const messagee = new Message(
        subject, message, parentMessageId, senderEmail, receiverEmail, status,
      );
      if (status === 'sent') {
        const delivered = database(sql.delivered, [messagee.subject, messagee.message, messagee.parentMessageId, messagee.senderEmail, messagee.receiverEmail, 'unread', moment().format('LL')]);
        const responseTwo = await delivered;
        if (responseTwo) {
          const query = database(sql.sendEmail, [messagee.subject, messagee.message, messagee.parentMessageId, messagee.senderEmail, messagee.receiverEmail, messagee.status, moment().format('LL')]);
          const responseThree = await query;
          const {
            id, subject, message, parentmessageid, senderemail, receiveremail, status, createdon,
          } = responseThree[0];
          res.status(201).json({
            status: 201,
            success: 'email sent',
            data: [{
              id, subject, message, parentmessageid, senderemail, receiveremail, status, createdon,
            }],
          });
        }
      } else if (status === 'draft') {
        const query = database(sql.draftEmail, [messagee.subject, messagee.message, messagee.parentMessageId, messagee.senderEmail, messagee.receiverEmail, messagee.status, moment().format('LL')]);
        const responseFour = await query;
        const {
          id, subject, message, parentmessageid, senderemail, receiveremail, status, createdon,
        } = responseFour[0];
        res.status(201).json({
          status: 201,
          success: 'email drafted',
          data: [{
            id, subject, message, parentmessageid, senderemail, receiveremail, status, createdon,
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
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await findAdmin;
    if (responseOne.length !== 0) {
      const allEmails = database(sql.retrieveAllEmails);
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
      const specificUserEmails = database(sql.retrieveSpecificUserEmails, [user]);
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
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await findAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = database(sql.adminRetrieveUserSpecificReceivedEmail, [emailId]);
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
      const userSpecificEmail = database(sql.retrieveUserSpecificReceivedEmail, [emailId, user]);
      const responseThree = await userSpecificEmail;
      if (responseThree.length === 0 || responseThree.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'received email not found' });
      } else {
        const status = 'read';
        const readEmail = database(sql.emailRead, [status, emailId]);
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
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const adminGetSentEmails = database(sql.adminGetSentEmails);
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
      const sentEmails = database(sql.retrieveSentEmails, [user]);
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
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await findAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = database(sql.adminRetrieveUserSpecificSentEmail, [emailId]);
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
      const userSpecificEmail = database(sql.retrieveUserSpecificSentEmail, [emailId, user]);
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
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const adminGetReadEmails = database(sql.adminGetReadEmails, [status]);
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
      const readEmails = database(sql.retrieveReadEmails, [status, user]);
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
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const adminGetUnreadEmails = database(sql.adminGetUnreadEmails, [status]);
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
      const unreadEmails = database(sql.retrieveUnreadEmails, [status, user]);
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
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const adminGetDraftEmails = database(sql.adminGetDraftEmails, [status]);
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
      const draftEmails = database(sql.retrieveDraftEmails, [status, user]);
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
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await findAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = database(sql.adminRetrieveUserSpecificDraftEmail, [emailId]);
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
      const userSpecificEmail = database(sql.retrieveUserSpecificDraftEmail, [emailId, user]);
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
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    const responseOne = await retrieveAdmin;
    if (responseOne.length !== 0) {
      const specificEmail = database(sql.adminRetrieveUserSpecificReceivedEmail, [emailId]);
      const responseTwo = await specificEmail;
      if (responseTwo.length === 0 || responseTwo.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'admin, received email not found' });
      } else {
        const deleteEmail = database(sql.deleteSpecificEmail, [emailId]);
        const responseThree = await deleteEmail;
        if (responseThree) {
          res.status(200).json({ status: 200, success: 'received email deleted by admin' });
        }
      }
    } else {
      const userSpecificEmail = database(sql.retrieveUserSpecificReceivedEmail, [emailId, user]);
      const responseFour = await userSpecificEmail;
      if (responseFour.length === 0 || responseFour.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'received email not found' });
      } else {
        const deleteEmail = database(sql.deleteSpecificEmail, [emailId]);
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
  deleteSpecificSentEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const specificEmail = database(sql.adminRetrieveUserSpecificSentEmail, [emailId]);
        specificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, sent email not found' });
          } else {
            const deleteEmail = database(sql.deleteSpecificSentEmail, [emailId]);
            deleteEmail.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: 'sent email deleted by admin' });
              }
            });
          }
        });
      } else {
        const userSpecificEmail = database(sql.retrieveUserSpecificSentEmail, [emailId, user]);
        userSpecificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'sent email not found' });
          } else {
            const deleteEmail = database(sql.deleteSpecificSentEmail, [emailId]);
            deleteEmail.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: 'sent email deleted' });
              }
            });
          }
        });
      }
    });
  },

  /**
   * delete a single draft email endpoint
   * @param {object} req
   * @param {object} res
   */
  deleteSpecificDraftEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const specificEmail = database(sql.adminRetrieveUserSpecificDraftEmail, [emailId]);
        specificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, draft email not found' });
          } else {
            const deleteEmail = database(sql.deleteSpecificDraftEmail, [emailId]);
            deleteEmail.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: 'draft email deleted by admin' });
              }
            });
          }
        });
      } else {
        const userSpecificEmail = database(sql.retrieveUserSpecificDraftEmail, [emailId, user]);
        userSpecificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'draft email not found' });
          } else {
            const deleteEmail = database(sql.deleteSpecificDraftEmail, [emailId]);
            deleteEmail.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: 'draft email deleted' });
              }
            });
          }
        });
      }
    });
  },
};

export default messages;
