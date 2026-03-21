import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import testRoutes from "./routes/test.routes.ts";
import userRoutes from "./routes/user.routes.ts";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.use("/test", testRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});