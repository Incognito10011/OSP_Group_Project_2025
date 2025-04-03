import express from "express";

// this will help connect to the db
import db from "../db/connection.js"

// this will convert the id from  string to obj for the id
import { ObjectId } from "mongodb";
// router is an instance of the express router. we use it to define our routes
// the router will be added as middleware and will take control of requests starting with path /blogs.

const router = express.Router();

// this section will help you get a list of all the blogs (in mongodb, under BlogProj, under collections)
router.get("/", async (req, res) => {
    let collection = await db.collection("blogs");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
    });

// this section will help you get a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("blogs");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
    });

// this section creates a record,
router.post ("/", async (req, res) => {
try {
    let newDocument = {
    title: req.body.title,
    category: req.body.category,
    blogbody: req.body.blogbody,
    };
    let collection = await db.collection("blogs");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
}   catch (err) {
}   console.error(err);
    res.status(500).send("Error adding blog")
});

// this section is for updating an existing blog
router.patch("/:id", async (req, res) => {
try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
      title: req.body.title,
      writer: req.body.writer,
      category: req.body.category,
      blogbody: req.body.blogbody,
      },
    };

    let collection = await db.collection("blogs");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
}   catch (err) {
    console.error(err);
    res.status(500).send("Error updating blog");
    }
});

// this section will delete a blog
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("blogs");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
