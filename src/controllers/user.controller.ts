import type { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  getUsers,
  blockUser,
} from "../services/user.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return res.status(409).json({ message: "User already exists" });
    }

    res.status(500).json({ message: "Internal error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserByIdController = async (req: any, res: Response) => {
  try {
    const user = await getUserById(req.params.id, req.user);

    res.status(200).json(user);
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(403).json({ message: error.message });
  }
};

export const getUsersController = async (req: any, res: Response) => {
  try {
    const users = await getUsers(req.user);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const blockUserController = async (req: any, res: Response) => {
  try {
    const user = await blockUser(req.params.id, req.user);

    res.status(200).json(user);
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(403).json({ message: error.message });
  }
};
