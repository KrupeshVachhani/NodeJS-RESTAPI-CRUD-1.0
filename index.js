const fs = require("fs");
const mongoose = require("mongoose");
const express = require('express');
const userRouter = require("./routes/user.js");
const { connectMongoDb } = require("./views/connection.js");
const { logReqRes } = require("./middlewares");

const app = express();
app.use(express.json());
const port = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/demo-1").then(()=>
console.log("mongo connected"));

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

app.listen(port, () => console.log("Server Started!!!"));
