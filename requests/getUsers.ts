import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();
//this snippet of code is a GET request that returns a list of users from the user table

//this defines the SQL query inside a GET HTTP request

router.get("/users", async (req, res) => {
  try {
    const dbres = await
      client.query("SELECT user_name, is_faculty, user_id FROM user_list ORDER BY is_faculty DESC, user_name");
    res.json(dbres.rows);

  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;