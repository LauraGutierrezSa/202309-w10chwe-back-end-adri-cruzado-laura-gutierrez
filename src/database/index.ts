import mongoose from "mongoose";

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    // Mensaje para cuando se ha conectado 🐼
  } catch (error) {
    // Mensaje para cuando no se ha conectado 🐇
  }
};
