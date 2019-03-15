import Joi from "joi";

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

const loginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtomas: 2 })
    .required(),
  password: Joi.string().alphanum().min(3).max(15)
    .required(),
});

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

const emailParams = Joi.object().keys({
  emailId: Joi.number().integer()
    .required(),
});

export default {
  userSchema, loginSchema, messageSchema, emailParams,
};
