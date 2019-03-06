import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../server";

chai.use(chaiHTTP);
chai.should();

// eslint-disable-next-line no-undef
describe("SERVER ROUTE TEST", () => {
  // eslint-disable-next-line no-undef
  it("Should indicate that the route cannot be found", (done) => {
    chai.request(server)
      .get("/api/v1/test")
      .set("Accept", "Application/JSON")
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.have.property("status").eql(404);
        res.body.should.have.property("error").eql("route not found");
        res.body.should.be.a("object");
        done();
      });
  });
});
