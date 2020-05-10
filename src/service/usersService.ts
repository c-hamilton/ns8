import { User } from "../model/userInterface";
import { usersRouter } from "../route/usersRouter";
import { createUUID } from "./helper";
import { users } from "../model/data/userData";

let VALID_PHONE_NUMBER: RegExp = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

const validateUser = (newuser: User): any => {
  let response = {
    status: "Error",
    message: "",
  };

  // check that password is populated
  if (newuser.password.length < 1) {
    response["message"] = "User failed to provide password.";
    return response;
  }
  // check that, if provided, phone number matches REGEX
  if (
    newuser.phonenumber &&
    newuser.phonenumber.match(VALID_PHONE_NUMBER) === null
  ) {
    response["message"] =
      "User provided a phone number which did not match Regex.";
    return response;
  }
  // check that email is populated and unique
  if (!newuser.email || users.find((entry) => entry.email === newuser.email)) {
    response["message"] = "User provided a duplicate email or no email.";
    return response;
  }
  response["status"] = "Success";
  return response;
};

const generateId = (userid: number): number => {
  return new Date().valueOf() + userid;
};

export const findAll = async (): Promise<Array<User>> => {
  return users;
};

export const find = async (id: string): Promise<User> => {
  const found: User | undefined = users.find((u: User) => u.id === id);
  if (found) {
    return found;
  }
  throw new Error("No record found for userid." + id);
};

export const create = async (newuser: User): Promise<void> => {
  let validateUserResult = validateUser(newuser);
  if (validateUserResult["status"] == "Success") {
    const id = createUUID();
    users.push({ ...newuser, id });
    return;
  }
  throw new Error(
    "Bad Request for Create User: " + validateUserResult["message"]
  );
};
