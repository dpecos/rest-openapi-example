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

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: false,
  })
);

setupSwaggerUI(app);
setupOpenAPIValidation(app);

app.use(setupEndpoints());

createServer(app, 3000);
