import mysql from "mysql";
import promisePool from "../../config/mysql";

class sql {
  async SELECT(table: any) {
    try {
      const pool = await promisePool.promise();
      const key_and_value = [table];
      const sql = "SELECT * FROM ??";
      const inserts = key_and_value;
      const query = mysql.format(sql, inserts);
      const res = await pool.query(query);
      return Promise.resolve(res[0]);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  async INSERT(values: any, table: any) {
    try {
      const pool = await promisePool.promise();
      const key_and_value = [table];
      let keys = "";
      let value = "";
      for (const property in values) {
        if (keys != "") {
          keys = keys.concat(",");
          value = value.concat(",");
        }
        keys = keys.concat("??");
        value = value.concat("?");
        key_and_value.push(property);
      }
      for (const property in values) {
        key_and_value.push(values[property]);
      }
      const sql = `INSERT INTO ?? (${keys}) VALUES (${value})`;
      const inserts = key_and_value;
      const query = mysql.format(sql, inserts);
      const res = await pool.query(query);
      console.log(res);
      return Promise.resolve(res[0]);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
  async UPDATE(values: any, update_key: any, update_value: any, table: any) {
    try {
      const pool = await promisePool.promise();
      const key_and_value = [table];
      let sets = "";
      for (const property in values) {
        if (sets != "") {
          sets = sets.concat(", ");
        }
        sets = sets.concat("?? =  ? ");
        key_and_value.push(property);
        key_and_value.push(values[property]);
      }
      const sql = `UPDATE ?? SET ${sets}  WHERE (\`${update_key}\` = '${update_value}');`;
      const inserts = key_and_value;
      const query = mysql.format(sql, inserts);
      const res = await pool.query(query);
      return Promise.resolve(res[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async DELETE(delete_key: any, delete_value: any, table: any) {
    try {
      const pool = await promisePool.promise();
      const sql = "DELETE FROM ?? WHERE (?? = ?);";
      const inserts = [table, delete_key, delete_value];
      const query = mysql.format(sql, inserts);
      const res = await pool.query(query);
      return Promise.resolve(res[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async QUERY(query_key: any, query_value: any) {
    try {
      const pool = await promisePool.promise();
      const query = mysql.format(query_key, query_value);
      console.log(query);
      const res = await pool.query(query);
      return Promise.resolve(res[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async SELECT_WHERE(query_key: any, query_value: any, table: any) {
    try {
      const pool = await promisePool.promise();
      const key_and_value = [table, query_key, query_value];
      const sql = "SELECT * FROM ?? WHERE ??=?";
      const inserts = key_and_value;
      const query = mysql.format(sql, inserts);
      console.log(query);
      const res = await pool.query(query);
      return Promise.resolve(res[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
export default new sql();
