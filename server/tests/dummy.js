import dotenv from 'dotenv';

dotenv.config();

const newUser = {
  firstname: 'john',
  lastname: 'davinchi',
  username: 'johndavinchi',
  password: '123456',
};

const newUser2 = {
  firstname: 'john2',
  lastname: 'davinchi2',
  username: 'johndavinchi2',
  password: '123456',
};

const falseFirstNameNewUser = {
  firstname: '1john4',
  lastname: 'davinchi4',
  username: 'johndavinchi4',
  password: '123456',
};

const falseLastNameNewUser = {
  firstname: 'john4',
  lastname: '1davinchi4',
  username: 'johndavinchi4',
  password: '123456',
};

const falseUserNameNewUser = {
  firstname: 'john4',
  lastname: 'davinchi4',
  username: '1johndavinchi4',
  password: '123456',
};

const newUser4 = {
  firstname: 'john4',
  lastname: 'davinchi4',
  username: 'johndavinchi4',
  password: '123456',
};

const newUser5 = {
  firstname: 'john5',
  lastname: 'davinchi5',
  username: 'johndavinchi5',
  password: '123456',
};

const newUser6 = {
  firstname: 'john6',
  lastname: 'davinchi6',
  username: 'johndavinchi6',
  password: '123456',
};

const newUser7 = {
  firstname: 'john7',
  lastname: 'davinchi7',
  username: 'johndavinchi7',
  password: '123456',
};

const newUser8 = {
  firstname: 'john8',
  lastname: 'davinchi8',
  username: 'johndavinchi8',
  password: '123456',
};

const newUserNameTaken = {
  firstname: 'john',
  lastname: 'davinchi',
  email: 'johncyuba@gmail.com',
  password: '123456',
};

const newUserEmailTaken = {
  firstname: 'john',
  lastname: 'davinchi2',
  username: 'johndavinchi2',
  password: '123456',
};

const passReset = {
  email: 'johndavinchi2@epicmail.com',
};

const falsePassReset = {
  email: 'john@epicmail.com',
};

const admin = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const falseAdminPass = {
  email: process.env.ADMIN_EMAIL,
  password: 'xxxxxxxxxxxxx',
};

const falseAdminEmail = {
  email: 'placide@gmail.com',
  password: 'xxxxxxxxxxxxx',
};

const newUserLogIn = {
  email: 'johndavinchi@epicmail.com',
  password: newUser.password,
};

const newUserLogIn2 = {
  email: 'johndavinchi2@epicmail.com',
  password: newUser2.password,
};

const newUserLogIn4 = {
  email: 'johndavinchi4@epicmail.com',
  password: newUser4.password,
};

const newUserLogIn5 = {
  email: 'johndavinchi5@epicmail.com',
  password: newUser5.password,
};

const newUserLogIn6 = {
  email: 'johndavinchi6@epicmail.com',
  password: newUser6.password,
};

const newUserLogIn7 = {
  email: 'johndavinchi7@epicmail.com',
  password: newUser7.password,
};

const newUserLogIn8 = {
  email: 'johndavinchi8@epicmail.com',
  password: newUser8.password,
};

const message = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverEmail: 'johndavinchi5@epicmail.com',
  status: 'sent',
};

const message2 = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverEmail: 'johndavinchi4@epicmail.com',
  status: 'sent',
};

const message3 = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverEmail: 'johndavinchi44@epicmail.com',
  status: 'sent',
};

const message4 = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverEmail: 'johndavinchi5@epicmail.com',
  status: 'sent',
};

const sentEmail = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverId: 1,
  status: 'sent',
};

const readEmail = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverId: 1,
  status: 'read',
};

const draftEmail = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverEmail: 'johndavinchi5@epicmail.com',
  status: 'draft',
};

const draftEmail2 = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverEmail: 'johndavinchi4@epicmail.com',
  status: 'draft',
};

const unreadEmail = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverId: 1,
  status: 'unread',
};

const unreadEmail2 = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverId: 4,
  status: 'unread',
};

const readEmail2 = {
  subject: 'test',
  message: 'test mic check mic check',
  receiverId: 2,
  status: 'read',
};

const newGroup = {
  name: 'testOne',
  purpose: 'testing',
};

const newGroup2 = {
  name: 'testTwo',
  purpose: 'testing',
};

const newGroup3 = {
  name: 'testThree',
  purpose: 'testing',
};

const newGroupName = {
  name: 'testOneChanged',
};

const newGroupName2 = {
  name: 'testOneChangedAgain',
};

const newGroupMember = {
  username: 'testing',
  email: 'johndavinchi6@epicmail.com',
};

const newGroupMember2 = {
  username: 'testing',
  email: 'johndavinchi10@epicmail.com',
};

const newGroupMember3 = {
  username: 'test',
  email: 'johndavinchi6@epicmail.com',
};

const groupMessage = {
  message: 'test mic check mic check',
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
