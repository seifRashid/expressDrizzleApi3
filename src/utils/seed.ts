import { db } from "../db.ts"; // adjust path if needed
import { moviesTable } from "../schema.ts"; // adjust path if needed

async function seed() {
  try {
    // 🔹 real user UUID from users table
    const CREATOR_ID = "5a95bbdf-27c6-4678-bbf1-6016ec08a787";

    const movies = [
      {
        title: "Inception",
        director: "Christopher Nolan",
        releaseYear: 2010,
        createdBy: CREATOR_ID,
      },
      {
        title: "The Dark Knight",
        director: "Christopher Nolan",
        releaseYear: 2008,
        createdBy: CREATOR_ID,
      },
      {
        title: "Interstellar",
        director: "Christopher Nolan",
        releaseYear: 2014,
        createdBy: CREATOR_ID,
      },
      {
        title: "Parasite",
        director: "Bong Joon-ho",
        releaseYear: 2019,
        createdBy: CREATOR_ID,
      },
      {
        title: "The Matrix",
        director: "The Wachowskis",
        releaseYear: 1999,
        createdBy: CREATOR_ID,
      },
      {
        title: "Avengers: Endgame",
        director: "Anthony & Joe Russo",
        releaseYear: 2019,
        createdBy: CREATOR_ID,
      },
    ];

    // 🔹 Insert data
    const result = await db.insert(moviesTable).values(movies).returning();

    console.log("✅ Seed successful!");
    console.log(result);
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    process.exit(0);
  }
}

seed();