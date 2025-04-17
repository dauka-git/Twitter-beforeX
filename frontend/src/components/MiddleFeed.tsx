import React, { useState } from 'react';
import { Box, Typography, Divider, Paper, IconButton, Avatar } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import UploadIcon from '@mui/icons-material/Upload';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RepeatSharpIcon from '@mui/icons-material/RepeatSharp';

interface Post {
  id: number;
  username: string;
  lastname: string;
  avatarUrl: string;
  content: string;
  time: string;
  likes: number;
  reposts: number;
  comments: number;
  uploads: number;
}

interface MiddleFeedProps {
  posts: Post[];
}



export const MiddleFeed: React.FC<MiddleFeedProps> = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);

  const handleAction = (postId: number, action: 'likes' | 'reposts' | 'comments' | 'uploads') => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, [action]: post[action] + 1 } : post
      )
    );
  };

  return (
    <Paper sx={{ height: '100%', borderRadius: 0 }}>
      <Typography variant="h6" sx={{ fontWeight:'bold', p: 2, borderBottom: '1px solid #e0e0e0' }}>
        Главная
      </Typography>

      <Box sx={{ position: 'relative', px: 2 }}>
        {posts.map((post) => (
          <Box key={post.id} sx={{ display: 'flex', py: 2 }}>
            <Box sx={{ minWidth: 48, mr: 2 }}>
              <Avatar  src={post.avatarUrl} alt={`${post.username} ${post.lastname}`} sx={{ width: 40, height: 40 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">
                <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                {post.username}
                </Box>
                 <Box component="span" sx={{ fontSize:"12px", color: 'text.secondary' }}>
                   @{post.lastname}
                </Box>
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {post.content}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {post.time}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton color='primary' onClick={() => handleAction(post.id, 'comments')} sx={{ p: 0.5 }}>
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption">{post.comments}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton color='primary' onClick={() => handleAction(post.id, 'uploads')} sx={{ p: 0.5 }}>
                    <UploadIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption">{post.uploads}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton color='primary' onClick={() => handleAction(post.id, 'likes')} sx={{ p: 0.5 }}>
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption">{post.likes}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <IconButton color='primary' onClick={() => handleAction(post.id, 'reposts')} sx={{ p: 0.5 }}>
                    <RepeatSharpIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption">{post.reposts}</Typography>
                </Box>
              </Box>

              <Divider sx={{ width: '100%', mt: 2 }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};
