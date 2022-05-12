import 'pg'
import { Client } from 'pg';


export interface CommentPost {
    user_id: number;
    resource_id: number;
    comment_text: string;
}

export interface Comment extends CommentPost {
    comment_id: number;
}

export default async function getComments(client: Client, resourceId: number): Promise<Comment[]> {
    const getCommentsQuery = 'SELECT * from comment_list WHERE resource_id = $1';
    const getCommentsQueryParams = [resourceId];
    let dbRes;
    dbRes = await client.query(getCommentsQuery, getCommentsQueryParams);
    return dbRes.rows as Comment[];
}
