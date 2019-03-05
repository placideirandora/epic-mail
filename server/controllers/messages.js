import Joi from "joi";
import moment from "moment";
import Message from "../models/message";
import dummy from "../models/dummy";
import validate from "../middleware/validate";

const messages = {
  sendEmail(req, res) {
    const {
      subject, message, parentMessageId, status,
    } = req.body;
    const { error } = Joi.validate(
      {
        subject, message, parentMessageId, status,
      }, validate.messageSchema,
    );
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const id = dummy.messages.length + 1;
      const createdOn = moment().format("LL");
      const messagee = new Message(
        id, createdOn, subject, message, parentMessageId, status,
      );
      dummy.messages.push(messagee);
      if (status === "sent") {
        res.status(201).json({
          status: 201, success: "email sent", data: [messagee],
        });
      } else if (status === "draft") {
        res.status(201).json({
          status: 201, success: "email drafted", data: [messagee],
        });
      } else {
        res.status(201).json({
          status: 201, success: "email read", data: [messagee],
        });
      }
    }
  },

  retrieveMails(req, res) {
    if (dummy.messages.length === 0) {
      res.status(404).json({
        status: 404,
        error: "no emails found",
      });
    } else {
      res.status(200).json({
        status: 200,
        success: "received emails retrieved",
        data: dummy.messages,
      });
    }
  },

  retrieveSpecificEmail(req, res) {
    const emailId = parseInt(req.params.id, 10);
    const { error } = Joi.validate(
      {
        emailId,
      },
      validate.emailParams,
    );
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      // eslint-disable-next-line array-callback-return
      dummy.messages.map((email) => {
        if (email.id === emailId) {
          res.status(200).json({
            status: 200,
            success: "email retrieved",
            data: email,
          });
        }
      });
      res.status(404).json({
        status: 404,
        error: "email not found",
      });
    }
  },

  deleteMail(req, res) {
    const emailId = parseInt(req.params.id, 10);
    const { error } = Joi.validate(
      {
        emailId,
      },
      validate.emailParams,
    );
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      for (let i = 0; i < dummy.messages.length; i++) {
        if (dummy.messages[i].id === emailId) {
          dummy.messages.splice(i, emailId);
          res.status(200).json({
            status: 200,
            success: "email deleted",
          });
        }
      }
      res.status(404).json({
        status: 404,
        error: "email not found",
      });
    }
  },
};

export default messages;
