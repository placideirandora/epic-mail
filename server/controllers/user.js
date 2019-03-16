import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import dummy from "../models/dummy";

const users = {
  /**
   * User Registration
   * @param {object} req
   * @param {object} res
   */
  registerUser(req, res) {
    const {
      firstname, lastname, email, password,
    } = req.body;
    const emaili = dummy.users.filter(user => user.email === email);
    if (emaili.length !== 0) {
      res.status(400).json({
        status: 400,
        error: "the email is already taken. the user already exist. register with another unique email",
      });
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

  /**
   * User Login
   * @param {object} req
   * @param {object} res
   */
  loginUser(req, res) {
    const {
      email, password,
    } = req.body;
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
    res.status(400).json({ status: 400, error: "invalid email" });
  },
};

export default users;
