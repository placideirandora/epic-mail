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

  loginUser(req, res) {
    const {
      email, password,
    } = req.body;

    const { error } = Joi.validate({
      email, password,
    }, validate.loginSchema);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      for (let i = 0; i < dummy.users.length; i++) {
        if (dummy.users[i].email === email) {
          const { firstname } = dummy.users[i];
          const { lastname } = dummy.users[i];
          // eslint-disable-next-line no-shadow
          const { email } = dummy.users[i];
          const truePass = bcrypt.compareSync(password, dummy.users[i].password);
          if (truePass) {
            const token = jwt.sign({ user: dummy.users[i] }, "secret-key", { expiresIn: "1h" });
            res.status(200).json({
              status: 200,
              success: "logged in",
              data: [{
                token, firstname, lastname, email,
              }],
            });
          } else {
            res.status(400).json({ status: 400, error: "incorrect password" });
          }
          return;
        }
      }
      res.status(400).json({ status: 400, message: "invalid email" });
    }
  },
};

export default users;
