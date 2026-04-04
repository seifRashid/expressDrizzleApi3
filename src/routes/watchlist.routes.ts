//watchlist.routes.ts
import { Router } from "express";
import { addToWatchlist } from "../controllers/watchlistController.ts";
const router = Router();

//register user
router.post("/", addToWatchlist);

export default router;
