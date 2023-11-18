import morgan from "morgan";
import express from "express";
import app from "./app.js";
import pingRouter from "../features/ping/router/PingRouter.js";
import notFound from "./middlewares/errors/errorMiddleware.js";

app.use(morgan("dev"));
app.use(express.json());
app.use("/", pingRouter);
app.use(notFound);
