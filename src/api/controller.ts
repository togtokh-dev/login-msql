import { Request, Response } from "express";
import service from "./service";
import { authMasterRequest } from "auth-master";

export const create = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Wallet created",
      data: null,
    });
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
    return res.status(200).json({
      success: true,
      message: "Wallet created",
      data: null,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
      data: null,
    });
  }
};
export const verify_token = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Wallet created",
      data: null,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
      data: null,
    });
  }
};
