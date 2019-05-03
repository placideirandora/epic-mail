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

const newUser4 = {
  firstname: 'Emmanuel4',
  lastname: 'CYUBAHIRO4',
  username: 'emmanuelcyubahiro4',
  password: '123456',
};

const newUser5 = {
  firstname: 'Emmanuel5',
  lastname: 'CYUBAHIRO5',
  username: 'emmanuelcyubahiro5',
  password: '123456',
};

const newUser6 = {
  firstname: 'Emmanuel6',
  lastname: 'CYUBAHIRO6',
  username: 'emmanuelcyubahiro6',
  password: '123456',
};

const newUser7 = {
  firstname: 'Emmanuel7',
  lastname: 'CYUBAHIRO7',
  username: 'emmanuelcyubahiro7',
  password: '123456',
};

const newUser8 = {
  firstname: 'Emmanuel8',
  lastname: 'CYUBAHIRO8',
  username: 'emmanuelcyubahiro8',
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

const newUserLogIn4 = {
  email: 'emmanuelcyubahiro4@epicmail.com',
  password: newUser4.password,
};

const newUserLogIn5 = {
  email: 'emmanuelcyubahiro5@epicmail.com',
  password: newUser5.password,
};

const newUserLogIn6 = {
  email: 'emmanuelcyubahiro6@epicmail.com',
  password: newUser6.password,
};

const newUserLogIn7 = {
  email: 'emmanuelcyubahiro7@epicmail.com',
  password: newUser7.password,
};

const newUserLogIn8 = {
  email: 'emmanuelcyubahiro8@epicmail.com',
  password: newUser8.password,
};

const message = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 1,
  receiverEmail: 'emmanuelcyubahiro5@epicmail.com',
  status: 'sent',
};

const message2 = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverEmail: 'emmanuelcyubahiro4@epicmail.com',
  status: 'sent',
};

const message3 = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverEmail: 'emmanuelcyubahiro44@epicmail.com',
  status: 'sent',
};

const message4 = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverEmail: 'emmanuelcyubahiro5@epicmail.com',
  status: 'sent',
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
  receiverEmail: 'emmanuelcyubahiro5@epicmail.com',
  status: 'draft',
};

const draftEmail2 = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 2,
  receiverEmail: 'emmanuelcyubahiro4@epicmail.com',
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
  username: 'testing',
  email: 'emmanuelcyubahiro6@epicmail.com',
};

const newGroupMember2 = {
  username: 'testing',
  email: 'emmanuelcyubahiro10@epicmail.com',
};

const newGroupMember3 = {
  username: 'test',
  email: 'emmanuelcyubahiro6@epicmail.com',
};

const groupMessage = {
  subject: 'test',
  message: 'test mic check mic check',
  parentMessageId: 1,
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
  message3,
  message4,
  sentEmail,
  readEmail,
  draftEmail,
  draftEmail2,
  unreadEmail,
  unreadEmail2,
  readEmail2,
  falseFirstNameNewUser,
  falseLastNameNewUser,
  falseUserNameNewUser,
  newUser4,
  newUser5,
  newUser6,
  newUser7,
  newUser8,
  newUserLogIn4,
  newUserLogIn5,
  newUserLogIn6,
  newUserLogIn7,
  newUserLogIn8,
  newGroup,
  newGroup2,
  newGroup3,
  newGroupName,
  newGroupName2,
  newGroupMember,
  newGroupMember2,
  newGroupMember3,
  groupMessage,
};
