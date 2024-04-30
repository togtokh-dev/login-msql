import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const ENV_TYPE = process.env.NODE_ENV || process.env.npm_lifecycle_event;
if (ENV_TYPE == "production") {
  console.log(path.resolve(__dirname, "../../.env.production"));
  if (fs.existsSync(path.resolve(__dirname, "../../.env.production"))) {
    logger.debug(
      "Using .env.production file to supply config environment variables"
    );
    dotenv.config({ path: path.resolve(__dirname, "../../.env.production") });
  } else {
    logger.error("No environment variable.");
    process.exit(1);
  }
} else if (ENV_TYPE == "development") {
  if (fs.existsSync(path.resolve(__dirname, "../../.env.development"))) {
    logger.debug(
      "Using .env.development file to supply config environment variables"
    );
    dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });
  } else {
    logger.error("No environment variable.");
    process.exit(1);
  }
} else if (ENV_TYPE == "stage") {
  if (fs.existsSync(path.resolve(__dirname, "../../.env.stage"))) {
    logger.debug(
      "Using .env.stage file to supply config environment variables"
    );
    dotenv.config({ path: path.resolve(__dirname, "../../.env.stage") });
  } else {
    logger.error("No environment variable.");
    process.exit(1);
  }
} else {
  console.log(ENV_TYPE);
  console.log(process.env);
  logger.error("No environment variable.");
  process.exit(1);
}

export const SQL = {
  DB_USER: process.env["DB_USER"],
  DB_DATABASE: process.env["DB_DATABASE"],
  DB_PASSWORD: process.env["DB_PASSWORD"],
  DB_PORT: Number(process.env["DB_PORT"]),
  DB_HOST: process.env["DB_HOST"],
};

export const ENVIRONMENT =
  process.env.NODE_ENV || process.env.npm_lifecycle_event;
