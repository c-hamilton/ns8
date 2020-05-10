/*
Event
  - type
  - This field is required to create a new event
  - The value can be any non-empty string
*/

export interface Event {
  id: string;
  created: number;
  user_id: string;
  type: string;
}
