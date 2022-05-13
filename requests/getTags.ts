import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

//Get all tags that are available
router.get("/tags",  async function (req, res) {
    try{
        const query = `SELECT tag_name FROM tag_name 
        ORDER BY tag_name;`
        const resources = await client.query(query);
        res.json(resources.rows);
        res.status(200)
        }
        catch(error)
        {
            res.status(500).json(error.message);
        }
  });
  
  export default router;
