import express from "express";
import http from "http";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import yaml from "yaml";

function setupOpenAPIUI(app: express.Application) {
  const file = fs.readFileSync("api.yml", "utf8");
  const openAPIContract = yaml.parse(file);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIContract));
}

function createServer(app: express.Application, port: number | null) {
  const serverMessage = (): void => {
    console.log(
      `HTTP server listening on port ${port} - Env: ${
        process.env.NODE_ENV || "local"
      }`
    );
  };
  const server = http.createServer(app).listen(port, serverMessage);
}

const app = express();
setupOpenAPIUI(app);
createServer(app, 3000);
