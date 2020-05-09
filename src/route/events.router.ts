import express, { Request, Response } from "express";
import * as EventsService from "../resolver/events.service";
import { Event, Events } from "../model/event.interface";

export const eventsRouter = express.Router();

const getEvents = async (req: Request, res: Response) => {
  try {
    const events: Events = await EventsService.findAll();
    res.status(200).send(events);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const getEventById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const event: Event = await EventsService.findById(id);

    res.status(200).send(event);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const createEvent = async (req: Request, res: Response) => {
  try {
    const Event: Event = req.body.Event;

    await EventsService.create(Event);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

eventsRouter.get("/", getEvents);

eventsRouter.get("/:id");

eventsRouter.post("/", createEvent);
