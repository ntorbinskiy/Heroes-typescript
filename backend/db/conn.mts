import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);
let conn: MongoClient | undefined;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("heroes_panel");

export default db;
