import { Event } from "../eventInterface";

export const yesterday = () => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime() / 1000;
};

export const events: Array<Event> = [
  {
    id: "1",
    user_id: "123",
    created: Date.now(),
    type: "Login",
  },
  {
    id: "2",
    user_id: "1",
    created: Date.now(),
    type: "Login123",
  },
  {
    id: "2465756",
    user_id: "1",
    created: yesterday() - 5000,
    type: "Click",
  },
  {
    id: "22342",
    user_id: "2",
    created: yesterday() - 1000000,
    type: " ",
  },
];
