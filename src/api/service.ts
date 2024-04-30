import { connection } from "../app";
import functions from "../functions/index";
import axiosRequest from "axios-master";

type userT = {
  user_id: string;
  user_name: string;
  user_email: string;
  password: string;
};

export const USER_CREATE = async (body: userT) => {
  try {
    const query = await functions.Query.INSERT(body, "user");
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  } catch (err) {
    return Promise.reject(`${err}`);
  }
};

export default {
  USER_CREATE,
};
