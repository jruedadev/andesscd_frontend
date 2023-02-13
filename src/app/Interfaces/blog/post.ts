export interface Post {
    id: number,
    user_id: number,
    title: String,
    content: String,
    short_description: String,
    banner: String | null | ArrayBuffer,
    author: any,
    created_at: String,
    updated_at: String
}
