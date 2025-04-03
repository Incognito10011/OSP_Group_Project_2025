// following these instructions https://www.youtube.com/watch?v=4nKWREmCvsE&ab_channel=MongoDB

import express from "express";
import cors from "cors";
import blogs from "./routes/blogs.js";

// get port from env variables or if its missing just set it to 5050
const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/blogs", blogs);

// start epress server
app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`);
});