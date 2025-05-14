import { Box, Typography, Avatar, Tabs, Tab } from '@mui/material';
import PostCard from '../components/PostCard';
import { useState } from 'react';

export const Profile = () => {
  const [tabValue, setTabValue] = useState(0);

  // Mock user data
  const user = {
    name: 'Aldyne Ronquillo',
    username: 'aldyneronqs',
    bio: 'Digital creator | Photography enthusiast',
    posts: 24,
    followers: 1024,
    following: 56,
    avatarUrl: 'https://scontent.fmnl8-4.fna.fbcdn.net/v/t39.30808-1/440233826_3610259385905161_3698015648048059644_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=BfWG_y_4U-sQ7kNvwHXNcz2&_nc_oc=AdlEM7xhjCYB11XBCISh5YoMg3oyWwCjHTAws1OEDZKCj0mi-M-0co0nDd_GFWloaJA&_nc_zt=24&_nc_ht=scontent.fmnl8-4.fna&_nc_gid=zX7vuG8jYc8LkDczeLviBw&oh=00_AfJ81Wik0KanKF3Qc1IrkuZmlTsTEL9FXpS-wB7cL-eSsg&oe=68293669',
  };

  // Mock posts
  const posts = [
    {
      id: 1,
      content: 'Enjoying the weekend!',
      imageUrl: 'https://picsum.photos/600/600',
      author: 'aldyneronqs',
      likes: 42,
    },
    {
      id: 2,
      content: 'New project coming soon...',
      imageUrl: 'https://picsum.photos/600/600?grayscale',
      author: 'aldyneronqs',
      likes: 89,
    },
  ];

  return (
    <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
      {/* Profile Header */}
      <Box sx={{ display: 'flex', p: 3, gap: 4, alignItems: 'center' }}>
        <Avatar src={user.avatarUrl} sx={{ width: 100, height: 100 }} />
        <Box>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            @{user.username}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {user.bio}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
            <Typography>
              <strong>{user.posts}</strong> posts
            </Typography>
            <Typography>
              <strong>{user.followers}</strong> followers
            </Typography>
            <Typography>
              <strong>{user.following}</strong> following
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        centered
        sx={{ borderTop: 1, borderColor: 'divider' }}
      >
        <Tab label="Posts" />
        <Tab label="Saved" />
        <Tab label="Tagged" />
      </Tabs>

      {/* Posts Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onEdit={() => {}} onDelete={() => {}} />
        ))}
      </Box>
    </Box>
  );
};
