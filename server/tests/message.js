/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../server';
import database from '../db/database';
import {
  newUser4, newUser5, newUserLogIn4, newUserLogIn5, message, message2, admin,
  sentEmail, readEmail, unreadEmail, draftEmail, unreadEmail2,
} from './dummy';

chai.use(chaiHTTP);
chai.should();

describe('MESSAGE ENDPOINT TESTS', () => {
  let userToken1; let userToken2; let adminToken;
  it('Should register a fourth user', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(newUser4)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('user registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should register a fifth new user', (done) => {
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(newUser5)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('user registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should login the fourth user', (done) => {
    chai.request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn4)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken1 = `Bearer ${res.body.token}`;
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('logged in');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should login the fifth user', (done) => {
    chai.request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn5)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken2 = `Bearer ${res.body.token}`;
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('logged in');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should login the admin', (done) => {
    chai.request(server)
      .post('/api/v2/auth/login')
      .send(admin)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        adminToken = `Bearer ${res.body.token}`;
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('logged in');
        res.body.should.have.property('token');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should send an email', (done) => {
    chai.request(server)
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

  it('Should send an email', (done) => {
    chai.request(server)
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

  it('Should send an email', (done) => {
    chai.request(server)
      .post('/api/v2/messages')
      .send(sentEmail)
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

  it('Should send an email', (done) => {
    chai.request(server)
      .post('/api/v2/messages')
      .send(readEmail)
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

  it('Should send an email', (done) => {
    chai.request(server)
      .post('/api/v2/messages')
      .send(draftEmail)
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

  it('Should send an email', (done) => {
    chai.request(server)
      .post('/api/v2/messages')
      .send(unreadEmail)
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

  it('Should send an email', (done) => {
    chai.request(server)
      .post('/api/v2/messages')
      .send(unreadEmail2)
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

  it('Should retrieve received emails', (done) => {
    chai.request(server)
      .get('/api/v2/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('received emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve a specific email', (done) => {
    chai.request(server)
      .get('/api/v2/messages/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('email retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve a specific email, because it does not exist', (done) => {
    chai.request(server)
      .get('/api/v2/messages/111')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve unread emails', (done) => {
    chai.request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('sorry! you have no unread emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve draft emails', (done) => {
    chai.request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('your draft emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve sent emails', (done) => {
    chai.request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('your sent emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve draft emails, because they will have been deleted', (done) => {
    chai.request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('sorry! you have no draft emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve read emails, because they will have been deleted', (done) => {
    chai.request(server)
      .get('/api/v2/messages/read')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('sorry! you have read no emails!');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve sent emails', (done) => {
    chai.request(server)
      .get('/api/v2/messages/sent')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('admin, sent emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve read emails', (done) => {
    chai.request(server)
      .get('/api/v2/messages/read')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('admin, read emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve unread emails', (done) => {
    chai.request(server)
      .get('/api/v2/messages/unread')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('admin, unread emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should delete email of id = 6', (done) => {
    chai.request(server)
      .delete('/api/v2/messages/6')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve draft emails', (done) => {
    chai.request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('admin, draft emails retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not delete the email of id = 100, because it does not exist', (done) => {
    chai.request(server)
      .delete('/api/v2/messages/100')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete a specific email of id = 1', (done) => {
    chai.request(server)
      .delete('/api/v2/messages/1')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('email deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete the email of id = 200, because it does not exist', (done) => {
    chai.request(server)
      .delete('/api/v2/messages/200')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('admin, email not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete the first unread email', (done) => {
    chai.request(server)
      .delete('/api/v2/messages/5')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete the second unread email', (done) => {
    chai.request(server)
      .delete('/api/v2/messages/7')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('email deleted by admin');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve draft emails, because they will have been deleted', (done) => {
    chai.request(server)
      .get('/api/v2/messages/draft')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('admin, no draft emails emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  database('TRUNCATE TABLE messages CASCADE; ALTER SEQUENCE messages_id_seq RESTART WITH 1;');
});
