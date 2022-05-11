import express from "express";
import { Client } from "pg";

const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

//const app = express();
const router= express.Router();
const client = new Client(dbConfig);

//Get all resources listed in the table
router.get("/resources", async (req, res) => {
    try{
        const query = `SELECT * FROM resource ORDER BY post_date  DESC;`
        const resources = await client.query(query);
        res.json(resources.rows);
        res.status(200)
        }
        catch(error)
        {
            res.status(400).send(error.stack)
        }
  });
  export default router;