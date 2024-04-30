import mysql from "mysql2";
import { SQL } from "../util/secrets";
const pool = mysql.createPool({
  user: SQL.DB_USER,
  database: SQL.DB_DATABASE,
  password: SQL.DB_PASSWORD,
  port: Number(SQL.DB_PORT),
  host: SQL.DB_HOST,
  dateStrings: true,
});

export default pool;
