//Add a movie to watchlist function

import type { Request, Response } from "express";
import { db } from "../db.ts";
import { moviesTable, watchlistTable } from "../schema.ts";
import { and, eq } from "drizzle-orm";

export const addToWatchlist = async (req: Request, res: Response) => {
  try {
    const { userId, movieId, status, rating } = req.body;
    console.log(userId, movieId, status, rating);
    //check if movie exists in movie table
    const movieExists = await db
      .select()
      .from(moviesTable)
      .where(moviesTable.id === movieId);
    if (movieExists.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    console.log(userId, movieId, status, rating);

    //check if movie already in watchlist
    const existingEntry = await db
      .select()
      .from(watchlistTable)
      .where(
        and(
          eq(watchlistTable.userId, userId),
          eq(watchlistTable.movieId, movieId),
        ),
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
    // res.status(201).json(newEntry);
    // return the movie details along with the watchlist entry and sucess message
    res.status(201).json({
      success: true,
      message: "Movie added to watchlist successfully!",
      data: newEntry,
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to add to watchlist" });
  }
};

//delete a movie from watchlist function
export const deleteFromWatchlist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEntry = await db
      .delete(watchlistTable)
      .where(eq(watchlistTable.id, parseInt(id as string)))
      .returning();
    if (deletedEntry.length === 0) {
      return res.status(404).json({ error: "Watchlist entry not found" });
    }
    res.status(200).json({
      success: true,
      message: "Movie removed from watchlist successfully!",
      data: deletedEntry,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from watchlist" });
  }
};
