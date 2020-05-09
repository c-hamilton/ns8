import { Event, Events } from "../model/event.interface";

/*
### Event
- type
  - This field is required to create a new event
  - The value can be any non-empty string

*/

const events: Events = {
  1: {
    id: 1,
    user_id: 1,
    timestamp_utc: Date.now(),
  },
  2: {
    id: 2,
    user_id: 1,
    timestamp_utc: Date.now(),
  },
  3: {
    id: 2465756,
    user_id: 1,
    timestamp_utc: Date.now(),
  },
  4: {
    id: 22342,
    user_id: 2,
    timestamp_utc: Date.now(),
  },
};

const validateEvent = () => {
  // check that timestamp is valid (before Date.now())
  // check that, user id matches a user in system
  // check that type field is a non empty string
};

export const findAll = async (): Promise<Events> => {
  return events;
};

export const findById = async (id: number): Promise<Event> => {
  const found: Event = events[id];
  if (found) {
    return found;
  }
  console.log("No event found", id);
  throw new Error("No record found for eventif." + id);
};

export const create = async (newEvent: Event): Promise<void> => {
  const id = new Date().valueOf();
  events[id] = {
    ...newEvent,
    id,
  };
};
