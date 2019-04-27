import dotenv from 'dotenv';

dotenv.config();

const newUser = {
  firstname: 'Emmanuel',
  lastname: 'CYUBAHIRO',
  username: 'emmanuelcyubahiro',
  password: '123456',
};


const newUser2 = {
  firstname: 'Emmanuel2',
  lastname: 'CYUBAHIRO2',
  username: 'emmanuelcyubahiro2',
  password: '123456',
};

const falseFirstNameNewUser = {
  firstname: '1Emmanuel4',
  lastname: 'CYUBAHIRO4',
  username: 'emmanuelcyubahiro4',
  password: '123456',
};

const falseLastNameNewUser = {
  firstname: 'Emmanuel4',
  lastname: '1CYUBAHIRO4',
  username: 'emmanuelcyubahiro4',
  password: '123456',
};

const falseUserNameNewUser = {
  firstname: 'Emmanuel4',
  lastname: 'CYUBAHIRO4',
  username: '1emmanuelcyubahiro4',
  password: '123456',
};

const newUser5 = {
  firstname: 'Emmanuel5',
  lastname: 'CYUBAHIRO5',
  email: 'emmanuelcyubahiro5@gmail.com',
  password: '123456',
};

const newUser6 = {
  firstname: 'Emmanuel6',
  lastname: 'CYUBAHIRO6',
  email: 'emmanuelcyubahiro6@gmail.com',
  password: '123456',
};

const newUser7 = {
  firstname: 'Emmanuel7',
  lastname: 'CYUBAHIRO7',
  email: 'emmanuelcyubahiro7@gmail.com',
  password: '123456',
};

const newUserNameTaken = {
  firstname: 'Emmanuel',
  lastname: 'CYUBAHIRO',
  email: 'emmanuelcyuba@gmail.com',
  password: '123456',
};

const newUserEmailTaken = {
  firstname: 'Emmanuel',
  lastname: 'CYUBAHIRO2',
  username: 'emmanuelcyubahiro2',
  password: '123456',
};

const passReset = {
  email: 'emmanuelcyubahiro2@epicmail.com',
};

const falsePassReset = {
  email: 'emmanuel@epicmail.com',
};

const admin = {
  email: 'placideirandora@epicmail.com',
  password: process.env.ADMIN_PASSWORD,
};

const falseAdminPass = {
  email: 'placideirandora@epicmail.com',
  password: 'xxxxxxxxxxxxx',
};

const falseAdminEmail = {
  email: 'placide@gmail.com',
  password: 'xxxxxxxxxxxxx',
};

const newUserLogIn = {
  email: 'emmanuelcyubahiro@epicmail.com',
  password: newUser.password,
};

const newUserLogIn2 = {
  email: 'emmanuelcyubahiro2@epicmail.com',
  password: newUser2.password,
};

const newUserLogIn5 = {
  email: newUser5.email,
  password: newUser5.password,
};

const newUserLogIn6 = {
  email: newUser6.email,
  password: newUser6.password,
};

const newUserLogIn7 = {
  email: newUser7.email,
  password: newUser7.password,
};

const message = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 1,
  receiverId: 1,
  status: 'sent',
};

const message2 = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverId: 1,
  status: 'read',
};

const sentEmail = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverId: 1,
  status: 'sent',
};

const readEmail = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverId: 1,
  status: 'read',
};

const draftEmail = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverId: 1,
  status: 'draft',
};

const unreadEmail = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverId: 1,
  status: 'unread',
};

const unreadEmail2 = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverId: 4,
  status: 'unread',
};

const readEmail2 = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverId: 2,
  status: 'read',
};

const newGroup = {
  name: 'testOne',
  role: 'testing',
};

const newGroup2 = {
  name: 'testTwo',
  role: 'testing',
};

const newGroup3 = {
  name: 'testThree',
  role: 'testing',
};

const newGroupName = {
  name: 'testOneChanged',
};

const newGroupName2 = {
  name: 'testOneChangedAgain',
};

const newGroupMember = {
  firstname: 'someone',
  lastname: 'someoni',
  role: 'testing',
};

const groupMessage = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 1,
  status: 'sent',
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
  message,
  message2,
  sentEmail,
  readEmail,
  draftEmail,
  unreadEmail,
  unreadEmail2,
  readEmail2,
  falseFirstNameNewUser,
  falseLastNameNewUser,
  falseUserNameNewUser,
  newUser5,
  newUser6,
  newUser7,
  newUserLogIn5,
  newUserLogIn6,
  newUserLogIn7,
  newGroup,
  newGroup2,
  newGroup3,
  newGroupName,
  newGroupName2,
  newGroupMember,
  groupMessage,
};
