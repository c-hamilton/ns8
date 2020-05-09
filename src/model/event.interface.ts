/*
### Event
- type
  - This field is required to create a new event
  - The value can be any non-empty string
*/

export interface Event {
  id: number;
  timestamp_utc: number;
  user_id: number;
}

export interface Events {
  [key: number]: Event;
}
