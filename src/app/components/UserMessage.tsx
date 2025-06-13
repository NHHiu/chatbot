'use client';

import { Box, Paper, Typography, IconButton, Stack, Tooltip, TextField, Button } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

interface UserMessageProps {
  messageIndex: number; // Index of the message in the parent (ChatPage) messages array
  versions: string[]; // All versions of this message
  onUpdate: (messageIndex: number, newContent: string) => void; // Callback to update parent state
  onVersionChange: (messageIndex: number, newVersionIndex: number) => void;
  currentVersionIndex: number; // This is now a prop, not internal state
}

export default function UserMessage({
  messageIndex, 
  versions, 
  onUpdate, 
  onVersionChange, 
  currentVersionIndex // Destructure from props
}: UserMessageProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // Removed currentVersionIndex state as it's now a prop
  const [editValue, setEditValue] = useState(versions[currentVersionIndex]);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  // Removed Effect to automatically show the latest version, as it's now managed by parent (ChatPage)

  // Effect to update editValue when currentVersionIndex prop or versions prop change
  useEffect(() => {
    setEditValue(versions[currentVersionIndex]);
  }, [versions, currentVersionIndex]); // Dependencies: versions and currentVersionIndex props

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleEditDone = () => {
    setIsEditing(false);
    if (editValue.trim() !== versions[versions.length - 1].trim()) {
      onUpdate(messageIndex, editValue);
    }
  };

  const handleEditCancel = () => {
    setEditValue(versions[currentVersionIndex]); // Revert to current displayed version (from prop)
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent new line in TextField
      handleEditDone();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleEditCancel();
    }
  };

  const handlePreviousVersion = () => {
    const newIndex = Math.max(0, currentVersionIndex - 1); // Use prop for calculation
    onVersionChange(messageIndex, newIndex); // Notify parent
  };

  const handleNextVersion = () => {
    const newIndex = Math.min(versions.length - 1, currentVersionIndex + 1); // Use prop for calculation
    onVersionChange(messageIndex, newIndex); // Notify parent
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: isEditing ? 'md' : 'md',
          width: isEditing ? '100%' : undefined,
          backgroundColor: isEditing ? '#ececec' : 'primary.main',
          color: isEditing ? 'text.primary' : 'white',
          minWidth: 80,
          wordBreak: 'break-word',
        }}
      >
        {isEditing ? (
          <>
            <TextField
              inputRef={inputRef}
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={() => {}}
              onKeyDown={handleEditKeyDown}
              variant="standard"
              fullWidth
              multiline // Allow multiple lines
              InputProps={{
                disableUnderline: true,
                sx: { color: 'text.primary', fontSize: 16, background: 'transparent' },
              }}
              sx={{
                background: 'transparent',
                color: 'text.primary',
                fontSize: 16,
                p: 0,
              }}
            />
            <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'flex-end' }}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleEditCancel}
                sx={{
                  backgroundColor: 'white',
                  color: 'error.main',
                  borderColor: 'error.main',
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: '#fff0f0',
                    borderColor: 'error.main',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleEditDone}
                sx={{
                  backgroundColor: 'error.main',
                  color: 'white',
                  textTransform: 'capitalize',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'error.dark',
                    boxShadow: 'none',
                  },
                }}
              >
                Send
              </Button>
            </Stack>
          </>
        ) : (
          <Typography>{editValue}</Typography>
        )}
      </Paper>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 1, mt: 0.5 }}>
        <Tooltip title={copied ? 'Đã copy!' : 'Sao chép'} placement="top">
          <IconButton size="small" onClick={handleCopy} color={copied ? 'primary' : 'default'}>
            <ContentCopyOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chỉnh sửa" placement="top">
          <IconButton size="small" onClick={handleEdit}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {versions.length > 1 && (
          <>
            <IconButton size="small" onClick={handlePreviousVersion} disabled={currentVersionIndex === 0}>
              <KeyboardArrowLeftIcon fontSize="small" />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {currentVersionIndex + 1}/{versions.length}
            </Typography>
            <IconButton size="small" onClick={handleNextVersion} disabled={currentVersionIndex === versions.length - 1}>
              <KeyboardArrowRightIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Stack>
    </Box>
  );
} 