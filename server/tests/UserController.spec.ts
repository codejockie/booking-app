import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import app from "../src/app";
import { Booking } from "../src/models/Booking";

chai.use(chaiHttp);
const expect = chai.expect;

// tslint:disable-next-line: max-line-length
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1Y2YyMzEwYzBiMTA3OTljYTVhMDQ2YWEiLCJpYXQiOjE1NTk0NDI4ODR9.tNva3CdbF8ZSDMezArBqiQzJaAqxb9mzl-qRhDoDflE";

describe("User Controller", () => {
  before(async () => {
    const booking = await Booking.findOne({ propertyId: "b007" });
    if (!booking) {
      await Booking.create(
        {
          city: "Berlin",
          propertyId: "b007",
          propertyName: "Red House",
        },
      );
    }
  });

  describe("GET /users/:userId/bookings", () => {
    it("should return an array of properties if any", () => {
      return chai
        .request(app)
        .get("/users/5cf2310c0b10799ca5a046aa/bookings")
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(2);
          expect(res.body[0].propertyName).to.eql("Red House");
          expect(res.body[1].propertyName).to.eql("Green House");
        });
    });
  });
});
