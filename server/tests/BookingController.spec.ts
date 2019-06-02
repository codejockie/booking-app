import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import app from "../src/app";
import { Booking } from "../src/models/Booking";

chai.use(chaiHttp);
const expect = chai.expect;

// tslint:disable-next-line: max-line-length
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1Y2YyMzEwYzBiMTA3OTljYTVhMDQ2YWEiLCJpYXQiOjE1NTk0NDI4ODR9.tNva3CdbF8ZSDMezArBqiQzJaAqxb9mzl-qRhDoDflE";

describe("Booking Controller", () => {
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

  describe("GET /properties/:propertyId/bookings", () => {
    it("should return an array of properties if any", () => {
      return chai
        .request(app)
        .get("/properties/b007/bookings")
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body).to.be.an("array");
          expect(res.body[0].propertyName).to.eql("Red House");
        });
    });

    it("should return an empty array for a non-existing property", () => {
      return chai
        .request(app)
        .get("/properties/b009/bookings")
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(0);
        });
    });
  });

  describe("POST /bookings", () => {
    before(async () => {
      await Booking.deleteOne({ propertyId: "c008" });
    });

    it("should create a new booking", () => {
      return chai
        .request(app)
        .post("/bookings")
        .send({
          city: "Hokkaido",
          propertyId: "c008",
          propertyName: "Green House",
        })
        .set("Authorization", `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body).to.be.an("object");
          expect(res.body.status).to.equal("ok");
          expect(res.body.booking.propertyName).to.eql("Green House");
          expect(res.body.booking.city).to.eql("Hokkaido");
          expect(res.body.booking.user).to.eql("5cf2310c0b10799ca5a046aa");
        });
    });
  });
});
