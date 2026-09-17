import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function ConfirmDeleteModal({ open, onClose, onConfirm, employeeName }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle sx={{ textAlign: 'center', pt: 2, pb: 1 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: '#fef2f2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 1.5,
          }}
        >
          <WarningAmberIcon sx={{ fontSize: 32 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
          Delete Employee Record?
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center', py: 1 }}>
        <DialogContentText sx={{ color: '#64748b' }}>
          Are you sure you want to remove <strong>{employeeName}</strong>? This operation will remove the record from your JSON storage.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', p: 2, gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#64748b',
            borderColor: '#cbd5e1',
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
            borderRadius: 2,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            bgcolor: '#dc2626',
            '&:hover': { bgcolor: '#b91c1c' },
            textTransform: 'none',
            fontWeight: 600,
            px: 2.5,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
          }}
        >
          Delete Employee
        </Button>
      </DialogActions>
    </Dialog>
  );
}

