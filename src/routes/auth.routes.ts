//register user
import { Router } from "express";
import { db } from "../db.ts";
import { usersTable } from "../schema.ts";
import { login, register } from "../controllers/authController.ts";
const router = Router();

//register user
router.post("/register", register);

//login user
router.post("/login", login);

export default router;
