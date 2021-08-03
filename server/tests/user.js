import chai from 'chai';
import chaiHTTP from 'chai-http';
import { describe, it } from 'mocha';

import database from '../db';
import server from '../index';
import {
  newUser,
  newUser2,
  admin,
  newUserLogIn,
  passReset,
  falsePassReset,
  falseAdminPass,
  newUserLogIn2,
  falseAdminEmail,
  newUserEmailTaken,
  falseFirstNameNewUser,
  falseLastNameNewUser,
  falseUserNameNewUser,
} from './dummy';

chai.use(chaiHTTP);
chai.should();

describe('USER ENDPOINT TESTS', () => {
  let adminToken;

  it('Should register a new user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equals('User registered');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should register a second new user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equals('User registered');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should not register the third new user, because the username will have been already taken', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUserEmailTaken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equals(
            'The username is already taken. Register with a unique username'
          );
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not register the third new user, because the firstname starts with a number', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(falseFirstNameNewUser)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equals('Firstname must not start with a number');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not register the third new user, because the lastname starts with a number', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(falseLastNameNewUser)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equals('Lastname must not start with a number');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not register the third new user, because the username starts with a number', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(falseUserNameNewUser)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equals('Username must not start with a number');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should login the new user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('Logged in');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should login the admin', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(admin)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        adminToken = `Bearer ${res.body.data.token}`;

        res.should.have.status(200);
        res.body.should.have.property('message').equals('Logged in');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should not login the admin, because the email is incorrect', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(falseAdminEmail)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have
          .property('message')
          .equals('Incorrect email or password');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not login the admin, because the password is incorrect', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(falseAdminPass)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have
          .property('message')
          .equals('Incorrect email or password');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve registered users', (done) => {
    chai
      .request(server)
      .get('/api/v2/users')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equals('Users retrieved');
        res.body.data.should.be.a('array');
        res.body.should.have.property('data').equals(res.body.data);
        done();
      });
  });

  it('Should retrieve a specific user of id = 2', (done) => {
    chai
      .request(server)
      .get('/api/v2/users/2')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.should.have.property('message').equals('User retrieved');
        res.body.should.have.property('data').equals(res.body.data);
        done();
      });
  });

  it('Should not retrieve the user of id = 20, because they do not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/users/20')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('User with the specified ID could not be found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not reset a password of an incorrect email', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/reset')
      .send(falsePassReset)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('Incorrect email');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should reset a password of a specific user of id = 2', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/reset')
      .send(passReset)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').equals(res.body.message);
        done();
      });
  });

  it('Should retrieve users who reset their passwords', (done) => {
    chai
      .request(server)
      .get('/api/v2/auth/reset')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('Admin, users who reset their passwords retrieved');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not reset a password of a specific user of id = 2, because they have already reset the password', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/reset')
      .send(passReset)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have
          .property('message')
          .equals(
            'You have already reset the password. Check your email for a password reset link we sent you'
          );
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not login the second new user, because they will have reset their password', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have
          .property('message')
          .equals(
            'You have recently reset your password. Check your email for the password reset link'
          );
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific user of id = 2', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/2')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('User deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific user of id = 3', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/3')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('User deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific user of id = 4', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/4')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('User deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific user of id = 5', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/5')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('User deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific user of id = 6', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/6')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('User deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific user of id = 7', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/7')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('User deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific user of id = 8', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/8')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('User deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete the user of id = 2, because they will have been already deleted', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/2')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('User with the specified ID could not be found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve users who reset their passwords, because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/auth/reset')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals(
            'Admin, there are currently no users who reset their passwords'
          );
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete the admin', (done) => {
    chai
      .request(server)
      .delete('/api/v2/users/1')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('User deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve registered users, because they will have been deleted', (done) => {
    chai
      .request(server)
      .get('/api/v2/users')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('No users found');
        res.body.should.be.a('object');
        done();
      });
  });

  database.query(
    'TRUNCATE TABLE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;'
  );
});
