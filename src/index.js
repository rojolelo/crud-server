import express from "express"
import cors from "cors"
import collection from "./dbconn.js"
import { ObjectId } from "mongodb"

const app = express()

app.use(cors())
app.use(express.json())


app.get("/api/tasks", async (req,res) => {
    let results = await collection.find({})
      .toArray();
    res.send(results).status(200);
})

app.put("/api/tasks/:id", async (req,res) => {
    const query = {_id : new ObjectId(req.params.id)}
    const update = {
        $set : {
            name: req.body.name,
            checked: req.body.checked
        }
    }
    let response = await collection.updateOne(query, update)
    console.log(response)
    res.sendStatus(200)
})

app.post("/api/tasks", async (req,res) => {
    const update = {
        $set : {
            name: req.body.name,
            checked: req.body.checked
        }
    }
    let response = await collection.insertOne(update)
    console.log(response)
    res.sendStatus(200)
})

app.delete("/api/tasks/:id", async (req,res) => {
    const query = { _id : new ObjectId(req.params.id)}

    let response = await collection.deleteOne(query)
    console.log(response)
    res.sendStatus(200)
})

app.listen(5000, () => {
    console.log("App listening on 5000")
})