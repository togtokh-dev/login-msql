import { connection } from "../../app";
import functions from "../../functions/index";
import axiosRequest from "axios-master";

export type userT = {
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
export const USER_FIND = async (user_email: string): Promise<userT[]> => {
  try {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE user_email = ?",
        [user_email],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  } catch (err) {
    return Promise.reject(`${err}`);
  }
};
export const USER_FIND_ANY = async (
  key: string,
  value: string
): Promise<userT[]> => {
  try {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE ?? = ?",
        [key, value],
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  } catch (err) {
    return Promise.reject(`${err}`);
  }
};
export default {
  USER_CREATE,
  USER_FIND,
  USER_FIND_ANY,
};
