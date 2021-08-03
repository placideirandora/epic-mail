import sql from '../db/queries';
import User from '../models/user';
import databaseClient from '../db';
import AuthHelper from '../helpers/auth.helper';

class UserController {
  static async registerUser(req, res) {
    const { firstname, lastname, username, password } = req.body;

    const firstnameArr = Array.from(firstname);
    const lastnameArr = Array.from(lastname);
    const usernameArr = Array.from(username);

    if (!isNaN(firstnameArr[0])) {
      return res
        .status(400)
        .json({ message: 'Firstname must not start with a number' });
    }

    if (!isNaN(lastnameArr[0])) {
      return res
        .status(400)
        .json({ message: 'Lastname must not start with a number' });
    }

    if (!isNaN(usernameArr[0])) {
      return res
        .status(400)
        .json({ message: 'Username must not start with a number' });
    }

    const usernameTaken = await databaseClient.query(sql.findUsername, [
      username,
    ]);

    if (usernameTaken.length) {
      return res.status(400).json({
        message:
          'The username is already taken. Register with a unique username',
      });
    }

    const email = `${username}@epicmail.com`;
    const user = new User(firstname, lastname, username, email, password);
    user.password = AuthHelper.hashPassword(user.password);

    const registeredUser = await databaseClient.query(sql.registerUser, [
      user.firstname,
      user.lastname,
      user.username,
      user.email,
      user.password,
    ]);

    delete registeredUser[0].password;

    const token = AuthHelper.generateToken(registeredUser[0]);

    res.status(201).json({
      message: 'User registered',
      data: {
        token,
        user: registeredUser[0],
      },
    });
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await databaseClient.query(sql.loginUser, [email]);

      if (!user.length) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      if (!user[0].password) {
        return res.status(401).json({
          message:
            'You have recently reset your password. Check your email for the password reset link',
        });
      }

      const correctPassword = AuthHelper.compareHashedPasswords(
        password,
        user[0].password
      );

      if (correctPassword) {
        delete user[0].password;

        const token = AuthHelper.generateToken(user[0]);

        return res.status(200).json({
          message: 'Logged in',
          data: {
            token,
            user: user[0],
          },
        });
      }

      res.status(401).json({
        message: 'Incorrect email or password',
      });
    } catch (error) {
      const message = 'Something went wrong while attempting to log you in';

      res.status(500).json({
        message,
      });
    }
  }

  static async retrieveUsers(req, res) {
    const users = await databaseClient.query(sql.retrieveAllUsers);

    if (!users.length) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ message: 'Users retrieved', data: users });
  }

  static async retrieveUser(req, res) {
    const userId = req.params.id;

    const user = await databaseClient.query(sql.retrieveSpecificUserById, [
      userId,
    ]);

    if (!user.length) {
      return res
        .status(404)
        .json({ message: 'User with the specified ID could not be found' });
    }

    delete user[0].password;

    res.status(200).json({
      message: 'User retrieved',
      data: user[0],
    });
  }

  static async deleteUser(req, res) {
    const userId = req.params.id;

    const user = await databaseClient.query(sql.retrieveSpecificUserById, [
      userId,
    ]);

    if (!user.length) {
      return res
        .status(404)
        .json({ message: 'User with the specified ID could not be found' });
    }

    await databaseClient.query(sql.deleteSpecificUser, [userId]);

    res.status(200).json({ message: 'User deleted' });
  }

  static async resetPassword(req, res) {
    const { email } = req.body;

    const user = await databaseClient.query(sql.findUserEmail, [email]);

    if (!user.length) {
      return res.status(404).json({ message: 'Incorrect email' });
    }

    const passwordReset = await databaseClient.query(sql.passResetCheck, [
      email,
    ]);

    if (passwordReset.length) {
      return res.status(403).json({
        message:
          'You have already reset the password. Check your email for a password reset link we sent you',
      });
    }

    await databaseClient.query(sql.deleteSpecificUserPassword, [email]);

    res.status(200).json({
      message: 'Check your email for a password reset link',
    });
  }

  static async retrievePasswordResetUsers(req, res) {
    const users = await databaseClient.query(sql.retrievePassResetUsers);

    if (!users.length) {
      return res.status(404).json({
        message:
          'Admin, there are currently no users who reset their passwords',
      });
    }

    res.status(200).json({
      message: 'Admin, users who reset their passwords retrieved',
      data: users,
    });
  }
}

export default UserController;
