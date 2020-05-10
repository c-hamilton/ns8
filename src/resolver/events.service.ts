import { Event /* */ } from "../model/event.interface";

/*
### Event
- type
  - This field is required to create a new event
  - The value can be any non-empty string

*/

const yesterday = () => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime() / 1000;
};

const events: Array<Event> = [
  {
    id: 1,
    user_id: 1,
    created: Date.now(),
    type: "Login",
  },
  {
    id: 2,
    user_id: 1,
    created: Date.now(),
    type: "Login123",
  },
  {
    id: 2465756,
    user_id: 1,
    created: yesterday() - 5000,
    type: "Click",
  },
  {
    id: 22342,
    user_id: 2,
    created: yesterday() - 1000000,
    type: " ",
  },
];

const validateEvent = (event: Event) => {
  // check that, user id matches a user in system
  // check that type field is a non empty string
};

export const findRecent = async (): Promise<Array<Event>> => {
  return events.filter((e: Event) => e.created > yesterday());
};

export const findByUserId = async (user_id: number): Promise<Array<Event>> => {
  return events.filter((e: Event) => e.user_id === user_id);
};

export const findAll = async (): Promise<Array<Event>> => {
  return events;
};

export const create = async (newEvent: Event): Promise<void> => {
  const id = new Date().valueOf();
  events[id] = {
    ...newEvent,
    id,
  };
};
