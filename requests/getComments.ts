import { client } from "./../server";
import { Client } from "pg";
client as Client
import express from "express";
import { Comment } from "./utils/interfaces";


const router = express.Router();


export async function getComments(client: Client, resourceId: number): Promise<Comment[]> {
    const getCommentsQuery = 'SELECT * from comment_list JOIN user_list ON comment_list.user_id = user_list.user_id WHERE resource_id = $1';
    const getCommentsQueryParams = [resourceId];
    let dbRes;
    dbRes = await client.query(getCommentsQuery, getCommentsQueryParams);
    return dbRes.rows as Comment[];
}


router.get<{ resourceId: number }, {}, {}>("/comments/:resourceId", async (req, res) => {
    const resourceId = req.params.resourceId;
    if (!resourceId) {
        res.sendStatus(400)
        return;
    }

    try {
        const comments: Comment[] = await getComments(client, resourceId);
        if (comments.length == 0) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json(error.message);
    }
});

export default router;