import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import dummy from "../models/dummy";
import validate from "../middleware/validate";

const users = {
  registerUser(req, res) {
    const {
      firstname, lastname, email, password,
    } = req.body;
    const { error } = Joi.validate(
      {
        firstname, lastname, email, password,
      }, validate.userSchema,
    );
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      const id = dummy.users.length + 1;
      const user = new User(
        id, firstname, lastname, email, password,
      );
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      const token = jwt.sign({ user: dummy.users.push(user) }, "secret-key");
      res.status(201).json({
        status: 201, success: "user registered", data: [{ token, user }],
      });
    }
  },
};

export default users;
