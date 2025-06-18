require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
app.use("/api/auth", authRoutes);
app.use("/api", projectRoutes);

module.exports = app;
