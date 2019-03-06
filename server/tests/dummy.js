const newUser = {
  firstname: "Emmanuel",
  lastname: "CYUBAHIRO",
  email: "emmanuelcyubahiro@gmail.com",
  password: "1234",
};

const falseNewUser = {
  firstname: "Emmanuel",
  lastname: "CYUBAHIRO",
  email: "emmanuelcyubahirogmail.com",
  password: "1234",
};

const falseNewUser2 = {
  firstname: "",
  lastname: "CYUBAHIRO",
  email: "emmanuelcyubahirogmail.com",
  password: "1234",
};

const newUserLogIn = {
  email: newUser.email,
  password: newUser.password,
};

const falseUserLogIn = {
  email: "",
  password: newUser.password,
};

const falseEmailLogIn = {
  email: "test@gmail.com",
  password: newUser.password,
};

const falsePasswdLogIn = {
  email: newUser.email,
  password: "123",
};

const sentMessage = {
  subject: "Testing",
  message: "Have you passed!",
  senderId: 1,
  receiverId: 2,
  parentMessageId: 4,
  status: "sent",
};

const readMessage = {
  subject: "Testing",
  message: "Have you passed!",
  senderId: 2,
  receiverId: 1,
  parentMessageId: 5,
  status: "read",
};

const draftMessage = {
  subject: "Testing",
  message: "Have you passed!",
  senderId: 3,
  receiverId: 1,
  parentMessageId: 6,
  status: "draft",
};

export {
  newUser, newUserLogIn, sentMessage, readMessage, draftMessage, falseEmailLogIn,
  falsePasswdLogIn, falseNewUser, falseNewUser2, falseUserLogIn,
};
