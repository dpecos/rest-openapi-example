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
});
