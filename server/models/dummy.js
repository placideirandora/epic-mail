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

export default
{
  users,
};
