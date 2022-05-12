import express from "express";
import { Client } from "pg";
import { config } from "dotenv";
import cors from "cors";
config();



const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();
const router= express.Router();
const client = new Client(dbConfig);
client.connect();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

//Get all resources listed in the table
router.get("/resources",  async function (req, res) {
    try{
        const query = `SELECT * FROM resource ORDER BY post_date  DESC;`
        const resources = await client.query(query);
        res.json(resources.rows);
        res.status(200)
        }
        catch(error)
        {
            res.status(400).send(error.stack)
        }
  });
  export default router;


  //Trying to wrtie it as an async function to then be called by server
//   export async function getResource(app, client){
//         app.get("/resources",  async (req, res) =>{
//             try{
//             const query = `SELECT * FROM resource ORDER BY post_date  DESC;`
//             const resources = await client.query(query);
//             const resourceRows=res.json(resources.rows);
//             return resourceRows
//             } catch(error){
//                             res.status(400).send(error.stack)
//                         }
//                   });
        
//   }