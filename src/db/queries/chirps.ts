import {db} from "../dbindex.js";
import {NewChirp, chirps} from "../schema.js";

export async function createChirp(chirp: NewChirp) {
    //equals to INSERT INTO <table> (<columns>) VALUES (<values>) RETURNING *;
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    .onConflictDoNothing()
    .returning();
  return result;
};