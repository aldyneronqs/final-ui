// src/types/Post.ts
export interface Post {
    id?: number;
    content: string;
    imageUrl?: string;  // Made optional
    author: string;
    authorAvatar?: string;
    likes?: number;
    comments?: number;
    shares?: number;
    createdAt?: string;
    updatedAt?: string;
}