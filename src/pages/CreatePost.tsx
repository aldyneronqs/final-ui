import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/SocialMediaApi';
import PostForm from '../components/PostForm';
import type { Post } from '../types/Post';

const CreatePost = () => {
    const navigate = useNavigate();

    const handleSubmit = async (post: Post) => {
        try {
            await createPost(post);
            navigate('/');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return <PostForm onSubmit={handleSubmit} />;
};

export default CreatePost;