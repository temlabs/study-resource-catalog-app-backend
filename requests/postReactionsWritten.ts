import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

//this snippet of code is a POST request that sends a reaction (up/down vote) to the reaction table

//this defines the SQL query inside a POST HTTP request

router.post("/reaction", async (req, res) => {
  try {
    const insertReaction = "INSERT INTO reaction (resource_id, user_id, polarity) VALUES	($1, $2, $3) returning *"
    const { resource_id, user_id, polarity } = req.body
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

export default router; 
