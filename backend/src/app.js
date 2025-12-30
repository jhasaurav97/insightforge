import express from "express";
import { ApiError } from "./utils/api-error.js";
import healthRoutes from "./routes/health.routes.js";
import usersRoutes from "./routes/users.routes.js";
import errorHandler from "../src/middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/health", healthRoutes);
app.use(errorHandler);


export default app;