import { Router, Request, Response } from "express";

const books = [
  {
    id: 1,
    title: "Test book",
    author: "Test author",
    summary: "This is a test book",
    rating: 5,
  },
];

export function setupEndpoints(): Router {
  const router = Router();

  router.get("/books", async (req: Request, res: Response) => {
    res.send(books);
  });

  router.post("/books", async (req: Request, res: Response) => {
    const newBook = req.body;
    if (books.find((b) => b.id === newBook.id)) {
      res.status(409).send({
        status: 409,
        type: "business error",
        message: `Book with ID ${newBook.id} already exists`,
      });
    } else {
      books.push(newBook);
      res.send({ id: newBook.id });
    }
  });

  router.get("/books/:bookId", async (req: Request, res: Response) => {
    const bookId = parseInt(req.params.bookId);

    const book = books.find((b) => b.id === bookId);

    if (book) {
      res.send(book);
    } else {
      res.status(404).send({
        status: 404,
        type: "business error",
        message: `Book with ID ${bookId} not found`,
      });
    }
  });

  return router;
}
