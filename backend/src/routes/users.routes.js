import express from "express";
import { login, register, getUserHistory, addToHistory } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/history", getUserHistory);
router.post("/history", addToHistory);

export default router;