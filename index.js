import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

const apiKey = "";

app.use(express.static("public"));

app.get("/", async (req,res)  => {
    res.render("index.ejs");
});

app.listen(port, ()  => {
    console.log(`Listening on port ${port}`);
});