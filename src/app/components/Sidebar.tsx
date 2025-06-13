'use client';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';

const DRAWER_WIDTH = 260;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: DRAWER_WIDTH,
          backgroundColor: 'background.paper',
          borderRadius: 0,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
        <div>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 56 }}>
            <img 
              src="/anhchatbot.png" 
              alt="ChatBot Logo" 
              style={{ height: 36, objectFit: 'contain', display: 'block' }}
            />
            <IconButton onClick={onClose} size="small" sx={{ ml: 1 }}>
              <ViewSidebarOutlinedIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List sx={{ mb: 0, pb: 0 }}>
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
            <Divider />
            {/* Fake chat history items */}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Chat với Bot A" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Chat với Bot B" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Hỗ trợ khách hàng" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Lịch sử hỏi đáp" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <Box sx={{ flexGrow: 1, minHeight: 0 }} />
        <List sx={{ mb: 0, pb: 0 }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ pb: 0, mb: 0 }}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
} 