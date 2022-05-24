import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
const router = express.Router();

// Get the study list of a particular user
router.get<{ id: string }, {}, {}>("/study-list/:id", async (req, res) => {

    try {
        const query = `SELECT * FROM resource_main 
                    JOIN study_list
                    ON study_list.resource_id = resource_main.resource_id
                    WHERE study_list.user_id = $1
                    ORDER BY post_date  DESC;`
        const user_id = parseInt(req.params.id)
        const studyList = await client.query(query, [user_id]);

        //checking to see if the result of the query is empty
        if (studyList.rowCount === 0) {
            res.status(400).send("This user does not exist or has no resources")
        } else {
            res.status(201).send(studyList.rows)
        };
    }

    catch (error) {
        res.status(500).json(error.message);
    }
});

export default router;