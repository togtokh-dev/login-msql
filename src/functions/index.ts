import mysql from "mysql";
const mongoObjectId = function () {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};
const tax = async (amount: number, fee: number) => {
  try {
    const i = fee;
    const x = Math.ceil((amount / 100) * i);
    return x;
  } catch (error) {
    return 0;
  }
};
export const INSERT = async (values: any, table: string) => {
  try {
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
    return Promise.resolve(query);
  } catch (err) {
    console.log(err);
    return Promise.reject("Query error");
  }
};
export const UPDATE = async (
  json: any,
  config: { update_key: string; update_value: string | number; table: string }
) => {
  try {
    const key_and_value = [config.table];
    let sets = "";
    for (const property in json) {
      if (sets != "") {
        sets = sets.concat(", ");
      }
      sets = sets.concat("?? =  ? ");
      key_and_value.push(property);
      key_and_value.push(json[property]);
    }
    const sql = `UPDATE ?? SET ${sets}  WHERE (\`${config.update_key}\` = '${config.update_value}');`;
    const inserts = key_and_value;
    const query = mysql.format(sql, inserts);
    return Promise.resolve(query);
  } catch (error) {
    return Promise.reject(error);
  }
};
export default {
  mongoObjectId,
  tax,
  Query: {
    INSERT,
    UPDATE,
  },
};
