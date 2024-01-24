import { MongoClient, Db, Collection } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const uri: string = process.env.MONGOURI!;
const client: MongoClient = new MongoClient(uri);
let conn: MongoClient;
let db: Db;
let collection: Collection | undefined;

async function getCollection() {
  try {
    conn = await client.connect();
    db = await conn.db("tasks");
    collection = db.collection("taskscoll");
  } catch (e) {
    console.error(e);
  }
}

getCollection();

export default collection!;
