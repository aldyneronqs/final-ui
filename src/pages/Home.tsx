import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost } from '../api/SocialMediaApi';
import PostCard from '../components/PostCard';
import type { Post } from '../types/Post';
import { Box, CircularProgress, Typography } from '@mui/material';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleEdit = (post: Post) => {
    navigate(`/edit/${post.id}`, { state: { post } });
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={3}>
      {posts.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="50vh"
        >
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            No posts yet. Be the first to share something!
          </Typography>
        </Box>
      ) : (
        posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </Box>
  );
};

export default Home;
