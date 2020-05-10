import { Event } from "../model/eventInterface";
import { createUUID } from "./helper";
import { events, yesterday } from "../model/data/eventsData";

const validateEvent = (newevent: Event) => {
  let response = {
    status: "Error",
    message: "",
  };

  // check that type field is a non empty string
  if (!newevent.type || newevent.type.length < 1) {
    response["message"] = "Event does not contain mandatory field 'type'.";
    return response;
  }
  response["status"] = "Success";
  return response;
};

export const findRecent = async (): Promise<Array<Event>> => {
  return events.filter((e: Event) => e.created > yesterday());
};

export const findByUserId = async (user_id: string): Promise<Array<Event>> => {
  return events.filter((e: Event) => e.user_id === user_id);
};

export const findAll = async (): Promise<Array<Event>> => {
  return events;
};

export const create = async (newEvent: Event): Promise<void> => {
  let validateEventResult = validateEvent(newEvent);
  if (validateEventResult["status"] == "Success") {
    const id = createUUID();
    events.push({ ...newEvent, id });
    return;
  }
  throw new Error(
    "Bad Request for Create User: " + validateEventResult["message"]
  );
};
