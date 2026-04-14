import { Router } from "express";
import {
  register,
  login,
  getUserByIdController,
  getUsersController,
  blockUserController,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/:id", authMiddleware, getUserByIdController);
router.get("/", authMiddleware, getUsersController);
router.patch("/:id/block", authMiddleware, blockUserController);

export default router;
