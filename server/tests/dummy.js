import dotenv from 'dotenv';

dotenv.config();

const newUser = {
  firstname: "Emmanuel",
  lastname: "CYUBAHIRO",
  email: "emmanuelcyubahiro@gmail.com",
  password: "123456",
};


const newUser2 = {
  firstname: "Emmanuel2",
  lastname: "CYUBAHIRO2",
  email: "emmanuelcyubahiro2@gmail.com",
  password: "123456",
};

const newUserNameTaken = {
  firstname: "Emmanuel",
  lastname: "CYUBAHIRO",
  email: "emmanuelcyuba@gmail.com",
  password: "123456",
};

const newUserEmailTaken = {
  firstname: "Emmanuel",
  lastname: "CYUBAHIRO2",
  email: "emmanuelcyubahiro2@gmail.com",
  password: "123456",
};

const passReset = {
  email: newUser2.email,
};

const falsePassReset = {
  email: "emmanuel@gmail.com",
};

const admin = {
  email: "placideirandora@gmail.com",
  password: process.env.ADMIN_PASSWORD,
};

const falseAdminPass = {
  email: "placideirandora@gmail.com",
  password: "xxxxxxxxxxxxx",
};

const falseAdminEmail = {
  email: "placide@gmail.com",
  password: "xxxxxxxxxxxxx",
};

const newUserLogIn = {
  email: newUser.email,
  password: newUser.password,
};

const newUserLogIn2 = {
  email: newUser2.email,
  password: newUser2.password,
};


export {
  newUser,
  newUser2,
  newUserLogIn,
  newUserLogIn2,
  newUserEmailTaken,
  newUserNameTaken,
  admin,
  passReset,
  falsePassReset,
  falseAdminPass,
  falseAdminEmail,
};
