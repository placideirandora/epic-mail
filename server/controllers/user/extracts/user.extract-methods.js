import sql from '../../../db/queries';
import User from '../../../models/user';
import databaseClient from '../../../db';
import AuthHelper from '../../../helpers/auth.helper';

export const findUserByUsername = async (username) => {
  const user = await databaseClient.query(sql.findUsername, [username]);

  return user;
};

export const findUserByEmail = async (email) => {
  const user = await databaseClient.query(sql.loginUser, [email]);

  return user;
};

export const saveUser = async (res, payload) => {
  const { firstname, lastname, username, password } = payload;

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

  return res.status(201).json({
    message: 'User registered',
    data: {
      token,
      user: registeredUser[0],
    },
  });
};
