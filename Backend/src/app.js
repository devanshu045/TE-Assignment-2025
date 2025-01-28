import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "17kb" }));
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cors({ origin: "*" }));  

import route from "./Routes/ProjectRoutes.js";
app.use('/Project', route);

export { app };
