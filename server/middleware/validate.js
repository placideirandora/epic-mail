import Joi from 'joi';

const validate = {

  validateRegistration(req, res, next) {
    const userSchema = Joi.object().keys({
      firstname: Joi.string().alphanum().min(4).max(15)
        .required(),
      lastname: Joi.string().alphanum().min(4).max(15)
        .required(),
      username: Joi.string().alphanum().min(4).max(25)
        .required(),
      password: Joi.string().alphanum().min(3).max(15)
        .required(),
    });

    const { error } = Joi.validate(req.body, userSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
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
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateEmail(req, res, next) {
    const messageSchema = Joi.object().keys({
      subject: Joi.string().trim().min(2).max(25)
        .required(),
      message: Joi.string().trim().min(10)
        .max(800)
        .required(),
      receiverEmail: Joi.string().email({ minDomainAtomas: 2 })
        .required(),
      parentMessageId: Joi.number().integer()
        .required(),
      status: Joi.string().valid('sent', 'draft')
        .required(),
    });

    const { error } = Joi.validate(req.body, messageSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateUserId(req, res, next) {
    const userParams = Joi.object().keys({
      userId: Joi.number().integer()
        .required(),
    });
    const userId = req.params.id;
    const { error } = Joi.validate({ userId }, userParams);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateEmailAddr(req, res, next) {
    const emailSchema = Joi.object().keys({
      email: Joi.string().email({ minDomainAtomas: 2 })
        .required(),
    });

    const { error } = Joi.validate(req.body, emailSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
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
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateGroup(req, res, next) {
    const groupSchema = Joi.object().keys({
      name: Joi.string().trim().min(6).max(30)
        .required(),
      role: Joi.string().trim().min(5).max(60)
        .required(),
    });

    const { error } = Joi.validate(req.body, groupSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateGroupId(req, res, next) {
    const groupIdParams = Joi.object().keys({
      groupId: Joi.number().integer()
        .required(),
    });
    const groupId = req.params.id;
    const { error } = Joi.validate({ groupId }, groupIdParams);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateGroupName(req, res, next) {
    const groupNameSchema = Joi.object().keys({
      name: Joi.string().trim().min(6).max(30)
        .required(),
    });
    const { error } = Joi.validate(req.body, groupNameSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateGroupIdAndMemberId(req, res, next) {
    const groupMemberParams = Joi.object().keys({
      groupId: Joi.number().integer()
        .required(),
      memberId: Joi.number().integer()
        .required(),
    });
    const groupId = req.params.id;
    const memberId = req.params.mid;
    const { error } = Joi.validate({ groupId, memberId }, groupMemberParams);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateGroupMember(req, res, next) {
    const groupMemberSchema = Joi.object().keys({
      username: Joi.string().alphanum().min(5).max(15)
        .required(),
      email: Joi.string().email({ minDomainAtomas: 2 })
        .required(),
    });

    const { error } = Joi.validate(req.body, groupMemberSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

  validateGroupEmail(req, res, next) {
    const messageSchema = Joi.object().keys({
      subject: Joi.string().trim().min(2).max(25)
        .required(),
      message: Joi.string().trim().min(10)
        .max(800)
        .required(),
      parentMessageId: Joi.number().integer()
        .required(),
    });

    const { error } = Joi.validate(req.body, messageSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message.replace(/\\|(")/g, '') });
      return;
    }
    next();
  },

};

export default validate;
