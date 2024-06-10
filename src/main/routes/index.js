import { Router } from "express";
import addDataRoute from "./addData.js";

const router = Router();

router.use("/addData", addDataRoute);

export default router;