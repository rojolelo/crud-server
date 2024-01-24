import express, { Request, Response } from "express";
import cors from "cors";
import collection from "./dbconn";
import { ObjectId } from "mongodb";

const app: any = express();

app.use(cors<Request>());
app.use(express.json());

//Get Tasks
app.get("/api/tasks", async (req: Request, res: Response) => {
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//Edit a Task
app.put("/api/tasks/:_id", async (req: Request, res: Response) => {
  const { name, checked } = req.body.task;
  console.log(req.params);
  const query = { _id: new ObjectId(req.params._id) };
  const update = {
    $set: {
      name,
      checked,
    },
  };
  let response = await collection.updateOne(query, update);
  console.log(response);
  res.sendStatus(200);
});

//Upload a Task
app.post("/api/tasks", async (req: Request, res: Response) => {
  const { name, checked } = req.body.task;
  const update = {
    name: name,
    checked: checked,
  };
  let response = await collection.insertOne(update);
  console.log(response);
  res.status(200).send(response);
});

//Delete a Task
app.delete("/api/tasks/:id", async (req: Request, res: Response) => {
  const query = { _id: new ObjectId(req.params.id) };

  let response = await collection.deleteOne(query);
  console.log(response);
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log("App listening on 5000");
});

export { app };
