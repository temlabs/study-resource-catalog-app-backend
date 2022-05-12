import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); 

const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();
const router= express.Router();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();


router.get("/content-type", async (req, res) => {
    try {
      const data = await client.query('select * from content_type');
      res.json(data.rows);
    } catch (error) {
      console.error(error)
      res.sendStatus(500);
    }
  });

  export default router;