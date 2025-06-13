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
  Toolbar,
  Skeleton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton as MuiIconButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const DRAWER_WIDTH = 280;

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // TODO: Add API call to your backend here
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'assistant' as const, 
        content: 'Đây là phản hồi mẫu từ chatbot. Bạn cần tích hợp API thực tế vào đây.' 
      }]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Drawer */}
      <Drawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: DRAWER_WIDTH,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Chat History
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="New Chat" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Clear History" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            <MuiIconButton
              color="inherit"
              edge="start"
              onClick={() => setIsDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </MuiIconButton>
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
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Skeleton variant="text" width={200} height={20} />
                <Skeleton variant="text" width={250} height={20} />
                <Skeleton variant="text" width={180} height={20} />
              </Paper>
            </Box>
          )}
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
              disabled={isLoading}
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
              disabled={isLoading}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
} 