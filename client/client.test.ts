import nodeFetch from "node-fetch";
import * as api from "./api";

describe("Book API", () => {
  beforeAll(() => {
    // api.default.basePath = "https://example.com/api";
    api.defaults.fetch = nodeFetch as any;
  });

  it("should list existing books", async () => {
    const response = await api.getBooks();

    expect(response.status).toBe(200);

    const books = response.data as api.Book[];
    expect(books.length).toBeGreaterThan(0);

    expect(books[0].id).not.toBeNull();
  });

  it("should add a new book to the collection", async () => {
    let response = await api.getBooks();
    let books = response.data as api.Book[];
    expect(books.length).toBe(1);

    const newBook: api.Book = {
      id: 2,
      title: "New book",
      author: "New author",
      summary: "This is a test book",
      rating: 3,
    };
    await api.postBooks(newBook);

    response = await api.getBooks();
    books = response.data as api.Book[];
    expect(books.length).toBe(2);
    expect(books[1]).toMatchObject(newBook);
  });
});
