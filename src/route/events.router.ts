import express, { Request, Response } from "express";
import * as EventsService from "../resolver/events.service";
import { Event } from "../model/event.interface";

export const eventsRouter = express.Router();

const getEvents = async (req: Request, res: Response) => {
  try {
    const events: Array<Event> = await EventsService.findAll();
    res.status(200).send(events);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const getRecentEvents = async (req: Request, res: Response) => {
  try {
    const events: Array<Event> = await EventsService.findRecent();
    res.status(200).send(events);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const getEventByUserId = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const event: Array<Event> = await EventsService.findByUserId(id);

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
    res.status(400).send(e.message);
  }
};

eventsRouter.get("/", getEvents);

eventsRouter.get("/recent", getRecentEvents);

eventsRouter.get("/:id", getEventByUserId);

eventsRouter.post("/", createEvent);
