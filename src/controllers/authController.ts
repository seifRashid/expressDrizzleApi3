//register user controller function
//register user controller function
import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db.ts";
import { usersTable } from "../schema.ts";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, secName, age, email, password } = req.body;

    // check if user already exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
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
      data:{
        user: {
        id: newUser[0].id,
        email,
        name,
      },
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//login user controller function
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
      console.log("User found:", user);
    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: {
        user: {
        id: user[0].id,
        email,
      },
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

