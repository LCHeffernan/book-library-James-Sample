const { expect } = require("chai");
const request = require("supertest");
const { Reader } = require("../src/models");
const app = require("../src/app");

describe("/readers", () => {
  before(async () => Reader.sequelize.sync());

  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /readers", () => {
      it("creates a new reader in the database", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "password123",
        });

        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.body.name).to.equal("Elizabeth Bennet");
        expect(response.body.password).to.equal(undefined);
        expect(newReaderRecord.name).to.equal("Elizabeth Bennet");
        expect(newReaderRecord.email).to.equal("future_ms_darcy@gmail.com");
        expect(newReaderRecord.password).to.equal("password123");
        expect(response.status).to.equal(201);
      });
      it("returns an error if a name isnt entered", async () => {
        const response = await request(app).post("/readers").send({
          email: "future_ms_darcy@gmail.com",
          password: "password123",
        });

        expect(response.body).to.equal(
          "notNull Violation: Please enter a name"
        );
      });
      it("returns and error if an email is not valid", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcygmail.com",
          password: "password123",
        });
        expect(response.body).to.equal(
          "Validation error: use a valid email address"
        );
      });
      it("returns and error if the password is not between 8-16 letters", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "pass",
        });
        expect(response.body).to.equal(
          "Validation error: password too short or long"
        );
      });
    });
  });

  describe("with records in the database", () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
        Reader.create({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "password123",
        }),
        Reader.create({
          name: "Arya Stark",
          email: "vmorgul@me.com",
          password: "password123",
        }),
        Reader.create({
          name: "Lyra Belacqua",
          email: "darknorth123@msn.org",
          password: "password123",
        }),
      ]);
    });
    describe("GET /readers", () => {
      it("Gets all the readers records", async () => {
        const response = await request(app).get("/readers");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
          expect(response.body.password).to.equal(undefined);
        });
      });
    });
    describe("GET /readers/:id", () => {
      it("gets readers record by id", async () => {
        const reader = readers[0];
        const response = await request(app).get(`/readers/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
        expect(response.body.password).to.equal(undefined);
      });
      it("returns a 404 if the reader doesnt exist", async () => {
        const response = await request(app).get("/readers/1234");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested reader not found :(");
      });
    });
    describe("PATCH /readers/:id", () => {
      it("updates readers email by id", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: "miss_e_bennet@gmail.com" });
        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal("miss_e_bennet@gmail.com");
        expect(response.body.password).to.equal(undefined);
      });
      it("returns a 404 if reader doesnt exist", async () => {
        const response = await request(app)
          .patch("/readers/1234")
          .send({ email: "some_new_email@gmail.com" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested reader not found :(");
      });
    });
    describe("DELETE /readers/:id", () => {
      it("Deletes a reader by id", async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/readers/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });
      it("returns a 404 if reader doesnt exist", async () => {
        const response = await request(app).delete("/readers/1234");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested reader not found :(");
      });
    });
  });
});
