'use client';

import { IconButton, Paper, Box, InputBase, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ChatInput({ 
  input, 
  isLoading, 
  onInputChange, 
  onSubmit 
}: ChatInputProps) {
  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        component="form"
        onSubmit={onSubmit}
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '24px',
          boxShadow: '0 1px 6px 0 rgba(60,72,88,0.08)',
          px: 2,
          py: 0.5,
          width: '100%',
        }}
      >
        <IconButton sx={{ mr: 1 }} size="large">
          <AddIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: 18 }}
          placeholder="Nhập tin nhắn của bạn..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={isLoading}
          inputProps={{ 'aria-label': 'chat input' }}
        />
        <IconButton sx={{ mx: 1 }} size="large">
          <MicIcon />
        </IconButton>
        <IconButton
          type="submit"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': { backgroundColor: 'primary.dark' },
            ml: 1,
            width: 40,
            height: 40,
            borderRadius: '50%',
          }}
          disabled={isLoading}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Container>
  );
} 