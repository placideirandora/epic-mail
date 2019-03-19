/* eslint-disable max-len */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment";
import User from "../models/user";
import database from "../db/database";
import sql from "../helpers/sql";

dotenv.config();

const users = {
  registerUser(req, res) {
    const {
      firstname, lastname, email, password,
    } = req.body;
    const findUser = database(sql.findUser, [firstname, lastname]);
    findUser.then((response) => {
      if (response.length !== 0) {
        res.status(400).json({ status: 400, error: "user with the specified name is already registered" });
      } else {
        const findUserEmail = database(sql.findUserEmail, [email]);
        findUserEmail.then((response) => {
          if (response.length !== 0) {
            res.status(400).json({ status: 400, error: "the email is already taken. register with a unique email" });
          } else {
            const user = new User(firstname, lastname, email, password);
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            const query = database(sql.registerUser, [user.firstname, user.lastname, user.email, user.password, moment().format("LL")]);
            query.then((response) => {
              jwt.sign({ response: response[0] }, process.env.SECRET_KEY, (err, token) => {
                const {
                  id, firstname, lastname, email, isadmin, registered,
                } = response[0];
                res.status(201).json({
                  status: 201,
                  success: "user registered",
                  data: [{
                    token,
                    user: {
                      id, firstname, lastname, email, isadmin, registered,
                    },
                  }],
                });
              });
            }).catch((error) => {
              res.status(500).json({ status: 500, error: "registration failed", error });
            });
          }
        }).catch((error) => {
          res.status(500).json({ status: 500, error: "registration failed", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ status: 500, error: "registration failed", error });
    });
  },

  loginUser(req, res) {
    const {
      email, password,
    } = req.body;
    const query = database(sql.loginUser, [email]);
    query.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ error: "invalid email" });
      } else if (response[0].password === null) {
        res.status(404).json({
          status: 404,
          error: "sorry! you have recently reset your password. "
            + "check your email for the password reset link",
        });
      } else {
        const truePass = bcrypt.compareSync(password, response[0].password);
        if (truePass) {
          jwt.sign({ response: response[0] }, process.env.SECRET_KEY, { expiresIn: "3h" }, (err, token) => {
            const {
              id, firstname, lastname, email, isadmin, registered,
            } = response[0];
            res.status(200).json({
              status: 200,
              success: "logged in",
              data: [{
                token,
                data: {
                  id, firstname, lastname, email, isadmin, registered,
                },
              }],
            });
          });
        } else {
          res.status(400).json({
            status: 400,
            error: "incorrect password",
          });
        }
      }
    }).catch((error) => {
      res.status(500).json(error);
    });
  },

  retrieveUsers(req, res) {
    const allUsers = database(sql.retrieveAllUsers);
    allUsers.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ status: 404, error: "no users found" });
      } else {
        res.status(200).json({ status: 200, success: "users retrieved", data: response });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  retrieveUser(req, res) {
    const userId = req.params.id;
    const specificUser = database(sql.retrieveSpecificUser, [userId]);
    specificUser.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ status: 404, error: "user with the specified id, not found" });
      } else {
        const {
          id, firstname, lastname, email, isadmin, registered,
        } = response[0];
        res.status(200).json({
          status: 200,
          success: "user retrieved",
          data: [{
            id, firstname, lastname, email, isadmin, registered,
          }],
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  deleteUser(req, res) {
    const userId = req.params.id;
    const findUser = database(sql.retrieveSpecificUser, [userId]);
    findUser.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ status: 404, error: "user with the specified id, not found" });
      } else {
        const deleteUser = database(sql.deleteSpecificUser, [userId]);
        deleteUser.then((response) => {
          if (response) {
            res.status(200).json({ status: 200, success: "user deleted" });
          } else {
            res.status(400).json({ status: 400, error: "user not deleted" });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },

  resetPassword(req, res) {
    const {
      email,
    } = req.body;
    const findUserEmail = database(sql.findUserEmail, [email]);
    findUserEmail.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({ status: 404, error: "invalid email" });
      } else {
        const deleteUserPassword = database(sql.deleteSpecificUserPassword, [email]);
        deleteUserPassword.then((response) => {
          if (response) {
            res.status(200).json({
              status: 200,
              data: [{
                message: "check your email for a password reset link",
                email,
              }],
            });
          } else {
            res.status(400).json({ status: 400, error: "password reset failed" });
          }
        }).catch((error) => {
          res.status(500).json({ error: "error occured", error });
        });
      }
    }).catch((error) => {
      res.status(500).json({ status: 500, error: "password reset failed", error });
    });
  },

  retrievePassResetUsers(req, res) {
    const passResetUsers = database(sql.retrievePassResetUsers);
    passResetUsers.then((response) => {
      if (response.length === 0 || response.length === "undefined") {
        res.status(404).json({
          status: 404,
          error: "admin, there are no users who reset their passwords",
        });
      } else {
        res.status(200).json({
          status: 200,
          success: "admin, the users who reset their passwords are retrieved",
          data: response,
        });
      }
    }).catch((error) => {
      res.status(500).json({ error: "error occured", error });
    });
  },
};

export default users;
