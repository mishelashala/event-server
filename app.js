const express = require("express");
const bodyParser = require("body-parser");
const cuid = require("cuid");

let events = [{ id: "1", name: "Tortas Event" }, { id: "2", name: "Another Tortas Event" }];

const app = express();
app.use(bodyParser.json());

app.get("/events", (req, res) => {
  res.json({
    events,
  });
});

function validateEvent(req, res, next) {
  const event = req.body;

  if (event.name === undefined || event.name === "") {
    return res.status(400).json({});
  }

  next();
}

// Controller - Function that returns the result of an succesfull action
app.post("/events", validateEvent, (req, res) => {
  const event = req.body;
  const newEvent = {
    ...event,
    id: cuid(),
  };

  events.push(newEvent);
  res.status(201).json({ event: newEvent });
});

app.put("/events/:id", validateEvent, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const eventIndex = events.findIndex(event => event.id === id);

  if (eventIndex === -1) {
    return res.status(400).json({});
  }

  events[eventIndex] = {
    ...events[eventIndex],
    name,
  };

  res.status(200).json({
    event: events[eventIndex],
  });
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex(event => event.id === id);

  // event not found
  if (eventIndex === -1) {
    return res.status(400).json({});
  }

  events = events.filter(event => event.id !== id);
  res.status(204).json({});
});

module.exports = app;
