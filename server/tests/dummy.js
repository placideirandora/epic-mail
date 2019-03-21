import dotenv from 'dotenv';

dotenv.config();

const newUser = {
  firstname: 'Emmanuel',
  lastname: 'CYUBAHIRO',
  email: 'emmanuelcyubahiro@gmail.com',
  password: '123456',
};


const newUser2 = {
  firstname: 'Emmanuel2',
  lastname: 'CYUBAHIRO2',
  email: 'emmanuelcyubahiro2@gmail.com',
  password: '123456',
};

const newUser4 = {
  firstname: 'Emmanuel4',
  lastname: 'CYUBAHIRO4',
  email: 'emmanuelcyubahiro4@gmail.com',
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
  email: 'emmanuelcyubahiro2@gmail.com',
  password: '123456',
};

const passReset = {
  email: newUser2.email,
};

const falsePassReset = {
  email: 'emmanuel@gmail.com',
};

const admin = {
  email: 'placideirandora@gmail.com',
  password: process.env.ADMIN_PASSWORD,
};

const falseAdminPass = {
  email: 'placideirandora@gmail.com',
  password: 'xxxxxxxxxxxxx',
};

const falseAdminEmail = {
  email: 'placide@gmail.com',
  password: 'xxxxxxxxxxxxx',
};

const newUserLogIn = {
  email: newUser.email,
  password: newUser.password,
};

const newUserLogIn2 = {
  email: newUser2.email,
  password: newUser2.password,
};

const newUserLogIn4 = {
  email: newUser4.email,
  password: newUser4.password,
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
  newUser4,
  newUser5,
  newUser6,
  newUser7,
  newUserLogIn4,
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
