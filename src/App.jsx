import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';

import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFormModal from './components/EmployeeFormModal';
import EmployeeDetailModal from './components/EmployeeDetailModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';

import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  resetEmployees,
} from './redux/employeeSlice';

// Modern Material UI Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

export default function App() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  // Snackbar Notification State
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  // Handlers for Form Modal (Add / Edit)
  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp);
    setIsFormOpen(true);
  };

  const handleSaveEmployee = (formData) => {
    if (editingEmployee) {
      dispatch(updateEmployee(formData));
      showToast(`Employee "${formData.name}" updated successfully!`, 'success');
    } else {
      dispatch(addEmployee(formData));
      showToast(`Employee "${formData.name}" added successfully!`, 'success');
    }
  };

  // Handlers for Viewing Profile Details
  const handleOpenDetailModal = (emp) => {
    setViewingEmployee(emp);
    setIsDetailOpen(true);
  };

  // Handlers for Deleting Employee
  const handleOpenDeleteModal = (emp) => {
    setDeletingEmployee(emp);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingEmployee) {
      dispatch(deleteEmployee(deletingEmployee.id));
      showToast(`Employee "${deletingEmployee.name}" deleted.`, 'info');
      setIsDeleteOpen(false);
      setDeletingEmployee(null);
    }
  };

  // Reset sample JSON data
  const handleResetData = () => {
    dispatch(resetEmployees());
    showToast('Employee dataset reset to initial JSON state.', 'warning');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
        {/* Navigation Bar */}
        <Navbar onOpenAddModal={handleOpenAddModal} onResetData={handleResetData} />

        {/* Main Dashboard Container */}
        <Container maxWidth="xl" sx={{ py: 4, flexGrow: 1 }}>
          {/* Quick Metrics Cards */}
          <StatsCards employees={employees} />

          {/* Employee Master Table */}
          <EmployeeTable
            onView={handleOpenDetailModal}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        </Container>

        {/* Form Modal (Add / Edit) */}
        <EmployeeFormModal
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveEmployee}
          initialData={editingEmployee}
        />

        {/* Detail View Modal */}
        <EmployeeDetailModal
          open={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          employee={viewingEmployee}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
          employeeName={deletingEmployee?.name || ''}
        />

        {/* Action Toast Notification */}
        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={handleCloseToast}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseToast} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
