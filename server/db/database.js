/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import sql from '../helpers/sql';

dotenv.config();

let newPool;
if (process.env.DATABASE_URL) {
  const connectionString = process.env.DATABASE_URL;
  newPool = new Pool({
    connectionString,
  });
} else if (process.env.NODE_ENV === 'test') {
  newPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME_TEST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
  });
} else {
  newPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
  });
}

const connect = async () => await newPool.connect();

const tables = async () => {
  const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
  const admin = [
    process.env.ADMIN_FIRSTNAME,
    process.env.ADMIN_LASTNAME,
    process.env.ADMIN_EMAIL,
    hash,
    process.env.IS_ADMIN,
    moment().format('LL'),
  ];

  const user = `CREATE TABLE IF NOT EXISTS
users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(200),
    isAdmin BOOLEAN NOT NULL default FALSE,
    registered DATE
);`;

  const email = `CREATE TABLE IF NOT EXISTS
messages(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    parentmessageid INTEGER NOT NULL,
    senderid INTEGER REFERENCES users(id) ON DELETE CASCADE,
    receiverid INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL,
    createdon DATE
);`;

  const group = `CREATE TABLE IF NOT EXISTS
groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    role VARCHAR(100) NOT NULL,
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE
);`;

  const groupmember = `CREATE TABLE IF NOT EXISTS
groupmembers(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(20),
  lastname VARCHAR(20),
  role VARCHAR(100) NOT NULL,
  groupid INTEGER REFERENCES groups(id) ON DELETE CASCADE
);`;

  const groupmail = `CREATE TABLE IF NOT EXISTS
groupmessages(
  id SERIAL PRIMARY KEY,
  subject VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  parentmessageid INTEGER NOT NULL,
  status VARCHAR(10) NOT NULL,
  createdon DATE,
  groupid INTEGER REFERENCES groups(id) ON DELETE CASCADE
);`;

  const connection = await connect();
  await connection.query(user);
  await connection.query(email);
  await connection.query(group);
  await connection.query(groupmember);
  await connection.query(groupmail);
  await connection.query(sql.admin, admin);
};


tables();

if (tables) {
  console.log('\n Database Tables Exist! \n');
}

const database = async (sqli, data = []) => {
  const connection = await connect();
  try {
    const result = await connection.query(sqli, data);
    return result.rows;
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.release();
  }
};

export default database;
export { tables };
