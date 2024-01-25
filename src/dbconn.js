import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGOURI;
const client = new MongoClient(uri);
let conn;
let db;
let collection;

try {
  // Connect to DB
  conn = await client.connect();

  // Connect to Tasks DB
  db = await conn.db("tasks");

  // Connect to "taskscoll" collection
  collection = db.collection("taskscoll");
} catch (e) {
  console.error(e);
}

export default collection;
