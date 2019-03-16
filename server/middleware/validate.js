import Joi from "joi";

const validate = {

  validateRegistration(req, res, next) {
    const userSchema = Joi.object().keys({
      firstname: Joi.string().alphanum().min(5).max(15)
        .required(),
      lastname: Joi.string().alphanum().min(5).max(15)
        .required(),
      email: Joi.string().email({ minDomainAtomas: 2 })
        .required(),
      password: Joi.string().alphanum().min(3).max(15)
        .required(),
    });

    const { error } = Joi.validate(req.body, userSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, "") });
      return;
    }
    next();
  },

  validateLogin(req, res, next) {
    const loginSchema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtomas: 2 })
        .required(),
      password: Joi.string().alphanum().min(3).max(15)
        .required(),
    });

    const { error } = Joi.validate(req.body, loginSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, "") });
      return;
    }
    next();
  },

  validateEmail(req, res, next) {
    const messageSchema = Joi.object().keys({
      subject: Joi.string().trim().min(5).max(25)
        .required(),
      message: Joi.string().trim().min(10)
        .max(100)
        .required(),
      senderId: Joi.number().integer()
        .required(),
      receiverId: Joi.number().integer()
        .required(),
      parentMessageId: Joi.number().integer()
        .required(),
      status: Joi.string().alphanum().valid("sent", "draft", "read", "unread")
        .required(),
    });

    const { error } = Joi.validate(req.body, messageSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, "") });
      return;
    }
    next();
  },

  validateEmailId(req, res, next) {
    const emailParams = Joi.object().keys({
      emailId: Joi.number().integer()
        .required(),
    });
    const emailId = req.params.id;
    const { error } = Joi.validate({ emailId }, emailParams);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, "") });
      return;
    }
    next();
  },

};

export default validate;
