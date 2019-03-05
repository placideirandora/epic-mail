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
};

export default messages;
