import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

//this snippet of code is a GET request that returns a reaction score for a given resource ID from the reaction table

//this defines the SQL query inside a GET HTTP request

router.get("/reaction/:resource_id", async (req, res) => {
  try {
    const getReaction = "SELECT reaction.resource_id, SUM(reaction.polarity) FROM reaction WHERE reaction.resource_id = ($1) GROUP BY reaction.resource_id"
    const { resource_id } = req.params
    console.log('req.body', req.params);
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

export default router;
