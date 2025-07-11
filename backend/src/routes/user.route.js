import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",authMiddleware, getUsers);
router.get("/:id",authMiddleware,getUserById);
router.patch("/:id",authMiddleware, updateUserById);
router.delete("/:id",authMiddleware, deleteUserById);

export default router;
