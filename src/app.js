import express from "express";
import morgan from "morgan";
import cors from "cors";
import routers from "./routers/index.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.static("public"));

app.use(morgan("dev"));

app.use(express.json());

// Routes
app.use(routers);

export default app;
