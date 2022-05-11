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
app.use(express.json()); 
app.use(cors()) 
const client = new Client(dbConfig);
client.connect();

//this snippet of code is a POST request that sends a reaction (up/down vote) to the reaction table

//this defines the SQL query inside a POST HTTP request

app.post("/reaction", async (req, res) => {
    try {
      const insertReaction = "INSERT INTO reaction (resource_id, user_id, polarity) VALUES	($1, $2, $3) returning *"
      const {resource_id, user_id, polarity} = req.body
      console.log('req.body', req.body);
      console.log('resource_id', resource_id);
      console.log('user_id', user_id);
      console.log('polarity', polarity);
      const addNewReaction = await client.query(
        insertReaction, [resource_id, user_id, polarity]
      );
      res.json(addNewReaction.rows)
    } catch (error) {
      console.error();
      res.sendStatus(500);
    }
  });

  