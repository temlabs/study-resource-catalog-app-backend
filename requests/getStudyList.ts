import express from "express";
import { Client } from "pg";

const app = express();
const client = new Client(dbConfig);


app.get("/study-list", async (req, res) => {
    const query = `SELECT resource.author_name, resource.url, resource.description, resource.build_stage, resource.recommendation_nature, resource.recommendation_reason FROM study_list 
    JOIN resource
    ON study_list.resource_id = resource.resource_id
    WHERE study_list.user_id = $1
    ORDER BY post_date  DESC;`
    const user_id 
    const dbres = await client.query(query, );
    res.json(dbres.rows);
  });