import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../server";
import {
  newUser, newUserLogIn, falseEmailLogIn, falsePasswdLogIn, falseNewUser,
  falseNewUser2, falseUserLogIn,
} from "./dummy";

chai.use(chaiHTTP);
chai.should();

// eslint-disable-next-line no-undef
describe("USER ENDPOINT TESTS", () => {
  // eslint-disable-next-line no-undef
  it("Should register a new user", (done) => {
    chai.request(server)
      .post("/api/v1/auth/signup")
      .send(newUser)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.have.property("status").eql(201);
        res.body.should.have.property("success").eql("user registered");
        res.body.should.be.a("object");
        res.body.data.should.be.a("array");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("Should not register a new user if the email is not valid", (done) => {
    chai.request(server)
      .post("/api/v1/auth/signup")
      .send(falseNewUser)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.property("error").eql("email must be a valid email");
        res.body.should.be.a("object");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("Should not register a new user if the firstname is empty", (done) => {
    chai.request(server)
      .post("/api/v1/auth/signup")
      .send(falseNewUser2)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.property("error").eql("firstname is not allowed to be empty");
        res.body.should.be.a("object");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("Should login the user", (done) => {
    chai.request(server)
      .post("/api/v1/auth/login")
      .send(newUserLogIn)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.have.property("status").eql(200);
        res.body.should.have.property("success").eql("logged in");
        res.body.should.be.a("object");
        res.body.data.should.be.a("array");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("Should not login the user if the email is invalid", (done) => {
    chai.request(server)
      .post("/api/v1/auth/login")
      .send(falseEmailLogIn)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.have.property("status").eql(400);
        res.body.should.have.property("error").eql("invalid email");
        res.body.should.be.a("object");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("Should not login the user if the email is empty", (done) => {
    chai.request(server)
      .post("/api/v1/auth/login")
      .send(falseUserLogIn)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.property("error").eql("email is not allowed to be empty");
        res.body.should.be.a("object");
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it("Should not login the user if the password is incorrect", (done) => {
    chai.request(server)
      .post("/api/v1/auth/login")
      .send(falsePasswdLogIn)
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.have.property("status").eql(400);
        res.body.should.have.property("error").eql("incorrect password");
        res.body.should.be.a("object");
        done();
      });
  });
});
