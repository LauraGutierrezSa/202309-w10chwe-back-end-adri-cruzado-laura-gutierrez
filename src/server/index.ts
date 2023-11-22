import morgan from "morgan";
import app from "./app.js";
import pingRouter from "../features/ping/router/PingRouter.js";
import robotsRouter from "../features/robot/router/RobotsRouter.js";
import cors from "cors";
import express from "express";
import userRouter from "../features/user/router/userRouter.js";
import notFound from "./middlewares/errors/errorMiddleware.js";

app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use("/", pingRouter);
app.use("/robots", robotsRouter);
app.use("/", userRouter);
app.use(notFound);
