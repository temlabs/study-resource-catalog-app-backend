import express from "express";
import { Client } from "pg";

const app = express();
const client = new Client(dbConfig);


app.get("/resources", async (req, res) => {
    const query = "SELECT * FROM resource ORDER BY post_date  DESC;"
    const dbres = await client.query(query);
    res.json(dbres.rows);
  });