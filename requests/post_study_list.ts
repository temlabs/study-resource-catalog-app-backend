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

//this snippet of code is a POST request that sends a resource to the study list table

//this defines the SQL query inside a POST HTTP request

app.post("/studylist", async (req, res) => {
    try {
      const insertStudyList = "INSERT into study_list (user_id, resource_id) VALUES ($1, $2) returning *"
      const {user_id, resource_id} = req.body
      console.log('req.body', req.body);
      console.log('user_id', user_id);
      console.log('resource_id', resource_id);
      const addToStudyList = await client.query(
        insertStudyList, [user_id, resource_id]
      );
      res.json(addToStudyList.rows)
    } catch (error) {
      console.error();
      res.sendStatus(500);
    }
  });

  