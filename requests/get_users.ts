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

//this snippet of code is a GET request that returns a list of users from the user table

//this defines the SQL query inside a GET HTTP request

    app.get("/users", async (req, res) => {
        const dbres = await 
        client.query("SELECT user_name, is_faculty FROM user_list ORDER BY is_faculty DESC, user_name");
    res.json(dbres.rows);
    });
