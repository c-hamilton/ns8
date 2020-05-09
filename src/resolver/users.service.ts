import { User, Users } from "../model/user.interface";

const users: Users = {
  1: {
    id: 1,
    name: "Cassie",
    email: "testy@test.com",
    password: "password",
    phonenumber: null,
  },
  2: {
    id: 2,
    name: "Bob",
    email: "bob@test.com",
    password: "test123",
    phonenumber: null,
  },
};

const validateUser = (newuser: User) => {
  // check that password is populated
  // check that, if provided, phone number matches REGEX
  // check that email is populated and unique
};

export const findAll = async (): Promise<Users> => {
  return users;
};

export const find = async (id: number): Promise<User> => {
  const found: User = users[id];
  if (found) {
    return found;
  }
  console.log("No user found", id);
  throw new Error("No record found for userid." + id);
};

export const create = async (newuser: User): Promise<void> => {
  const id = new Date().valueOf();
  users[id] = {
    ...newuser,
    id,
  };
};


// might want this later so I am not deleteing this yet
export const update = async (updateduser: User): Promise<void> => {
  if (users[updateduser.id]) {
    users[updateduser.id] = updateduser;
    return;
  }