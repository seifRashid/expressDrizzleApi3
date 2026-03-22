import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import testRoutes from "./routes/test.routes.ts";
import userRoutes from "./routes/user.routes.ts";
import authRoutes from "./routes/auth.routes.ts";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Body persing middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.use("/test", testRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});