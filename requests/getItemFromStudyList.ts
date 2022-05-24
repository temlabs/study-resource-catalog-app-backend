import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

// Get the study list of a particular user
router.get("/study-list/:user_id/:resource_id", async (req, res) => {

    try {
        const query = `SELECT * FROM study_list 
                    
                    WHERE user_id = $1
                    AND resource_id = $2;`
        const {user_id, resource_id} = req.params
        const studyList = await client.query(query, [user_id, resource_id]);

        //checking to see if the result of the query is empty
        if (studyList.rowCount === 0) {
            res.status(400).send("This user does not exisit or has no resources")
        } else {
            res.status(201).send(studyList.rows)
        };
    }

    catch (error) {
        res.status(500).json(error.message);
    }
});

export default router;