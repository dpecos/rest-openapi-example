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

  return router;
}
