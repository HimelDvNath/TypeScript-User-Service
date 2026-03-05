import express, { Express, Request, Response, NextFunction } from "express";
import userRoutes from "./routes/user.routes";

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", userRoutes);

// Start the server
const server = app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📝 API endpoints available at http://localhost:${port}/api`);
});

export default app;
