import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

//this snippet of code is a POST request that sends a reaction (up/down vote) to the reaction table

//this defines the SQL query inside a POST HTTP request

router.post("/reaction", async (req, res) => {
  try {
    const insertReaction = "INSERT INTO reaction VALUES	(default, $1, $2, $3) returning *"
    const { resource_id, user_id, polarity } = req.body
    const addNewReaction = await client.query(
      insertReaction, [resource_id, user_id, polarity]
    );
    res.json(addNewReaction.rows)
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router; 
