/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHTTP from 'chai-http';

import database from '../db';
import server from '../index';
import {
  newUser4,
  newUser5,
  newUserLogIn4,
  newUserLogIn5,
  message,
  message2,
  admin,
  draftEmail,
  draftEmail2,
  message3,
  message4
} from './dummy';

chai.use(chaiHTTP);
chai.should();

describe('MESSAGE ENDPOINT TESTS', () => {
  let userToken1;
  let userToken2;
  let adminToken;
  it('Should register a fourth user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser4)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('User registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should register a fifth new user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser5)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('User registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should login the fourth user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn4)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken1 = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Logged in');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should login the fifth user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn5)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken2 = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Logged in');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should login the admin', done => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(admin)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        adminToken = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Logged in');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send an email', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send an email', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not send this email because the receiver is not registered', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message3)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('the receiver is not registered');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not send this email because the sender and receiver emails are the same', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message4)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have
          .property('error')
          .eql('the sender and receiver email must not be the same');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should send a draft email', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(draftEmail)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('email drafted');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send a draft email', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(draftEmail2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('email drafted');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, received emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('received emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('received emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('your sent emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('your sent emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, sent emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent email of id 1', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, sent email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent email of id 2', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/2')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, sent email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve sent email of id 6 because it does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, sent email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve sent email of id 1', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('sent email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve sent email of id 6 because it does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('sent email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve sent email of id 2', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent/2')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('sent email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve unread emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, unread emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve unread emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('your unread emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve unread emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('your unread emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received email of id 1', done => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, received email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received email of id 2', done => {
    chai
      .request(server)
      .get('/api/v2/messages/2')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('received email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve received email of id 1', done => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('received email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve read emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, read emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve read emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('your read emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve read emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('your read emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve draft emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, draft emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve draft email of id 1', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, draft email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve draft email of id 6 because it does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, draft email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve draft emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('your draft emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve draft email of id 1', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('draft email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve draft email of id 6 because it does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('draft email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve draft emails', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('your draft emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve draft email of id 2', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft/2')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('draft email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send an email', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send an email', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(message2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send a draft email', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(draftEmail)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('email drafted');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send a draft email', done => {
    chai
      .request(server)
      .post('/api/v2/messages')
      .send(draftEmail2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('email drafted');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should delete received email of id = 3', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/3')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('received email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete received email of id = 1', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('received email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete received email of id = 4', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/4')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('received email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete received email of id = 4 because it does not exist', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, received email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete received email of id = 2', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/2')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('received email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete received email of id = 6 because it does not exist', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('received email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete sent email of id = 2', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/2')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('sent email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete sent email of id = 6 because it does not exist', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, sent email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete sent email of id = 1', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('sent email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete sent email of id = 6 because it does not exist', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('sent email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete draft email of id = 2', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/2')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('draft email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete draft email of id = 1', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('draft email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete draft email of id = 3', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/3')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('draft email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete draft email of id = 4', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/4')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('draft email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve draft emails because they will have been deleted', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, no draft emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve draft emails because they will have been deleted', done => {
    chai
      .request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('sorry! you have no draft emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve unread emails they have been read', done => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, no unread emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve unread emails because they have been read', done => {
    chai
      .request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('sorry! you have no unread emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve read emails because they will have been deleted', done => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, no read emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve read emails because they will have been deleted', done => {
    chai
      .request(server)
      .get('/api/v2/messages/read')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('sorry! you have read no emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete sent email of id = 3', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/3')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('sent email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete sent email of id = 4', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/sent/4')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('sent email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve sent emails because they will have been deleted', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, no sent emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve sent emails because they will have been deleted', done => {
    chai
      .request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('sorry! you have sent no emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve received email of id 1 because it will have been deleted or does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, received email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve received email of id 1 because it will have been deleted or does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/messages/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('received email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete draft email of id = 6 because it does not exist', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, draft email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete draft email of id = 6 because it does not exist', done => {
    chai
      .request(server)
      .delete('/api/v2/messages/draft/6')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('draft email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve received emails because they will have been deleted', done => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, received emails not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve received emails because they will have been deleted', done => {
    chai
      .request(server)
      .get('/api/v2/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('received emails not found');
        res.body.should.be.a('object');
        done();
      });
  });

  database.query(
    'TRUNCATE TABLE receivedemails CASCADE; ALTER SEQUENCE receivedemails_id_seq RESTART WITH 1;'
  );
  database.query(
    'TRUNCATE TABLE sentemails CASCADE; ALTER SEQUENCE sentemails_id_seq RESTART WITH 1;'
  );
  database.query(
    'TRUNCATE TABLE draftemails CASCADE; ALTER SEQUENCE draftemails_id_seq RESTART WITH 1;'
  );
});
