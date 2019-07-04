/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import moment from 'moment';
import User from '../models/user';
import database from '../db/database';
import sql from '../helpers/sql';

dotenv.config();

const users = {
  /**
   * user registration endpoint
   * @param {object} req
   * @param {object} res
   */
  async registerUser(req, res) {
    const {
      firstname, lastname, username, password,
    } = req.body;
    const firstnameArr = Array.from(firstname);
    const lastnameArr = Array.from(lastname);
    const usernameArr = Array.from(username);
    if (!isNaN(firstnameArr[0])) {
      res.status(400).json({ status: 400, error: 'firstname must not start with a number' });
    } else if (!isNaN(lastnameArr[0])) {
      res.status(400).json({ status: 400, error: 'lastname must not start with a number' });
    } else if (!isNaN(usernameArr[0])) {
      res.status(400).json({ status: 400, error: 'username must not start with a number' });
    } else {
      const findUsername = database(sql.findUsername, [username]);
      const responseOne = await findUsername;
      if (responseOne.length !== 0) {
        res.status(400).json({ status: 400, error: 'the username is already taken. register with a unique username' });
      } else {
        const email = `${username}@epicmail.com`;
        const user = new User(firstname, lastname, username, email, password);
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        const query = database(sql.registerUser, [user.firstname, user.lastname, user.username, user.email, user.password, moment().format('LL')]);
        const responseTwo = await query;
        jwt.sign({ response: responseTwo[0] }, process.env.SECRET_KEY, (err, token) => {
          const {
            id, firstname, lastname, username, email, isadmin, registered,
          } = responseTwo[0];
          res.status(201).json({
            status: 201,
            success: 'user registered',
            data: [{
              token,
              user: {
                id, firstname, lastname, username, email, isadmin, registered,
              },
            }],
          });
        });
      }
    }
  },

  /**
   * user login endpoint
   * @param {object} req
   * @param {object} res
   */
  async loginUser(req, res) {
    const {
      email, password,
    } = req.body;
    const query = database(sql.loginUser, [email]);
    const responseOne = await query;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res.status(404).json({ status: 404, error: 'incorrect email or password' });
    } else if (responseOne[0].password === null) {
      res.status(404).json({
        status: 404,
        error: 'sorry! you have recently reset your password. '
            + 'check your email for the password reset link',
      });
    } else {
      const truePass = bcrypt.compareSync(password, responseOne[0].password);
      if (truePass) {
        jwt.sign({ response: responseOne[0] }, process.env.SECRET_KEY, { expiresIn: '3h' }, (err, token) => {
          const {
            id, firstname, lastname, username, email, isadmin, registered,
          } = responseOne[0];
          res.status(200).json({
            status: 200,
            success: 'logged in',
            token,
            data: [{
              id, firstname, lastname, username, email, isadmin, registered,
            }],
          });
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'incorrect email or password',
        });
      }
    }
  },

  /**
   * retrieve all registered users endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveUsers(req, res) {
    const allUsers = database(sql.retrieveAllUsers);
    const responseOne = await allUsers;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res.status(404).json({ status: 404, error: 'no users found' });
    } else {
      res.status(200).json({ status: 200, success: 'users retrieved', data: responseOne });
    }
  },

  /**
   * retrieve a single registered user endpoint
   * @param {object} req
   * @param {object} res
   */
  async retrieveUser(req, res) {
    const userId = req.params.id;
    const specificUser = database(sql.retrieveSpecificUserById, [userId]);
    const responseOne = await specificUser;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res.status(404).json({ status: 404, error: 'user with the specified id, not found' });
    } else {
      const {
        id, firstname, lastname, email, isadmin, registered,
      } = responseOne[0];
      res.status(200).json({
        status: 200,
        success: 'user retrieved',
        data: [{
          id, firstname, lastname, email, isadmin, registered,
        }],
      });
    }
  },

  /**
   * delete a single registered user endpoint
   * @param {object} req
   * @param {object} res
   */
  deleteUser(req, res) {
    const userId = req.params.id;
    const findUser = database(sql.retrieveSpecificUserById, [userId]);
    findUser.then((response) => {
      if (response.length === 0 || response.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'user with the specified id, not found' });
      } else {
        const deleteUser = database(sql.deleteSpecificUser, [userId]);
        deleteUser.then((response) => {
          if (response) {
            res.status(200).json({ status: 200, success: 'user deleted' });
          }
        });
      }
    });
  },

  /**
   * user password reset endpoint
   * @param {object} req
   * @param {object} res
   */
  resetPassword(req, res) {
    const {
      email,
    } = req.body;
    const findUserEmail = database(sql.findUserEmail, [email]);
    findUserEmail.then((response) => {
      if (response.length === 0 || response.length === 'undefined') {
        res.status(404).json({ status: 404, error: 'invalid email' });
      } else {
        const checkPassReset = database(sql.passResetCheck, [email]);
        checkPassReset.then((response) => {
          if (response.length !== 0) {
            res.status(400).json({ status: 400, error: 'you have already reset the password. check the password reset link instead' });
          } else {
            const deleteUserPassword = database(sql.deleteSpecificUserPassword, [email]);
            deleteUserPassword.then((response) => {
              if (response) {
                res.status(200).json({
                  status: 200,
                  data: [{
                    message: 'check your email for a password reset link',
                    email,
                  }],
                });
              }
            });
          }
        });
      }
    });
  },

  /**
   * retrieve users who reset their passwords endpoint
   * @param {object} req
   * @param {object} res
   */
  retrievePassResetUsers(req, res) {
    const passResetUsers = database(sql.retrievePassResetUsers);
    passResetUsers.then((response) => {
      if (response.length === 0 || response.length === 'undefined') {
        res.status(404).json({
          status: 404,
          error: 'admin, there are no users who reset their passwords',
        });
      } else {
        res.status(200).json({
          status: 200,
          success: 'admin, the users who reset their passwords are retrieved',
          data: response,
        });
      }
    });
  },
};

export default users;
