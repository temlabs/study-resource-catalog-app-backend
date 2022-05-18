import axios from "axios"
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

    // discord test
    const webhook = "https://discord.com/api/webhooks/975679258213105734/PxV1iOASTM1h7Lw52OL8_xbqT4OeIvy_ilqCSw39hd4mnn2bbR11SG9dKw3Wz9bEFKLx"

    axios.post(webhook, 
      {
        
          "username": "New Resource",
          "avatar_url": "https://cdn.pixabay.com/photo/2016/09/12/09/51/abc-1663383_960_720.png",
          "content": "New Content Alert!!!!",
          "embeds": [
            {
              "author": {
                "name": author_name,
                "url": "https://gist.github.com/Birdie0/78ee79402a4301b1faf412ab5f1cdcf9",
                "icon_url": null
              },
              "title": resource_name,
              "url": `https://${url}`,
              "description": description,
              "color": 15258703,
              "fields": [
                {
                  "name": "Content Type",
                  "value": content_name,
                  "inline": true
                },
                {
                  "name": "Build Stage",
                  "value": build_stage,
                  "inline": false
                },
                {
                  "name": "Recommendation Nature",
                  "value": recommendation_nature,
                  "inline": false
                },
                {
                  "name": "Recommendation Reason",
                  "value": recommendation_reason,
                  "inline": false
                }
                
              ],
              "thumbnail": {
                "url": null
              },
              "image": {
                "url": null
              },
              "footer": {
                "text":null,
                "icon_url": null
              }
            }
          ]
        }
      
      )
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        //console.log(error);
      });

  } catch (err) {
    console.log(`error:${err.message}`)
    res.status(500).json(err.message);

  }

})

export default router;