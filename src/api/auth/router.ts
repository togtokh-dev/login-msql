import { Router } from "express";
import authMaster from "auth-master";
const router = Router();
import { create, login, verify_token } from "./controller";

router.post("/create", create);
router.post("/login", login);
router.get(
  "/verify_token",
  authMaster.checkTokenBearer(["userToken"], { required: true }),
  verify_token
);

export default router;
