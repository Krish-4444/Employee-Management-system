import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function StatsCards({ employees = [] }) {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const departments = new Set(employees.map((e) => e.department)).size;
  const totalPayroll = employees.reduce((acc, e) => acc + (parseFloat(e.salary) || 0), 0);

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: <PeopleIcon sx={{ color: '#2563eb', fontSize: 28 }} />,
      bg: '#eff6ff',
      borderColor: '#bfdbfe',
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      icon: <CheckCircleIcon sx={{ color: '#16a34a', fontSize: 28 }} />,
      bg: '#f0fdf4',
      borderColor: '#bbf7d0',
    },
    {
      title: 'Departments',
      value: departments,
      icon: <BusinessIcon sx={{ color: '#9333ea', fontSize: 28 }} />,
      bg: '#faf5ff',
      borderColor: '#e9d5ff',
    },
    {
      title: 'Total Monthly Payroll',
      value: `$${(totalPayroll / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      icon: <AttachMoneyIcon sx={{ color: '#d97706', fontSize: 28 }} />,
      bg: '#fffbeb',
      borderColor: '#fde68a',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${stat.borderColor}`,
              backgroundColor: '#ffffff',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: stat.bg,
                    width: 52,
                    height: 52,
                    borderRadius: 2.5,
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
