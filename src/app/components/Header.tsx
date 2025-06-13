'use client';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import UserAvatar from './UserAvatar';

interface HeaderProps {
  onMenuClick: () => void;
  onNewChat: () => void;
}

export default function Header({ onMenuClick, onNewChat }: HeaderProps) {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open sidebar"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <ViewSidebarOutlinedIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="new chat"
          onClick={onNewChat}
          sx={{ mr: 2 }}
        >
          <EditOutlinedIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: 'primary.main',
            fontWeight: 'bold'
          }}
        >
          Viettel ChatBot
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <UserAvatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
} 