import express from "express";
import http from "http";
import { setupEndpoints } from "./controllers";
import { setupOpenAPIValidation, setupSwaggerUI } from "./openapi";
import bodyParser from "body-parser";

function createServer(app: express.Application, port: number | null) {
  const serverMessage = (): void => {
    console.log(
      `HTTP server listening on port ${port} - Env: ${
        process.env.NODE_ENV || "local"
      }`
    );
  };
  const server = http.createServer(app).listen(port, serverMessage);

  server.on("close", async () => {
    console.log("Server closed");
  });
}

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

setupSwaggerUI(app);
setupOpenAPIValidation(app);

app.use(setupEndpoints());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

createServer(app, 3000);
