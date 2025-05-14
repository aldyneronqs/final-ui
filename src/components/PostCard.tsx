import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Avatar,
  CardHeader,
  CardActions,
  Divider,
  Button,
  Tooltip,
} from '@mui/material';
import {
  ThumbUp,
  ChatBubbleOutline,
  Share,
  Edit,
  Delete,
} from '@mui/icons-material';
import { type Post } from '../types/Post';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
  const isYouTube = post.imageUrl && isYouTubeUrl(post.imageUrl);
  const youtubeId = isYouTube ? getYouTubeId(post.imageUrl!) : null;

  return (
    <Card
      sx={{
        maxWidth: '100%',
        mb: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        backgroundColor: '#fff',
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: stringToColor(post.author) }}
            src={post.authorAvatar}
            alt={post.author}
          >
            {post.author.charAt(0)}
          </Avatar>
        }
        action={
          <Box>
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit(post)}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => onDelete(post.id!)}>
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        }
        title={post.author}
        subheader={
          post.createdAt
            ? formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })
            : 'Unknown time'
        }
        sx={{
          pb: 1,
          '& .MuiCardHeader-title': {
            fontWeight: 600,
            fontSize: '0.95rem',
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '0.8rem',
            color: '#65676B',
          },
        }}
      />

      {/* Content */}
      <CardContent
        sx={{
          pt: 0,
          pb: post.imageUrl ? 1.5 : 2,
          px: 2,
          backgroundColor: !post.imageUrl ? '#f9f9f9' : 'inherit',
          borderRadius: !post.imageUrl ? '0 0 12px 12px' : 'inherit',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: '0.95rem',
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            color: !post.imageUrl ? '#333' : 'inherit',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: post.imageUrl ? 'flex-start' : 'center',
            textAlign: post.imageUrl ? 'left' : 'center',
            p: !post.imageUrl ? 2 : 0,
          }}
        >
          {post.content}
        </Typography>
      </CardContent>

      {/* Media */}
      {isYouTube && youtubeId && (
        <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
          <Box
            component="iframe"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: 1,
            }}
          />
        </Box>
      )}

      {!isYouTube && post.imageUrl && (
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt="Post media"
          sx={{
            maxHeight: 500,
            width: '100%',
            objectFit: 'contain',
            backgroundColor: '#000',
          }}
        />
      )}

      {/* Reactions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          color: '#65676B',
          fontSize: '0.8125rem',
        }}
      >
        <Box display="flex" alignItems="center">
          <ThumbUp sx={{ fontSize: 16, mr: 0.5 }} />
          <span>42</span>
        </Box>
        <Box>
          <span>24 comments · 5 shares</span>
        </Box>
      </Box>

      <Divider />

      {/* Action Buttons */}
      <CardActions sx={{ justifyContent: 'space-between', px: 1 }}>
        {['Like', 'Comment', 'Share'].map((label, i) => (
          <Button
            key={label}
            startIcon={
              i === 0 ? <ThumbUp /> : i === 1 ? <ChatBubbleOutline /> : <Share />
            }
            sx={{
              flex: 1,
              color: '#65676B',
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            {label}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
};

// -----------------
// Helper functions
// -----------------
function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function isYouTubeUrl(url: string): boolean {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

function getYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default PostCard;
