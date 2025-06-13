'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  TextField, 
  IconButton, 
  Paper, 
  Typography,
  AppBar,
  Toolbar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: input }];
    setMessages(newMessages);
    setInput('');

    // TODO: Add API call to your backend here
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'assistant' as const, 
        content: 'Đây là phản hồi mẫu từ chatbot. Bạn cần tích hợp API thực tế vào đây.' 
      }]);
    }, 1000);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            ChatBot
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Chat container */}
      <Container 
        maxWidth="md" 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor: message.role === 'user' ? 'primary.main' : 'grey.100',
                color: message.role === 'user' ? 'white' : 'text.primary',
              }}
            >
              <Typography>{message.content}</Typography>
            </Paper>
          </Box>
        ))}
      </Container>

      {/* Input form */}
      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          p: 2, 
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn của bạn..."
            variant="outlined"
            size="small"
          />
          <IconButton 
            type="submit" 
            color="primary" 
            sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
