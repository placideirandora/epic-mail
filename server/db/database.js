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
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_EMAIL,
    hash,
    process.env.IS_ADMIN,
    moment().format('LL'),
  ];

  const user = `CREATE TABLE IF NOT EXISTS
users(
    id SERIAL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR(200),
    isAdmin BOOLEAN NOT NULL default FALSE,
    registered DATE
);`;

  const draftemail = `CREATE TABLE IF NOT EXISTS
draftemails(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    parentmessageid INTEGER NOT NULL,
    senderemail VARCHAR(60) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    receiveremail VARCHAR(60) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL,
    createdon DATE
);`;

  const sentemail = `CREATE TABLE IF NOT EXISTS
sentemails(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    parentmessageid INTEGER NOT NULL,
    senderemail VARCHAR(60) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    receiveremail VARCHAR(60) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL,
    createdon DATE
);`;

  const recievedemail = `CREATE TABLE IF NOT EXISTS
receivedemails(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    parentmessageid INTEGER NOT NULL,
    senderemail VARCHAR(60) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    receiveremail VARCHAR(60) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL,
    createdon DATE
);`;

  const group = `CREATE TABLE IF NOT EXISTS
groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    role VARCHAR(100) NOT NULL,
    owner VARCHAR(60) NOT NULL REFERENCES users(email) ON DELETE CASCADE
);`;

  const groupmember = `CREATE TABLE IF NOT EXISTS
groupmembers(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(60) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  groupid INTEGER REFERENCES groups(id) ON DELETE CASCADE
);`;

  const groupmail = `CREATE TABLE IF NOT EXISTS
groupmessages(
  id SERIAL PRIMARY KEY,
  subject VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  parentmessageid INTEGER NOT NULL,
  createdon DATE,
  groupid INTEGER REFERENCES groups(id) ON DELETE CASCADE
);`;

  const connection = await connect();
  await connection.query(user);
  await connection.query(draftemail);
  await connection.query(sentemail);
  await connection.query(recievedemail);
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
