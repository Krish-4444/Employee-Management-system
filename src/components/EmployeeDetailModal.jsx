import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
  Grid,
  Divider,
  Paper,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';

const stringToColor = (string) => {
  if (!string) return '#2563eb';
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

export default function EmployeeDetailModal({ open, onClose, employee }) {
  if (!employee) return null;

  const initials = employee.name
    ? employee.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : 'EM';

  const details = [
    { label: 'Employee ID', value: employee.id, icon: <BadgeIcon sx={{ color: '#2563eb' }} /> },
    { label: 'Department', value: employee.department, icon: <BusinessIcon sx={{ color: '#9333ea' }} /> },
    { label: 'Role / Position', value: employee.role, icon: <WorkIcon sx={{ color: '#0284c7' }} /> },
    { label: 'Email Address', value: employee.email, icon: <EmailIcon sx={{ color: '#059669' }} /> },
    { label: 'Phone Number', value: employee.phone || 'N/A', icon: <PhoneIcon sx={{ color: '#ea580c' }} /> },
    {
      label: 'Annual Salary',
      value: `$${parseFloat(employee.salary || 0).toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ color: '#16a34a' }} />,
    },
    { label: 'Date Joined', value: employee.joinDate, icon: <CalendarMonthIcon sx={{ color: '#db2777' }} /> },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
          Employee Profile
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: '#64748b' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {/* Header Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: stringToColor(employee.name),
              fontSize: '1.5rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
              {employee.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
              {employee.role}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Chip
                label={employee.status}
                size="small"
                color={
                  employee.status === 'Active'
                    ? 'success'
                    : employee.status === 'On Leave'
                    ? 'warning'
                    : 'default'
                }
                sx={{ fontWeight: 600 }}
              />
              <Chip label={employee.department} size="small" variant="outlined" sx={{ fontWeight: 500 }} />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Detailed Info Grid */}
        <Grid container spacing={2}>
          {details.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: '#f8fafc',
                  borderRadius: 2,
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box sx={{ p: 1, bgcolor: '#ffffff', borderRadius: 1.5, display: 'flex', border: '1px solid #e2e8f0' }}>
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 500 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                    {item.value}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, bg: '#f8fafc' }}>
        <Button onClick={onClose} variant="contained" sx={{ textTransform: 'none', px: 3, borderRadius: 2 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

