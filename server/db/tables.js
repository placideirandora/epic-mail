export const users = `CREATE TABLE IF NOT EXISTS
users(
    id SERIAL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
    password VARCHAR(400),
    isActive BOOLEAN NOT NULL default TRUE,
    isAdmin BOOLEAN NOT NULL default FALSE,
    createdAt timestamp  default CURRENT_TIMESTAMP
);`;

export const draftEmails = `CREATE TABLE IF NOT EXISTS
draftEmails(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    senderEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    receiverEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    createdAt timestamp  default CURRENT_TIMESTAMP
);`;

export const sentEmails = `CREATE TABLE IF NOT EXISTS
sentEmails(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    senderEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    receiverEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    createdAt timestamp default CURRENT_TIMESTAMP
);`;

export const receivedEmails = `CREATE TABLE IF NOT EXISTS
receivedEmails(
    id SERIAL PRIMARY KEY,
    subject VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    senderEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    receiverEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    createdAt timestamp  default CURRENT_TIMESTAMP
);`;

export const groups = `CREATE TABLE IF NOT EXISTS
groups(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    purpose VARCHAR(100) NOT NULL,
    owner VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
    createdAt timestamp default CURRENT_TIMESTAMP
);`;

export const groupMembers = `CREATE TABLE IF NOT EXISTS
groupMembers(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  groupId INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  createdAt timestamp default CURRENT_TIMESTAMP
);`;

export const groupMessages = `CREATE TABLE IF NOT EXISTS
groupMessages(
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  groupId INTEGER REFERENCES groups(id) ON DELETE CASCADE,
  createdAt timestamp default CURRENT_TIMESTAMP
);`;
