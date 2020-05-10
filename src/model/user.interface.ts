/*
### User
- email
  - string
  - This field is required to create a new user
  - The system must only allow 1 user per unique email address
- password
  - string
  - This field is required to create a new user
- phone number 
  - string
  - This field is optional
  - When provided, the phone number must follow this pattern ###-###-####
*/

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phonenumber?: string; // I like nullable rather than optional but hey
}
