/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiHTTP from 'chai-http';

import server from '../index';
import database from '../db';
import {
  newUser6,
  newUser7,
  newUser8,
  newUserLogIn6,
  newUserLogIn7,
  newUserLogIn8,
  admin,
  newGroup,
  newGroupName,
  newGroupName2,
  newGroup2,
  newGroup3,
  newGroupMember,
  newGroupMember2,
  groupMessage
} from './dummy';

chai.use(chaiHTTP);
chai.should();

describe('GROUP ENDPOINT TESTS', () => {
  let userToken1;
  let userToken2;
  let userToken3;
  let adminToken;

  it('Should register a seventh user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser6)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('User registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should register an eight user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser7)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('User registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should register a ninth user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser8)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('User registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should login the sixth user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn6)
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

  it('Should login the seventh user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn7)
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

  it('Should login the eight user', done => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn8)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken3 = `Bearer ${res.body.token}`;
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

  it('Should create a new group', done => {
    chai
      .request(server)
      .post('/api/v2/groups')
      .send(newGroup)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('group created');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should create a new group', done => {
    chai
      .request(server)
      .post('/api/v2/groups')
      .send(newGroup2)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('group created');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should create a new group', done => {
    chai
      .request(server)
      .post('/api/v2/groups')
      .send(newGroup3)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('group created');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve groups', done => {
    chai
      .request(server)
      .get('/api/v2/groups')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('admin, groups retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve groups', done => {
    chai
      .request(server)
      .get('/api/v2/groups')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('groups retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should add a group member', done => {
    chai
      .request(server)
      .post('/api/v2/groups/3/users')
      .send(newGroupMember)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('group member registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not add the group member because their username is already taken', done => {
    chai
      .request(server)
      .post('/api/v2/groups/3/users')
      .send(newGroupMember)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have
          .property('error')
          .eql(
            'the specified username is already taken. choose another unique name'
          );
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not add the group member because they are not even registered', done => {
    chai
      .request(server)
      .post('/api/v2/groups/3/users')
      .send(newGroupMember2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql(
            'user with the specified email is not even registered. the email is incorrect'
          );
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should send a group message', done => {
    chai
      .request(server)
      .post('/api/v2/groups/1/messages')
      .send(groupMessage)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('success').eql('group email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not send a group message, because the group does not exist', done => {
    chai
      .request(server)
      .post('/api/v2/groups/11/messages')
      .send(groupMessage)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve group messages', done => {
    chai
      .request(server)
      .get('/api/v2/groups/1/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('group emails found');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve group messages', done => {
    chai
      .request(server)
      .get('/api/v2/groups/1/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, group emails found');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve group messages, because they are none', done => {
    chai
      .request(server)
      .get('/api/v2/groups/2/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, no group emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because the group does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/groups/4/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('admin, group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because they are none', done => {
    chai
      .request(server)
      .get('/api/v2/groups/3/messages')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('no group emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because they are none', done => {
    chai
      .request(server)
      .get('/api/v2/groups/3/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('no group emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because they are not a member of the group', done => {
    chai
      .request(server)
      .get('/api/v2/groups/3/messages')
      .set('authorization', userToken3)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('you are not a member of the group or it does not exist');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because they are none', done => {
    chai
      .request(server)
      .get('/api/v2/groups/2/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('no group emails found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve group members', done => {
    chai
      .request(server)
      .get('/api/v2/groups/3/users')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('group members retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve group members', done => {
    chai
      .request(server)
      .get('/api/v2/groups/3/users')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, group members retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve group members because they are none', done => {
    chai
      .request(server)
      .get('/api/v2/groups/2/users')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have
          .property('error')
          .eql('admin, no group members found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group members because the group does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/groups/4/users')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('admin, group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group members because they are none', done => {
    chai
      .request(server)
      .get('/api/v2/groups/2/users')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('no group members found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group members because the group does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/groups/4/users')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve group member of id = 1', done => {
    chai
      .request(server)
      .get('/api/v2/groups/3/users/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('group member retrieved');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group member of id = 5 because they do not exist', done => {
    chai
      .request(server)
      .get('/api/v2/groups/3/users/5')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('group member not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group member of id = 5 because the group does not exist', done => {
    chai
      .request(server)
      .get('/api/v2/groups/5/users/5')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should change the group name', done => {
    chai
      .request(server)
      .patch('/api/v2/groups/1/name')
      .send(newGroupName)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('group name changed');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should change the group name', done => {
    chai
      .request(server)
      .patch('/api/v2/groups/1/name')
      .send(newGroupName2)
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have
          .property('success')
          .eql('admin, group name changed');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete the group member of id = 1', done => {
    chai
      .request(server)
      .delete('/api/v2/groups/3/users/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('group member deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete the group member of id = 2 because they do not exist', done => {
    chai
      .request(server)
      .delete('/api/v2/groups/3/users/2')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('group member not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete the group member of id = 1 because the group does not exist', done => {
    chai
      .request(server)
      .delete('/api/v2/groups/4/users/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').eql('group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete the group of id = 2', done => {
    chai
      .request(server)
      .delete('/api/v2/groups/2')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('group deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete the group of id = 3', done => {
    chai
      .request(server)
      .delete('/api/v2/groups/3')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('success').eql('admin, group deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  database.query(
    'TRUNCATE TABLE groups CASCADE; ALTER SEQUENCE groups_id_seq RESTART WITH 1;'
  );
  database.query(
    'TRUNCATE TABLE groupmembers CASCADE; ALTER SEQUENCE groupmembers_id_seq RESTART WITH 1;'
  );
});
