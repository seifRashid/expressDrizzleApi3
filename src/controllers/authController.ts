//register user controller function
//register user controller function
import type { Request, Response } from "express";
import { db } from "../db.ts";
import { usersTable } from "../schema.ts";
export const registerUserController = async (req: Request, res: Response) => {
    // res.send("Hello, from register user controller!");
  try {
    const { name, secName, age, email } = req.body;

    //check if user already exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(usersTable.email.equals(email))
      .first();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await db.insert(usersTable).values({
      name,
      secName,
      age,
      email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

