/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-shadow */
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

import sql from '../helpers/sql';
import databaseClient from '../db';

dotenv.config();

class UserController {
  static async registerUser(req, res) {
    const { firstname, lastname, username, password } = req.body;
    const firstnameArr = Array.from(firstname);
    const lastnameArr = Array.from(lastname);
    const usernameArr = Array.from(username);
    if (!isNaN(firstnameArr[0])) {
      res
        .status(400)
        .json({ message: 'firstname must not start with a number' });
    } else if (!isNaN(lastnameArr[0])) {
      res
        .status(400)
        .json({ message: 'lastname must not start with a number' });
    } else if (!isNaN(usernameArr[0])) {
      res
        .status(400)
        .json({ message: 'username must not start with a number' });
    } else {
      const responseOne = await databaseClient.query(sql.findUsername, [username]);
      if (responseOne.length !== 0) {
        res.status(400).json({
          message:
            'the username is already taken. register with a unique username'
        });
      } else {
        const email = `${username}@epicmail.com`;
        const user = new User(firstname, lastname, username, email, password);
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;
        const responseTwo = await databaseClient.query(sql.registerUser, [
          user.firstname,
          user.lastname,
          user.username,
          user.email,
          user.password
        ]);
        jwt.sign(
          { response: responseTwo[0] },
          process.env.SECRET_KEY,
          (err, token) => {
            const {
              id,
              firstname,
              lastname,
              username,
              email,
              isadmin,
              registered
            } = responseTwo[0];
            res.status(201).json({
              message: 'User registered',
              data: [
                {
                  token,
                  user: {
                    id,
                    firstname,
                    lastname,
                    username,
                    email,
                    isadmin,
                    registered
                  }
                }
              ]
            });
          }
        );
      }
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const responseOne = await databaseClient.query(sql.loginUser, [email]);
      if (responseOne.length === 0 || responseOne.length === 'undefined') {
        res.status(401).json({ message: 'Incorrect email or password' });
      } else if (responseOne[0].password === null) {
        res.status(401).json({
          message:
            'You have recently reset your password. Check your email for the password reset link'
        });
      } else {
        const truePass = bcrypt.compareSync(password, responseOne[0].password);
        if (truePass) {
          jwt.sign(
            { response: responseOne[0] },
            process.env.SECRET_KEY,
            { expiresIn: '3h' },
            (err, token) => {
              const {
                id,
                firstname,
                lastname,
                username,
                email,
                isadmin,
                registered
              } = responseOne[0];
              res.status(200).json({
                message: 'Logged in',
                token,
                data: [
                  {
                    id,
                    firstname,
                    lastname,
                    username,
                    email,
                    isadmin,
                    registered
                  }
                ]
              });
            }
          );
        } else {
          res.status(401).json({
            message: 'Incorrect email or password'
          });
        }
      }
    } catch (error) {
      const message = 'Something went wrong while attempting to log you in';
      res.status(500).json({
        message
      });
    }
  }

  static async retrieveUsers(req, res) {
    const allUsers = await databaseClient.query(sql.retrieveAllUsers);
    const responseOne = await allUsers;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res.status(404).json({ status: 404, error: 'no users found' });
    } else {
      res
        .status(200)
        .json({ status: 200, success: 'users retrieved', data: responseOne });
    }
  }

  static async retrieveUser(req, res) {
    const userId = req.params.id;
    const specificUser = await databaseClient.query(sql.retrieveSpecificUserById, [
      userId
    ]);
    const responseOne = await specificUser;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res
        .status(404)
        .json({ status: 404, error: 'user with the specified id, not found' });
    } else {
      const {
        id,
        firstname,
        lastname,
        email,
        isadmin,
        registered
      } = responseOne[0];
      res.status(200).json({
        status: 200,
        success: 'user retrieved',
        data: [
          {
            id,
            firstname,
            lastname,
            email,
            isadmin,
            registered
          }
        ]
      });
    }
  }

  static async deleteUser(req, res) {
    const userId = req.params.id;
    const findUser = await databaseClient.query(sql.retrieveSpecificUserById, [
      userId
    ]);
    const responseOne = findUser;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res
        .status(404)
        .json({ status: 404, error: 'user with the specified id, not found' });
    } else {
      const deleteUser = await databaseClient.query(sql.deleteSpecificUser, [userId]);
      const responseTwo = await deleteUser;
      if (responseTwo) {
        res.status(200).json({ status: 200, success: 'user deleted' });
      }
    }
  }

  static async resetPassword(req, res) {
    const { email } = req.body;
    const findUserEmail = await databaseClient.query(sql.findUserEmail, [email]);
    const responseOne = await findUserEmail;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res.status(404).json({ status: 404, error: 'incorrect email' });
    } else {
      const checkPassReset = await databaseClient.query(sql.passResetCheck, [email]);
      const responseTwo = await checkPassReset;
      if (responseTwo.length !== 0) {
        res.status(400).json({
          status: 400,
          error:
            'you have already reset the password. check the password reset link instead'
        });
      } else {
        const deleteUserPassword = await databaseClient.query(
          sql.deleteSpecificUserPassword,
          [email]
        );
        const responseThree = await deleteUserPassword;
        if (responseThree) {
          res.status(200).json({
            status: 200,
            data: [
              {
                message: 'check your email for a password reset link',
                email
              }
            ]
          });
        }
      }
    }
  }

  static async retrievePassResetUsers(req, res) {
    const passResetUsers = await databaseClient.query(sql.retrievePassResetUsers);
    const responseOne = await passResetUsers;
    if (responseOne.length === 0 || responseOne.length === 'undefined') {
      res.status(404).json({
        status: 404,
        error: 'admin, there are no users who reset their passwords'
      });
    } else {
      res.status(200).json({
        status: 200,
        success: 'admin, the users who reset their passwords are retrieved',
        data: responseOne
      });
    }
  }
}

export default UserController;
