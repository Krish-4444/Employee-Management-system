import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function Navbar({ onOpenAddModal, onResetData }) {
  return (
    <AppBar position="sticky" elevation={2} sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo & Brand Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
              }}
            >
              <BadgeIcon sx={{ color: '#fff', fontSize: 26 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.02rem',
                  color: '#f8fafc',
                  fontSize: '1.25rem',
                  lineHeight: 1.2,
                }}
              >
                EmpTrack Pro
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                Employee Management System
              </Typography>
            </Box>
            <Chip
              label="JSON + Redux"
              size="small"
              sx={{
                ml: 1,
                bgcolor: 'rgba(59, 130, 246, 0.15)',
                color: '#60a5fa',
                borderColor: 'rgba(96, 165, 250, 0.3)',
                borderWidth: 1,
                borderStyle: 'solid',
                fontWeight: 600,
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            />
          </Box>

          {/* Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Tooltip title="Reset sample JSON data">
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<RestartAltIcon />}
                onClick={onResetData}
                sx={{
                  color: '#cbd5e1',
                  borderColor: 'rgba(203, 213, 225, 0.3)',
                  '&:hover': {
                    borderColor: '#f8fafc',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  textTransform: 'none',
                  borderRadius: 2,
                  display: { xs: 'none', sm: 'inline-flex' },
                }}
              >
                Reset Data
              </Button>
            </Tooltip>

            <Tooltip title="Reset sample JSON data">
              <IconButton
                color="inherit"
                onClick={onResetData}
                sx={{ display: { xs: 'inline-flex', sm: 'none' }, color: '#cbd5e1' }}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onOpenAddModal}
              sx={{
                bgcolor: '#2563eb',
                '&:hover': { bgcolor: '#1d4ed8' },
                fontWeight: 600,
                textTransform: 'none',
                px: 2.5,
                py: 0.9,
                borderRadius: 2,
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
              }}
            >
              Add Employee
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

