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
  sendEmail(req, res) {
    const {
      subject, message, parentMessageId, receiverEmail, status,
    } = req.body;
    const senderEmail = req.userEmail;
    const trueReceiver = database(sql.retrieveSpecificUser, [receiverEmail]);
    trueReceiver.then((response) => {
      if (response.length === 0 || response.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'the receiver is not registered' });
      } else if (senderEmail === receiverEmail) {
        res.status(400).json({ status: 400, error: 'the sender and receiver email must not be the same' });
      } else {
        const messagee = new Message(
          subject, message, parentMessageId, senderEmail, receiverEmail, status,
        );
        if (status === 'sent') {
          const delivered = database(sql.delivered, [messagee.subject, messagee.message, messagee.parentMessageId, messagee.senderEmail, messagee.receiverEmail, 'unread', moment().format('LL')]);
          delivered.then((response) => {
            if (response) {
              const query = database(sql.sendEmail, [messagee.subject, messagee.message, messagee.parentMessageId, messagee.senderEmail, messagee.receiverEmail, messagee.status, moment().format('LL')]);
              query.then((response) => {
                const {
                  id, subject, message, parentmessageid, senderemail, receiveremail, status, createdon,
                } = response[0];
                res.status(201).json({
                  status: 201,
                  success: 'email sent',
                  data: [{
                    id, subject, message, parentmessageid, senderemail, receiveremail, status, createdon,
                  }],
                });
              });
            } else {
              res.status(400).json({ status: 400, error: 'email not sent' });
            }
          });
        } else if (status === 'draft') {
          const query = database(sql.draftEmail, [messagee.subject, messagee.message, messagee.parentMessageId, messagee.senderEmail, messagee.receiverEmail, messagee.status, moment().format('LL')]);
          query.then((response) => {
            const {
              id, subject, message, parentmessageid, senderemail, receiveremail, status, createdon,
            } = response[0];
            res.status(201).json({
              status: 201,
              success: 'email drafted',
              data: [{
                id, subject, message, parentmessageid, senderemail, receiveremail, status, createdon,
              }],
            });
          });
        }
      }
    });
  },

  retrieveReceivedEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const allEmails = database(sql.retrieveAllEmails);
        allEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({
              status: 404,
              error: 'admin, received emails not found',
            });
          } else {
            res.status(200).json({
              status: 200,
              success: 'admin, received emails retrieved',
              data: response,
            });
          }
        });
      } else {
        const specificUserEmails = database(sql.retrieveSpecificUserEmails, [user]);
        specificUserEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'received emails not found' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'received emails retrieved',
              data: response,
            });
          }
        });
      }
    });
  },

  retrieveSpecificReceivedEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const specificEmail = database(sql.adminRetrieveUserSpecificReceivedEmail, [emailId]);
        specificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, received email not found' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'admin, received email retrieved',
              data: response,
            });
          }
        });
      } else {
        const userSpecificEmail = database(sql.retrieveUserSpecificReceivedEmail, [emailId, user]);
        userSpecificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'email not found' });
          } else {
            const status = 'read';
            const readEmail = database(sql.emailRead, [status, emailId]);
            readEmail.then((response) => {
              if (response) {
                res.status(200).json({
                  status: 200,
                  success: 'email retrieved',
                  data: response,
                });
              } else {
                res.status(400).json({ status: 400, error: 'email not retrieved' });
              }
            });
          }
        });
      }
    });
  },

  retrieveSentEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const adminGetSentEmails = database(sql.adminGetSentEmails);
        adminGetSentEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, no sent emails found' });
          } else if (response.length !== 0) {
            res.status(200).json({
              status: 200,
              success: 'admin, sent emails retrieved',
              data: response,
            });
          }
        });
      } else {
        const sentEmails = database(sql.retrieveSentEmails, [user]);
        sentEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'sorry! you have sent no emails!' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'your sent emails retrieved',
              data: response,
            });
          }
        });
      }
    });
  },

  retrieveSpecificSentEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const specificEmail = database(sql.adminRetrieveUserSpecificSentEmail, [emailId]);
        specificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, sent email not found' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'admin, sent email retrieved',
              data: response,
            });
          }
        });
      } else {
        const userSpecificEmail = database(sql.retrieveUserSpecificSentEmail, [emailId, user]);
        userSpecificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'sent email not found' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'sent email retrieved',
              data: response,
            });
          }
        });
      }
    });
  },

  retrieveReadEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const status = 'read';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const adminGetReadEmails = database(sql.adminGetReadEmails, [status]);
        adminGetReadEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, no read emails found' });
          } else if (response.length !== 0) {
            res.status(200).json({
              status: 200,
              success: 'admin, read emails retrieved',
              data: response,
            });
          }
        });
      } else {
        const readEmails = database(sql.retrieveReadEmails, [status, user]);
        readEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'sorry! you have read no emails!' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'your read emails retrieved',
              data: response,
            });
          }
        });
      }
    });
  },

  retrieveUnReadEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const status = 'unread';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const adminGetUnreadEmails = database(sql.adminGetUnreadEmails, [status]);
        adminGetUnreadEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, no unread emails found' });
          } else if (response.length !== 0) {
            res.status(200).json({
              status: 200,
              success: 'admin, unread emails retrieved',
              data: response,
            });
          }
        });
      } else {
        const unreadEmails = database(sql.retrieveUnreadEmails, [status, user]);
        unreadEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'sorry! you have no unread emails!' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'your unread emails retrieved',
              data: response,
            });
          }
        });
      }
    });
  },

  retrieveDraftEmails(req, res) {
    const user = req.userEmail;
    const userAccess = 'true';
    const status = 'draft';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const adminGetDraftEmails = database(sql.adminGetDraftEmails, [status]);
        adminGetDraftEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, no draft emails emails found' });
          } else if (response.length !== 0) {
            res.status(200).json({
              status: 200,
              success: 'admin, draft emails retrieved',
              data: response,
            });
          }
        });
      } else {
        const draftEmails = database(sql.retrieveDraftEmails, [status, user]);
        draftEmails.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'sorry! you have no draft emails!' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'your draft emails retrieved',
              data: response,
            });
          }
        });
      }
    });
  },

  retrieveSpecificDraftEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const findAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    findAdmin.then((response) => {
      if (response.length !== 0) {
        const specificEmail = database(sql.adminRetrieveUserSpecificDraftEmail, [emailId]);
        specificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, draft email not found' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'admin, draft email retrieved',
              data: response,
            });
          }
        });
      } else {
        const userSpecificEmail = database(sql.retrieveUserSpecificDraftEmail, [emailId, user]);
        userSpecificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'draft email not found' });
          } else {
            res.status(200).json({
              status: 200,
              success: 'draft email retrieved',
              data: response,
            });
          }
        });
      }
    });
  },

  deleteSpecificReceivedEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const specificEmail = database(sql.adminRetrieveUserSpecificReceivedEmail, [emailId]);
        specificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'admin, received email not found' });
          } else {
            const deleteEmail = database(sql.deleteSpecificEmail, [emailId]);
            deleteEmail.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: 'received email deleted by admin' });
              }
            });
          }
        });
      } else {
        const userSpecificEmail = database(sql.retrieveUserSpecificReceivedEmail, [emailId, user]);
        userSpecificEmail.then((response) => {
          if (response.length === 0 || response.length === 'undefined') {
            res.status(404).json({ status: 404, error: 'received email not found' });
          } else {
            const deleteEmail = database(sql.deleteSpecificEmail, [emailId]);
            deleteEmail.then((response) => {
              if (response) {
                res.status(200).json({ status: 200, success: 'received email deleted' });
              }
            });
          }
        });
      }
    });
  },

  deleteSpecificSentEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const specificEmail = database(sql.retrieveSpecificSentEmail, [emailId]);
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

  deleteSpecificDraftEmail(req, res) {
    const emailId = req.params.id;
    const user = req.userEmail;
    const userAccess = 'true';
    const retrieveAdmin = database(sql.retrieveAdmin, [user, userAccess]);
    retrieveAdmin.then((response) => {
      if (response.length !== 0) {
        const specificEmail = database(sql.retrieveSpecificDraftEmail, [emailId]);
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
