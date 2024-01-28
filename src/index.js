import express from "express";
import cors from "cors";
import collection from "./dbconn.js";
import { ObjectId } from "mongodb";
import { auth } from "express-oauth2-jwt-bearer";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const checkkJwt = auth({
  audience: "crudtasks",
  issuerBaseURL: "https://dev-sdj0osds.auth0.com",
});

app.use(cors());
app.use(express.json());

//Get Tasks
app.get("/api/tasks", checkkJwt, async (req, res) => {
  try {
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Edit a Task
app.put("/api/tasks/:_id", checkkJwt, async (req, res) => {
  const { name, checked } = req.body.task;
  const query = { _id: new ObjectId(req.params._id) };
  const update = {
    $set: {
      name,
      checked,
    },
  };
  try {
    await collection.updateOne(query, update);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Upload a Task
app.post("/api/tasks", checkkJwt, async (req, res) => {
  const { name, checked } = req.body.task;
  const update = {
    name: name,
    checked: checked,
  };

  try {
    let response = await collection.insertOne(update);
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Delete a Task
app.delete("/api/tasks/:id", checkkJwt, async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  try {
    await collection.deleteOne(query);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(5000, () => {
  console.log("App listening on 5000");
});
