import chai from 'chai';
import chaiHTTP from 'chai-http';
import { describe, it } from 'mocha';

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
  groupMessage,
} from './dummy';

chai.use(chaiHTTP);
chai.should();

describe('GROUP ENDPOINT TESTS', () => {
  let userToken1;
  let userToken2;
  let userToken3;
  let adminToken;

  it('Should register a seventh user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser6)
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

  it('Should register an eight user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser7)
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

  it('Should register a ninth user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/signup')
      .send(newUser8)
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

  it('Should login the sixth user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn6)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken1 = `Bearer ${res.body.data.token}`;

        res.should.have.status(200);
        res.body.should.have.property('message').equals('Logged in');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should login the seventh user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn7)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken2 = `Bearer ${res.body.data.token}`;

        res.should.have.status(200);
        res.body.should.have.property('message').equals('Logged in');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token').equals(res.body.data.token);
        res.body.data.should.have.property('user').equals(res.body.data.user);
        done();
      });
  });

  it('Should login the eight user', (done) => {
    chai
      .request(server)
      .post('/api/v2/auth/login')
      .send(newUserLogIn8)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        userToken3 = `Bearer ${res.body.data.token}`;

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

  it('Should create a new group', (done) => {
    chai
      .request(server)
      .post('/api/v2/groups')
      .send(newGroup)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('group created');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should create a new group', (done) => {
    chai
      .request(server)
      .post('/api/v2/groups')
      .send(newGroup2)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('group created');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should create a new group', (done) => {
    chai
      .request(server)
      .post('/api/v2/groups')
      .send(newGroup3)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('group created');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should retrieve groups - Admin', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, groups retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve specific group - Admin', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/1')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, group retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should retrieve groups - User', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('groups retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve specific group - User', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/2')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('group retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should add a group member ', (done) => {
    chai
      .request(server)
      .post('/api/v2/groups/3/users')
      .send(newGroupMember)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have
          .property('message')
          .equals('group member registered');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should not add the group member because their username is already taken', (done) => {
    chai
      .request(server)
      .post('/api/v2/groups/3/users')
      .send(newGroupMember)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('message')
          .equals(
            'the specified username is already taken. choose another unique name'
          );
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not add the group member because they are not even registered', (done) => {
    chai
      .request(server)
      .post('/api/v2/groups/3/users')
      .send(newGroupMember2)
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals(
            'user with the specified email is not even registered. the email is incorrect'
          );
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should send a group message', (done) => {
    chai
      .request(server)
      .post('/api/v2/groups/1/messages')
      .send(groupMessage)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').equals('group email sent');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should not send a group message, because the group does not exist', (done) => {
    chai
      .request(server)
      .post('/api/v2/groups/11/messages')
      .send(groupMessage)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve group messages - User with Token 1', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/1/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('group messages found');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve group messages - Admin', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/1/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('admin, group messages found');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve group messages, because they are none - Admin', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/2/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, no group messages found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because the group does not exist - Admin', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/4/messages')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('admin, group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because they are none', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/3/messages')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('no group messages found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because they are none', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/3/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('no group messages found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because they are not a member of the group', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/3/messages')
      .set('authorization', userToken3)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('you are not a member of the group or it does not exist');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group messages, because they are none', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/2/messages')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('no group messages found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve group members - User', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/3/users')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('group members retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should retrieve group members - Admin', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/3/users')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, group members retrieved');
        res.body.should.be.a('object');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('Should not retrieve group members because they are none - Admin', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/2/users')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, no group members found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group members because the group does not exist - Admin', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/4/users')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('admin, group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group members because they are none - User', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/2/users')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('no group members found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group members because the group does not exist - User', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/4/users')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should retrieve group member of id = 1', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/3/users/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('group member retrieved');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group member of id = 5 because they do not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/3/users/5')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('group member not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not retrieve group member of id = 5 because the group does not exist', (done) => {
    chai
      .request(server)
      .get('/api/v2/groups/5/users/5')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should change the group name - User', (done) => {
    chai
      .request(server)
      .patch('/api/v2/groups/1/name')
      .send(newGroupName)
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('group name changed');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should change the group name - Admin', (done) => {
    chai
      .request(server)
      .patch('/api/v2/groups/1/name')
      .send(newGroupName2)
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property('message')
          .equals('admin, group name changed');
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('Should delete the group member of id = 1', (done) => {
    chai
      .request(server)
      .delete('/api/v2/groups/3/users/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('group member deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete the group member of id = 2 because they do not exist', (done) => {
    chai
      .request(server)
      .delete('/api/v2/groups/3/users/2')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have
          .property('message')
          .equals('group member not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not delete the group member of id = 1 because the group does not exist', (done) => {
    chai
      .request(server)
      .delete('/api/v2/groups/4/users/1')
      .set('authorization', userToken2)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').equals('group not found');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete the group of id = 2 - User', (done) => {
    chai
      .request(server)
      .delete('/api/v2/groups/2')
      .set('authorization', userToken1)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('group deleted');
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should delete the group of id = 3 - Admin', (done) => {
    chai
      .request(server)
      .delete('/api/v2/groups/3')
      .set('authorization', adminToken)
      .set('Accept', 'Application/JSON')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equals('admin, group deleted');
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
