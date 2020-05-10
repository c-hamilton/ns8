/*
### Event
- type
  - This field is required to create a new event
  - The value can be any non-empty string
*/

export interface Event {
  id: number;
  created: number;
  user_id: number;
  type: string;
}
