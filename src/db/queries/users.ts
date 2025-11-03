import { db } from "../dbindex.js";
import { NewUser, users } from "../schema.js";
import {sql} from "drizzle-orm";

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

export async function resetUsers(){
  try{
    await db.execute(sql`TRUNCATE TABLE users CASCADE;`);
    console.log("Truncated users table sucessfully!");
    return;
  }catch(err){
    console.log(err);
  };
}