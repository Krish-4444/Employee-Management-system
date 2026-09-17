import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DEPARTMENT_OPTIONS = [
  'Engineering',
  'Design',
  'Human Resources',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'IT Support',
];

const STATUS_OPTIONS = ['Active', 'On Leave', 'Inactive'];

const initialFormState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  department: 'Engineering',
  role: '',
  salary: '',
  joinDate: new Date().toISOString().split('T')[0],
  status: 'Active',
};

export default function EmployeeFormModal({ open, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(initialData && initialData.id);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || 'Engineering',
        role: initialData.role || '',
        salary: initialData.salary || '',
        joinDate: initialData.joinDate || new Date().toISOString().split('T')[0],
        status: initialData.status || 'Active',
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address format';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role / Designation is required';
    }

    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Please enter a valid positive salary';
    }

    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>
          {isEditMode ? 'Edit Employee Details' : 'Add New Employee'}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: '#64748b' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                label="Department *"
                name="department"
                value={formData.department}
                onChange={handleChange}
                size="small"
              >
                {DEPARTMENT_OPTIONS.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Role / Designation *"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={Boolean(errors.role)}
                helperText={errors.role}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Annual Salary ($) *"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                error={Boolean(errors.salary)}
                helperText={errors.salary}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date of Joining *"
                name="joinDate"
                type="date"
                value={formData.joinDate}
                onChange={handleChange}
                error={Boolean(errors.joinDate)}
                helperText={errors.joinDate}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                label="Status *"
                name="status"
                value={formData.status}
                onChange={handleChange}
                size="small"
              >
                {STATUS_OPTIONS.map((st) => (
                  <MenuItem key={st} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, bg: '#f8fafc' }}>
          <Button onClick={onClose} sx={{ color: '#64748b', textTransform: 'none', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#2563eb',
              '&:hover': { bgcolor: '#1d4ed8' },
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
            }}
          >
            {isEditMode ? 'Save Changes' : 'Create Employee'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
