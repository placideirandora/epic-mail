import bcrypt from "bcryptjs";

const users = [
  {
    id: 1,
    firstname: "Placide",
    lastname: "IRANDORA",
    email: "placideirandora@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    id: 2,
    firstname: "Innocent",
    lastname: "TUYISHIMIRE",
    email: "innocenttuyishimire@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    id: 3,
    firstname: "Fred",
    lastname: "MANZI",
    email: "fredmanzi@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

const messages = [
  {
    id: 1,
    createdOn: "February 20, 2019",
    subject: "Hello",
    message: "How have you been?",
    parentMessageId: 1,
    status: "sent",
  },
  {
    id: 2,
    createdOn: "February 24, 2019",
    subject: "Hi",
    message: "Have a good time!",
    parentMessageId: 2,
    status: "draft",
  },
  {
    id: 3,
    createdOn: "February 28",
    subject: "Greetings",
    message: "You are invited to the party",
    parentMessageId: 3,
    status: "read",
  },
];

export default
{
  users, messages,
};
