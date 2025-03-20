import express from "express";
import cors from "cors";
import promptRoutes from "./routes/promptRoutes";
import jokeRoutes from "./routes/jokeRoutes";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan";
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/prompts", promptRoutes);
app.use("/api/jokes", jokeRoutes);

// Error handling
app.use(errorHandler);

export default app;
