'use client';

import { Box, Paper, Typography, IconButton, Stack, Tooltip } from '@mui/material';
import MessageSkeleton from './MessageSkeleton';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { useState } from 'react';

interface BotMessageProps {
  content: string;
  isLoading?: boolean;
}

export default function BotMessage({ content, isLoading = false }: BotMessageProps) {
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return <MessageSkeleton />;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: 'md',
          backgroundColor: 'grey.100',
          color: 'text.primary',
        }}
      >
        <Typography>{content}</Typography>
      </Paper>
      <Stack direction="row" spacing={2} sx={{ ml: 1, mt: 0.5 }}>
        <Tooltip title={copied ? 'Đã copy!' : 'Sao chép'} placement="top">
          <IconButton size="small" onClick={handleCopy} color={copied ? 'primary' : 'default'}>
            <ContentCopyOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <IconButton size="small">
          <ThumbUpOffAltOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <ThumbDownOffAltOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <VolumeUpOutlinedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
} 