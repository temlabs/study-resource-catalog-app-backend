import { client } from "./../server";
import { Client } from "pg";
client as Client
import { Comment, CommentPost } from "./utils/interfaces";
import express from "express";



const router = express.Router();

export async function postComment(client: Client, comment_text: string, resource_id: number, user_id: number): Promise<Comment[]> {
    const insertCommentQuery = 'INSERT INTO comment_list VALUES(DEFAULT, $1, $2, $3 ) returning *';
    const commentQueryParams = [user_id, resource_id, comment_text];
    const dbRes = await client.query(insertCommentQuery, commentQueryParams);
    return dbRes.rows as Comment[]
}



router.post<{}, {}, CommentPost>("/comments", async (req, res) => {
    const { resource_id, comment_text, user_id }: { resource_id: number, comment_text: string, user_id: number } = req.body
    const commentIsEmpty = comment_text === "";
    if (commentIsEmpty || !resource_id || !user_id || !comment_text) {
        res.sendStatus(400)
        return;
    }

    try {
        const postedComment: Comment[] = await postComment(client, comment_text, resource_id, user_id);
        res.status(201).json(postedComment);
    } catch (error) {
        if ((error.detail as string).includes("not present")) {
            res.status(500).json("A resource id or user id was not present in the database");
            return;
        }
        res.status(500).json(error.message);
        return;
    }
});

export default router;