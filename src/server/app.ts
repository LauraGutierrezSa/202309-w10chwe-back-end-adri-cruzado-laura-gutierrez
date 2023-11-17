import express from "express";

const app = express();

export const startServer = (port: number) => {
  app.listen(port, () => {
    // Mensaje para cuando se ha levantado 👋
  });
};

export default app;
