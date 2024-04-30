import { Request, Response, Router } from "express";
import responseMaster from "response-master";
// Routes
import apiRouter from "./api/router";
const router = Router();
const routers = Router();
//
router.use("/v1", apiRouter);
//
routers.use("/main/wallet", router);
routers.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).send("OK");
});
// Router not found
routers.all("*", (req: Request, res: Response) => {
  return responseMaster.JSON(res, {
    status: "NotFound",
    data: null,
    success: false,
    message: "404",
    messageStatus: "danger",
  });
});

export default routers;
