import { Request, Response } from "express";
import userService from "../service/userService";


export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await userService.createUser(email, password, role);
    return res.status(201).json({ message: "User created", user });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    return res.json(user);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updated = await userService.updateUser(
      Number(req.params.id),
      req.body
    );
    return res.json({ message: "User updated", updated });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(Number(req.params.id));
    return res.json({ message: "User deleted" });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
