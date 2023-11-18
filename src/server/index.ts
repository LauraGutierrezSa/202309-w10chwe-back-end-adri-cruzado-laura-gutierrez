import morgan from "morgan";
import express from "express";
import app from "./app.js";
import pingRouter from "../features/ping/router/PingRouter.js";
import notFound from "./middlewares/errors/errorMiddleware.js";
import robotsRouter from "../features/robot/router/RobotsRouter.js";

app.use(morgan("dev"));
app.use(express.json());
app.use("/", pingRouter);
app.use("/robots", robotsRouter);
app.use(notFound);
