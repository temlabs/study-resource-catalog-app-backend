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

// Get the study list of a particular user
router.get<{id: string},{},{}>("/study-list/:id", async (req, res) => {
    
    try{
        const query = `SELECT resource.author_name, resource.url, resource.description, resource.build_stage, resource.recommendation_nature, resource.recommendation_reason FROM study_list 
                    JOIN resource
                    ON study_list.resource_id = resource.resource_id
                    WHERE study_list.user_id = $1
                    ORDER BY post_date  DESC;`
        const user_id =parseInt(req.params.id)
        const studyList = await client.query(query,[user_id] );

        //checking to see if the result of the query is empty
        if (studyList.rowCount  === 0){
            res.send(400).send("This user does not exist")
        }else {
            res.status(201).send(studyList.rows)
        };
    }
    
    catch(error){
        res.status(400).send(error.stack)
    }
  });
  export default router;