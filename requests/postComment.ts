import { Client } from "pg";
import { Comment } from "./getComments";

export default async function postComment(client: Client, comment_text: string, resource_id: number, user_id: number): Promise<Comment[]> {
    const insertCommentQuery = 'INSERT INTO comment_list VALUES(DEFAULT, $1, $2, $3 ) returning *';
    const commentQueryParams = [user_id, resource_id, comment_text];
    const dbRes = await client.query(insertCommentQuery, commentQueryParams);
    return dbRes.rows as Comment[]
}