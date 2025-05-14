import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { updatePost } from '../api/SocialMediaApi';
import PostForm from '../components/PostForm';
import type { Post } from '../types/Post';
import { useEffect, useState } from 'react';

const EditPost = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const [initialPost, setInitialPost] = useState<Post | null>(null);

    useEffect(() => {
        if (location.state?.post) {
            setInitialPost(location.state.post);
        } else {
            navigate('/');
        }
    }, [location, navigate]);

    const handleSubmit = async (post: Post) => {
        try {
            if (id) {
                await updatePost(parseInt(id), post);
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!initialPost) return null;

    return <PostForm onSubmit={handleSubmit} initialValues={initialPost} isEditing />;
};

export default EditPost;