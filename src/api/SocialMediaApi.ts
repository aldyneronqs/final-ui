import axios from 'axios';
import type { Post } from '../types/Post';

const API_URL = 'http://localhost:8080/api/posts';

export const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getPostById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
    const response = await axios.post(API_URL, post);
    return response.data;
};

export const updatePost = async (id: number, post: Post) => {
    const response = await axios.put(`${API_URL}/${id}`, post);
    return response.data;
};

export const deletePost = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};