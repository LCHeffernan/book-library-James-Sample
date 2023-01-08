const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const app = require("../src/app");
const reader = require("../src/models/reader");

describe("/books", () => {
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });
  describe("with no books on database", () => {
    describe("POST /books", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/books").send({
          title: "Redwall",
          author: "Brian Jaques",
          genre: "Fantasy",
          ISBN: "72A",
        });

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal("Redwall");
        expect(newBookRecord.title).to.equal("Redwall");
        expect(newBookRecord.author).to.equal("Brian Jaques");
        expect(newBookRecord.genre).to.equal("Fantasy");
      });
      it("throws an error when there is no title", async () => {
        const response = await request(app).post("/books").send({
          author: "Brian Jaques",
          genre: "Fantasy",
          ISBN: "72A",
        });
        expect(response.body).to.equal(
          "notNull Violation: Please enter a title"
        );
      });
      it("throws an error when there is no author", async () => {
        const response = await request(app).post("/books").send({
          title: "Redwall",
          genre: "Fantasy",
          ISBN: "72A",
        });
        expect(response.body).to.equal(
          "notNull Violation: Please enter an author"
        );
      });
    });
  });

  describe("with books in the database", () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "Winds of Winter",
          author: "George Martin",
          genre: "Fantasy",
          ISBN: "87D",
        }),
        Book.create({
          title: "Redwall",
          author: "Brian Jaques",
          genre: "Fantasy",
          ISBN: "72A",
        }),
        Book.create({
          title: "Dune",
          author: "Frank Herbert",
          genre: "sci-fi",
          ISBN: "43R",
        }),
      ]);
    });
    describe("GET /books", () => {
      it("Gets all the books", async () => {
        const response = await request(app).get("/books");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
        });
      });
    });
    describe("GET /book/:id", () => {
      it("gets book by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
      });
      it("returns 404 if book doesnt exist", async () => {
        const response = await request(app).get("/books/1234");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested book not found :(");
      });
    });
    describe("PATCH /books/:id", () => {
      it("updates books genre by id", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ genre: "fiction" });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.genre).to.equal("fiction");
      });
      it("returns a 404 if book doesnt exist", async () => {
        const response = await request(app)
          .patch("/books/1234")
          .send({ genre: "non-fiction" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested book not found :(");
      });
    });
    describe("DELETE /books/:id", () => {
      it("Deletes a book by id", async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });
      it("returns a 404 if book doesnt exist", async () => {
        const response = await request(app).delete("/books/1234");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("Requested book not found :(");
      });
    });
  });
});
