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

export default {
  userSchema,
};
