import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Avatar,
  InputAdornment,
  Stack,
  Card,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonOffIcon from '@mui/icons-material/PersonOff';

import { setSearchQuery, setFilterDepartment, setFilterStatus } from '../redux/employeeSlice';

const getStatusChipProps = (status) => {
  switch (status) {
    case 'Active':
      return { label: 'Active', bg: '#dcfce7', text: '#15803d' };
    case 'On Leave':
      return { label: 'On Leave', bg: '#fef3c7', text: '#b45309' };
    case 'Inactive':
      return { label: 'Inactive', bg: '#f1f5f9', text: '#64748b' };
    default:
      return { label: status, bg: '#f1f5f9', text: '#64748b' };
  }
};

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

export default function EmployeeTable({ onView, onEdit, onDelete }) {
  const dispatch = useDispatch();
  const { employees = [], searchQuery = '', selectedDepartment = 'All', selectedStatus = 'All' } = useSelector(
    (state) => state.employee || {}
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const departmentOptions = ['All', ...new Set(employees.map((emp) => emp.department))];
  const statusOptions = ['All', 'Active', 'On Leave', 'Inactive'];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      (emp.name || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      (emp.email || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      (emp.id || '').toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      (emp.role || '').toLowerCase().includes((searchQuery || '').toLowerCase());

    const matchesDepartment =
      selectedDepartment === 'All' || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
      {/* Filters Bar */}
      <Box sx={{ p: 2.5, backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5} size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, email, ID, or role..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: '#ffffff', borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={6} md={3.5} size={{ xs: 6, md: 3.5 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="dept-label">Department</InputLabel>
              <Select
                labelId="dept-label"
                value={selectedDepartment}
                label="Department"
                onChange={(e) => dispatch(setFilterDepartment(e.target.value))}
                sx={{ bgcolor: '#ffffff' }}
              >
                {departmentOptions.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={3.5} size={{ xs: 6, md: 3.5 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="st-label">Status</InputLabel>
              <Select
                labelId="st-label"
                value={selectedStatus}
                label="Status"
                onChange={(e) => dispatch(setFilterStatus(e.target.value))}
                sx={{ bgcolor: '#ffffff' }}
              >
                {statusOptions.map((st) => (
                  <MenuItem key={st} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Table Content */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 700 }} aria-label="employee table">
          <TableHead sx={{ bgcolor: '#f1f5f9' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Department</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Salary</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: '#475569' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => {
                const chipProps = getStatusChipProps(emp.status);
                const nameInitials = (emp.name || '')
                  .split(' ')
                  .map((n) => n[0])
                  .join('');

                return (
                  <TableRow key={emp.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: stringToColor(emp.name),
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            width: 38,
                            height: 38,
                          }}
                        >
                          {nameInitials}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                            {emp.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {emp.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={emp.id}
                        size="small"
                        sx={{
                          bgcolor: '#f8fafc',
                          color: '#334155',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          border: '1px solid #cbd5e1',
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ color: '#334155', fontWeight: 500 }}>{emp.department}</TableCell>
                    <TableCell sx={{ color: '#334155' }}>{emp.role}</TableCell>

                    <TableCell sx={{ color: '#0f172a', fontWeight: 600 }}>
                      ${parseFloat(emp.salary || 0).toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.4,
                          borderRadius: 4,
                          backgroundColor: chipProps.bg,
                          color: chipProps.text,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      >
                        {chipProps.label}
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => onView(emp)}
                            sx={{ color: '#2563eb', '&:hover': { bgcolor: '#eff6ff' } }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit Employee">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(emp)}
                            sx={{ color: '#d97706', '&:hover': { bgcolor: '#fffbeb' } }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Employee">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(emp)}
                            sx={{ color: '#dc2626', '&:hover': { bgcolor: '#fef2f2' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <PersonOffIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                      No employees found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search or filter options.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: '1px solid #e2e8f0', bgcolor: '#fafafa' }}
      />
    </Card>
  );
}
