import express from "express";
import cors from "cors";
import collection from "./dbconn.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(cors());
app.use(express.json());

//Get Tasks
app.get("/api/tasks", async (req, res) => {
  try {
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Edit a Task
app.put("/api/tasks/:_id", async (req, res) => {
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
app.post("/api/tasks", async (req, res) => {
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
app.delete("/api/tasks/:id", async (req, res) => {
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
