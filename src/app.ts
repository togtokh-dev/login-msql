import express, { Express, Request, Response } from "express";
import routers from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import lusca from "lusca";
import compression from "compression";
import date from "date-and-time";
import morgan, { TokenIndexer } from "morgan";
import authMaster, { authMasterRequest } from "auth-master";

import mysql from "mysql";
import { SQL } from "./util/secrets";

const ENV_TYPE = process.env.NODE_ENV || process.env.npm_lifecycle_event;

if (process.env.NEWRELIC == "true") {
  console.log("NewRelic ON ");
  import("newrelic");
}
console.log(ENV_TYPE);

export const connection = mysql.createConnection({
  user: SQL.DB_USER,
  database: SQL.DB_DATABASE,
  password: SQL.DB_PASSWORD,
  port: Number(SQL.DB_PORT),
  host: SQL.DB_HOST,
  dateStrings: true,
});
connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) console.log("DATABASE :", error);
  console.log(
    "DATABASE :",
    results[0].solution == 2 ? "SUCCESS" : "FAILED",
    `${connection.config.host}:${connection.config.port}@${connection.config.user}/${connection.config.database}`
  );
});
authMaster.config.keys = {
  userToken: process.env.JWT_USER_KEY,
  otpToken: "1com5NxO5{j>(i+5uu1b8i>yJ",
};

console.log(authMaster.config.keys);

const jsonParser = bodyParser.json();
const app: Express = express();
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(
  morgan(function (tokens: TokenIndexer, req: Request, res: Response) {
    return [
      date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
app.use(
  cookieParser(),
  fileupload(),
  jsonParser,
  compression(),
  lusca.xframe("SAMEORIGIN"),
  lusca.xssProtection(true),
  cors({
    origin: process.env.APP_URL || "*",
    allowedHeaders: "Set-Cookie, Content-Type, Authorization",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
  function (req, res, next) {
    next();
    express.json();
  }
);
app.use(
  authMaster.checkTokenBearer(
    [
      "userToken",
      "merchantToken",
      "systemToken",
      "adminToken",
      "clientUserToken",
    ],
    { required: false }
  )
);

app.use(routers);
app.set("port", process.env.PORT || 3000);
export default app;
