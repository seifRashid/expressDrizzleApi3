//watchlist.routes.ts
import { Router } from "express";
import { addToWatchlist, deleteFromWatchlist } from "../controllers/watchlistController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";
const router = Router();
//middleware to check if user is authenticated can be added here in future
router.use(authMiddleware);

//add to watchlist
router.post("/", addToWatchlist);
//delete from watchlist
router.delete("/:id", deleteFromWatchlist);

export default router
