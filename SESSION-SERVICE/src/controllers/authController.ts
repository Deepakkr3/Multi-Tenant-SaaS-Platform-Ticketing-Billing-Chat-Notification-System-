import { Request, Response } from "express";
import authService from "../service/authService";


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const user = await authService.register(email, password, role);
    return res.status(201).json({ message: "User Registered", user });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await authService.login(email, password);
    return res.json(response);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
