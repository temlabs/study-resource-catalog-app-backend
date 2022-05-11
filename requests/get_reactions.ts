import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};
const app = express();
app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler
const client = new Client(dbConfig);
client.connect();

//this snippet of code is a GET request that returns a reaction score for a given resource ID from the reaction table

//this defines the SQL query inside a GET HTTP request

app.get("/", async (req, res) => {
  try {
    const getReaction = "SELECT reaction.resource_id, SUM(reaction.polarity) FROM reaction WHERE reaction.resource_id = ($1) GROUP BY reaction.resource_id"
    const {resource_id} = req.body
    console.log('req.body', req.body);
    console.log('resource_id', resource_id);
    const returnReaction = await client.query(
      getReaction, [resource_id]
    );
    res.json(returnReaction.rows)
  } catch (error) {
    console.error();
    res.sendStatus(500);
  }
});


    