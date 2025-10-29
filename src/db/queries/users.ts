import { db } from "../dbindex.js";
import { NewUser, users } from "../schema.js";

export async function createUser(user: NewUser) {
    //equals to INSERT INTO <table> (<columns>) VALUES (<values>) RETURNING *;
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return result;
};

//[result] -> Array destructuring is used to get the first item from the returned array. 
// This is because drizzle returns an array of results, even if there is only one result.