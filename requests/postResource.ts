import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();
import { Resource, ResourcePost } from './utils/interfaces'

router.post<{}, {}, ResourcePost>("/resource", async (req, res) => {
  const { user_id, resource_name, author_name, url, description, build_stage, recommendation_nature, recommendation_reason, content_name, tags } = req.body;
  const insertResourceQuery = 'insert into resource values (default, $1,$2,$3,$4,$5 ,default,$6, $7, $8) returning *'
  const insertResourceParams = [user_id, resource_name, author_name, url, description, build_stage, recommendation_nature, recommendation_reason]
  const insertContentQuery = 'insert into content_link  values(default,(select content_id from content_type where content_name = $1),(select resource_id from resource where URL = $2) )'
  const insertContentParams = [content_name, url]
  const insertTagsQuery = 'insert into tag_link  values(default,(select tag_id from tag_name where tag_name = $1), (select resource_id from resource where URL = $2))'
  //const insertTagsParams = [newResource.tags, newResource.url]

  try {
    const createdResource = await client.query(insertResourceQuery, insertResourceParams)
    tags.forEach(async (tag) => { return (await client.query(insertTagsQuery, [tag, url])) })
    await client.query(insertContentQuery, insertContentParams)

    createdResource.rows as Resource[]

    res.status(200).json(createdResource.rows)

  } catch (err) {
    console.log(`error:${err.message}`)
    res.status(500).json(err.message);

  }

})

export default router;