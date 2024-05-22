import express from "express";

import authRouter from "./auth.mjs";
import userRouter from "./users.mjs";

const router = express.Router();
router.use(authRouter);
router.use(userRouter);

export default router;
