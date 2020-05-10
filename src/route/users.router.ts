import express, { Request, Response } from "express";
import * as UsersService from "../resolver/users.service";
import { User } from "../model/user.interface";

export const usersRouter = express.Router();

const getUsers = async (req: Request, res: Response) => {
  try {
    const Users: Array<User> = await UsersService.findAll();
    res.status(200).send(Users);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const getById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const user: User = await UsersService.find(id);
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user: any = req.body;
    await UsersService.create(user);
    res.sendStatus(201);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getById);

usersRouter.post("/", createUser);
