'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNewChat = () => {
    // TODO: Implement new chat functionality
    console.log('Create new chat');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Sidebar 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header 
          onMenuClick={() => setIsDrawerOpen(true)} 
          onNewChat={handleNewChat}
        />
        {children}
      </Box>
    </Box>
  );
} 