import { MongoClient, ServerApiVersion } from "mongodb";
// supposed to load the .env file into process.env
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.ATLAS_URI;

if (!uri) {
  throw new Error("Missing ATLAS_URI in .env");
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});


//async function added, allows the await command to work, should.
async function connectToDatabase() {
try {
    // connect client to the server
    await client.connect();
    //send a ping to confirm successful connection
    await client.db("admin").command({ ping: 1 });-
    console.log(
    "pinged your deployment. you successfully conted to mongoDB!"
    );
} catch(err) {
  console.error(err);
}
}
// in mongo db, this is the name of the collection, under the tab "collections"
let db = client.db("BlogProj");

export default db;