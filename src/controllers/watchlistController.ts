//Add a movie to watchlist function

import type { Request, Response } from "express";
import { db } from "../db.ts";
import { moviesTable, watchlistTable } from "../schema.ts";

export const addToWatchlist = async (req: Request, res: Response) => {
  try {
    const { userId, movieId, status, rating } = req.body;
    //check if movie exists in movie table
    const movieExists = await db
      .select()
        .from(moviesTable)
        .where(moviesTable.id === movieId);
    if (movieExists.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    //check if movie already in warchlist
    const existingEntry = await db
      .select()
      .from(watchlistTable)
      .where(
        watchlistTable.userId === userId && watchlistTable.movieId === movieId,
      );
    if (existingEntry.length > 0) {
      return res.status(400).json({ error: "Movie already in watchlist" });
    }

    const newEntry = await db
      .insert(watchlistTable)
      .values({
        userId,
        movieId,
        status,
        rating,
      })
      .returning();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to watchlist" });
  }
};
