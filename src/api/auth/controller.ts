import { Request, Response } from "express";
import service from "./service";
import authMaster, { authMasterRequest } from "auth-master";
import { userT } from "./service";
import SupportMaster from "support-master";
export const create = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const insert: userT = {
      user_id: `${Math.floor(Math.random() * 10000000) + 100000}`,
      user_name: body.user_name,
      user_email: body.email?.toString(),
      password: body.password,
    };
    const checkuser = await service.USER_FIND(insert.user_email);
    if (checkuser.length > 0) {
      throw "Хэрэглэгч аль хэдийн бүртгэгдсэн байна.";
    }
    const result = await SupportMaster.hash.Create(insert.password);
    insert.password = result;
    await service.USER_CREATE(insert);
    const user = await service.USER_FIND_ANY("user_id", insert.user_id);
    if (user.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Бүртгэл амжилттай үүслээ",
        data: user[0],
      });
    } else {
      throw "Ямар нэг алдаа гарлаа";
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
      data: null,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const checkuser = await service.USER_FIND(body.email);
    if (checkuser.length == 0) {
      throw "Хэрэглэгч олдсонгүй";
    }
    const user = checkuser[0];
    const result = await SupportMaster.hash.Verify(
      body.password,
      user.password
    );
    if (result) {
      user.password = undefined;
      const jsontoken = await authMaster.create({
        data: user,
        keyName: "userToken",
        expiresIn: process.env.JWT_EXPIRESIN,
      });

      const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      };
      res.cookie("token", jsontoken.data, cookieOptions);
      return res.status(200).json({
        success: true,
        message: "Logged",
        data: user,
        token: jsontoken.data,
      });
    }
    throw "нууц үг таарсангүй";
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
      data: null,
    });
  }
};
export const verify_token = async (req: authMasterRequest, res: Response) => {
  const body = req.authMaster;
  try {
    const results = await service.USER_FIND_ANY("user_id", body.user_id);
    if (results.length == 0) {
      throw "Хэрэглэгч олдсонгүй";
    }
    const user = results[0];
    user.password = undefined;
    const jsontoken = await authMaster.create({
      data: user,
      keyName: "userToken",
      expiresIn: process.env.JWT_EXPIRESIN_APP,
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };
    res.cookie("token", jsontoken.data, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Logged",
      data: user,
      token: jsontoken.data,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
      data: null,
    });
  }
};
