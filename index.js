require("dotenv").config();
const express = require("express");
const router = require("./routers/router");
const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.DB_PORT);

