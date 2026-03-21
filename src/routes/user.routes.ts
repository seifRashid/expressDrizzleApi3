// user.routes.ts
import { Router } from "express";
import { db } from "../db.ts";
import { usersTable } from "../schema.ts";
import { testController } from "../controllers/testController.ts";
const router = Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, secName, age, email } = req.body;
    const newUser = await db.insert(usersTable).values({
      name,
      secName,
      age,
      email
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/", testController);

export default router;


//test routes
// import { Router } from "express";
// const router = Router();

// router.get("/", (req, res)=>{
//     res.send("Hello, World again!");
// });

// export default router;