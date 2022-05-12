import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();
//this snippet of code is a POST request that sends a resource to the study list table

//this defines the SQL query inside a POST HTTP request

router.post("/studylist", async (req, res) => {
  try {
    const insertStudyList = "INSERT into study_list (user_id, resource_id) VALUES ($1, $2) returning *"
    const { user_id, resource_id } = req.body
    console.log('req.body', req.body);
    console.log('user_id', user_id);
    console.log('resource_id', resource_id);
    const addToStudyList = await client.query(
      insertStudyList, [user_id, resource_id]
    );
    res.json(addToStudyList.rows)
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;

