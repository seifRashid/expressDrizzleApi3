//watchlist.routes.ts
import { Router } from "express";
import { addToWatchlist } from "../controllers/watchlistController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
const router = Router();
//middleware to check if user is authenticated can be added here in future
router.use(authMiddleware);

//register user
router.post("/", addToWatchlist);

export default router;
