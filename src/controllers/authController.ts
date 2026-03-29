//register user controller function
//register user controller function
import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db.ts";
import { usersTable } from "../schema.ts";
import bcrypt from "bcryptjs";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { name, secName, age, email, password } = req.body;

    //check if user already exists
    // const existingUser = await db
    //   .select()
    //   .from(usersTable)
    //   .where(eq(usersTable.email, email))
    //   .limit(1);
    //   console.log("Existing user query result:", existingUser);
    // if (existingUser) {
    //   return res.status(400).json({ message: "User already exists" });
    // }
    //hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db
      .insert(usersTable)
      .values({
        name,
        secName,
        age,
        email,
        password: hashedPassword,
      })
      .returning();
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
