import { Box, Skeleton } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-start' }}>
      <Box sx={{ maxWidth: '70%' }}>
        <Skeleton variant="rounded" width={200} height={60} />
      </Box>
    </Box>
  );
} 