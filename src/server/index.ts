import morgan from "morgan";
import app from "./app";
import express from "express";

app.use(morgan("dev"));
app.use(express.json());
