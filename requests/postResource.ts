
import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();


interface PostResource{
    user_name: string
    user_id: number
    rescource_name: string
    author_name: string
    url: string
    description: string
    tags: string[]
    content_name: string
    build_stage: string
    recommendation_nature: string
    recommendation_reason: string



}



app.post("/resource", async (req ,res) => {
    const newResource: PostResource = req.body
    const insertResourceQuery = 'insert into resource values (default, $1,$2,$3,$4,$5 ,default,$6, $7, $8)'
    const insertResourceParams =  [ newResource.user_id, newResource.rescource_name, newResource.author_name, newResource.url, newResource.description,  newResource.build_stage, newResource.recommendation_nature, newResource.recommendation_reason]
    const insertContentQuery = 'insert into content_link  values(default,(select content_id from content_type where content_name = $1),(select resource_id from resource where URL = $2) )'
    const insertContentParams = [newResource.content_name, newResource.url] 
    const insertTagsQuery = 'insert into tag_link  values(default,(select tag_id from tag_name where tag_name = $1), (select resource_id from resource where URL = $2))'
    //const insertTagsParams = [newResource.tags, newResource.url]
    newResource.tags.forEach((tag) => console.log(tag))
    try {
        await client.query( insertResourceQuery , insertResourceParams)
        newResource.tags.forEach( async (tag) => {return  (await client.query(insertTagsQuery,[tag, newResource.url]))})
        await client.query(insertContentQuery,insertContentParams)
        
        
        res.sendStatus(200).json('')
        return
    } catch (err) {
        console.log(`error:${err.message}`)
        res.sendStatus(500)
        
    }

})




//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});