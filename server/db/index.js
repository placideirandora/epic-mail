import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import {
  users,
  groups,
  sentEmails,
  draftEmails,
  groupMembers,
  groupMessages,
  receivedEmails,
} from './tables';
import sql from './queries';

class Database {
  constructor() {
    dotenv.config();

    if (process.env.NODE_ENV === 'development') {
      this.pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
      });
    }

    if (process.env.NODE_ENV === 'test') {
      this.pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME_TEST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
      });
    }

    if (process.env.NODE_ENV === 'production') {
      const connectionString = process.env.DATABASE_URL;
      this.pool = new Pool({
        connectionString,
      });
    }
  }

  async migrateTables() {
    try {
      const client = await this.pool.connect();
      const passwordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
      const admin = [
        process.env.ADMIN_FIRSTNAME,
        process.env.ADMIN_LASTNAME,
        process.env.ADMIN_USERNAME,
        process.env.ADMIN_EMAIL,
        passwordHash,
        true,
        process.env.IS_ADMIN,
      ];

      await client.query(users);
      await client.query(sentEmails);
      await client.query(draftEmails);
      await client.query(receivedEmails);
      await client.query(groups);
      await client.query(groupMembers);
      await client.query(groupMessages);
      // SEED THE ADMIN
      await client.query(sql.seedAdmin, admin);
    } catch (error) {
      console.log(
        'Something went wrong while attempting to migrate the tables',
        error
      );
    }
  }

  async query(sqlQuery, data = []) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sqlQuery, data);
      return result.rows;
    } catch (error) {
      console.log('Something went wrong while executing the SQL query', error);
      return null;
    } finally {
      client.release();
    }
  }
}

export default new Database();
