import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

//this snippet of code is a GET request that returns a reaction score for a given resource ID from the reaction table

//this defines the SQL query inside a GET HTTP request

router.delete("/study-list/:user_id/:resource_id", async (req, res) => {
  try {
    const deleteFromStudyList = "DELETE FROM study_list WHERE user_id = ($1) AND resource_id=$2 RETURNING *"
    const { user_id, resource_id } = req.params
    const returnDelete = await client.query(
        deleteFromStudyList, [user_id, resource_id]
        
    );
    res.status(201).json(returnDelete.rows)
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
