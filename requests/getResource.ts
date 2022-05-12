import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

//Get all resources listed in the table
router.get("/resources",  async function (req, res) {
    try{
        const query = `SELECT * FROM resource_main ORDER BY post_date  DESC;`
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