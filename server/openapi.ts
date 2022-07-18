import { Application } from "express";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import yaml from "yaml";
import * as OpenApiValidator from "express-openapi-validator";

const API_SPEC = "api.yml";

export function setupSwaggerUI(app: Application) {
  const file = fs.readFileSync(API_SPEC, "utf8");
  const openAPIContract = yaml.parse(file);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIContract));
}

export function setupOpenAPIValidation(app: Application) {
  app.use(
    OpenApiValidator.middleware({
      apiSpec: API_SPEC,
      validateRequests: true,
      validateResponses: true,
    })
  );

  app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });
}
