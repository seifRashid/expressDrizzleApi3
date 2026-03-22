//register user
import { Router } from "express";
import { db } from "../db.ts";
import { usersTable } from "../schema.ts";
import { registerUserController } from "../controllers/authController.ts";
const router = Router();

//register user
router.post("/register",registerUserController);

//login user
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await db
      .select()
      .from(usersTable)
      .where(usersTable.email.equals(email))
      .first();
    if (user) {
      res.status(200).json({ message: "Login successful!", user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
