import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

router.get("/content-type", async (req, res) => {
  try {
    const data = await client.query('select * from content_type');
    res.json(data.rows);
  } catch (error) {
    console.error(error)
    res.status(500).json(error.message);
  }
});

export default router;