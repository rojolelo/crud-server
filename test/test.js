import { createRequire } from "module";

const require = createRequire(import.meta.url);
const chaiHttp = require("chai-http");
//var chai = require("chai");
// import chaiHttp from "chai-http";
import * as chai from "chai";
let assert = chai.assert;

chai.use(chaiHttp);

const url = "http://localhost:5000";

//Test Get route
describe("/GET tasks", () => {
  it("Should get all the tasks", (done) => {
    chai
      .request(url)
      .get("/api/tasks")
      .end((err, res) => {
        assert.equal(res.status, 200);
      });
    done();
  });
});
