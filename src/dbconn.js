import { MongoClient } from "mongodb";
const uri = "mongodb+srv://ronny:1Y1HnECGCtQUvdnx@cluster0.cd8s9aq.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri);
let conn;
let db;
let collection;
try {
  conn = await client.connect();
  db = await conn.db("tasks");
  collection = db.collection("taskscoll");
} catch(e) {
  console.error(e);
}
export default collection;