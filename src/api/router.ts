import { Router } from "express";
import authMaster from "auth-master";
const router = Router();
import authRouter from "./auth/router";

router.use("/auth", authRouter);

export default router;
