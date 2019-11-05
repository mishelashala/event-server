const express = require("express");
const bodyParser = require("body-parser");
const EventRouter = require("./routes/EventRouter");
const morgan = require("morgan");

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use("/api/events", EventRouter);

module.exports = app;
