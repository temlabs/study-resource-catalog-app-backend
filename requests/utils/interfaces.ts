export interface CommentPost {
    user_id: number;
    resource_id: number;
    comment_text: string;
}

export interface Comment extends CommentPost {
    comment_id: number;
}


export interface ResourcePost {
    user_id: number
    resource_name: string
    author_name: string
    url: string
    description: string
    tags: string[]
    content_name: string
    build_stage: string
    recommendation_nature: string
    recommendation_reason: string
}

export interface Resource extends ResourcePost {
    resource_id: number;
}

export interface ResourceFull extends ResourcePost {

}