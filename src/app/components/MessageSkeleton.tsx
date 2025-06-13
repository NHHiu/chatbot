'use client';

import { Box, Paper, Skeleton } from '@mui/material';

export default function MessageSkeleton() {
  return (
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
  );
} 