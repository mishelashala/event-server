const { Router } = require("express");
const cuid = require("cuid");

let events = [{ id: "1", name: "Tortas Event" }, { id: "2", name: "Another Tortas Event" }];

function validateEvent(req, res, next) {
  const event = req.body;

  if (event.name === undefined || event.name === "") {
    return res.status(400).json({});
  }

  next();
}

const EventRouter = Router();

EventRouter.get("/", (req, res) => {
  res.json({
    events,
  });
});

EventRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex(event => event.id === id);

  if (eventIndex === -1) {
    return res.status(404).end();
  }

  const event = events[eventIndex];
  res.json(event);
});

// Controller - Function that returns the result of an succesfull action
EventRouter.post("/", validateEvent, (req, res) => {
  const event = req.body;
  const newEvent = {
    ...event,
    id: cuid(),
  };

  events.push(newEvent);
  res.status(201).json({ event: newEvent });
});

EventRouter.put("/:id", validateEvent, (req, res) => {
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

EventRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex(event => event.id === id);

  // event not found
  if (eventIndex === -1) {
    return res.status(400).json({});
  }

  events = events.filter(event => event.id !== id);
  res.status(204).json({});
});

module.exports = EventRouter;
