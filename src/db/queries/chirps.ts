import {db} from "../dbindex.js";
import {NewChirp, chirps} from "../schema.js";

export async function createChirp(chirp: NewChirp) {
    try{
    //equals to INSERT INTO <table> (<columns>) VALUES (<values>) RETURNING *;
  const [result] = await db
    .insert(chirps)
    .values(chirp)
    .onConflictDoNothing()
    .returning();
  return result;
    }catch(err){
    console.log(err);
    };
};

export async function retrieveChirps(){ //get Chirps (messages) in ascending creation order
  try{
    const result = await db.select().from(chirps).orderBy(chirps.createdAt);
    return result;
  }catch(err){
    console.log(err);
  };
  //db.select({eachChirp: chirps.body}) <- Use this to select just the message columns
};
