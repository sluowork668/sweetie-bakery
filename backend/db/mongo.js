import { MongoClient } from "mongodb";

let db;

export async function connectToMongo(uri, dbName) {
  const client = new MongoClient(uri);

  await client.connect();
  db = client.db(dbName);

  console.log("MongoDB connected");
}

export function getDb() {
  if (!db) {
    throw new Error("DB not connected");
  }
  return db;
}
