const { expect } = require("chai");
const request = require("supertest");
const { Author } = require("../src/models");
const app = require("../src/app");

describe("/authors", () => {
  before(async () => Author.sequelize.sync());

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });
  describe("with no authors on database", () => {
    describe("POST /authors", () => {
      it("creates a new author in the database", async () => {
        const response = await request(app).post("/authors").send({
          author: "Brian Jacques",
        });

        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(201);
        expect(response.body.author).to.equal("Brian Jacques");
        expect(newAuthorRecord.author).to.equal("Brian Jacques");
      });
      it("throws an error when there is no author", async () => {
        const response = await request(app).post("/authors").send({});
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          "notNull Violation: Please enter an author"
        );
      });
      it("throws an error when author is empty", async () => {
        const response = await request(app).post("/authors").send({
          author: "",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          "Validation error: Please enter an author"
        );
      });
      it("throws an error when there is a duplicate author", async () => {
        const response1 = await request(app).post("/authors").send({
          author: "Brian Jacques",
        });
        const response2 = await request(app).post("/authors").send({
          author: "Brian Jacques",
        });
        expect(response1.status).to.equal(201);
        expect(response2.status).to.equal(400);
        expect(response1.body.author).to.equal("Brian Jacques");
        expect(response2.body).to.equal("Author already on the system");
      });
    });
  });
  describe("with authors in the database", () => {
    let authors;
    beforeEach(async () => {
      authors = await Promise.all([
        Author.create({
          author: "Brian Jacques",
        }),
        Author.create({
          author: "George Martin",
        }),
        Author.create({
          author: "Frank Herbert",
        }),
      ]);
    });
    describe("GET /authors", () => {
      it("Gets all the authors", async () => {
        const response = await request(app).get("/authors");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);
      });
    });
    describe("GET /author/:id", () => {
      it("gets author by id", async () => {
        const author = authors[0];
        const response = await request(app).get(`/authors/${author.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.author).to.equal(author.author);
      });
      it("returns 404 if author doesnt exist", async () => {
        const response = await request(app).get("/authors/1234");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested author not found :(");
      });
    });
    describe("PATCH /authors/:id", () => {
      it("updates authors author by id", async () => {
        const author = authors[0];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({ author: "some author" });
        const updatedAuthorRecord = await Author.findByPk(author.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedAuthorRecord.author).to.equal("some author");
      });
      it("returns a 404 if author doesnt exist", async () => {
        const response = await request(app)
          .patch("/authors/1234")
          .send({ author: "some other author" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested author not found :(");
      });
    });
    describe("DELETE /authors/:id", () => {
      it("Deletes a author by id", async () => {
        const author = authors[0];
        const response = await request(app).delete(`/authors/${author.id}`);
        const deletedAuthor = await Author.findByPk(author.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedAuthor).to.equal(null);
      });
      it("returns a 404 if author doesnt exist", async () => {
        const response = await request(app).delete("/authors/1234");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested author not found :(");
      });
    });
  });
});
