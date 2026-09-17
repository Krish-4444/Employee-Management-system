import { createSlice } from '@reduxjs/toolkit';
import initialEmployees from '../data/initialEmployees.json';

const LOCAL_STORAGE_KEY = 'ems_employees_data';

// Helper function to load initial data safely from JSON storage (localStorage)
const loadEmployeesFromStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return initialEmployees;
  }
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load employees from local storage JSON:', error);
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialEmployees));
  } catch (e) {
    // Ignore storage quota or disabled error
  }
  return initialEmployees;
};

// Helper function to persist employees back to JSON storage
const saveEmployeesToStorage = (employees) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
  } catch (error) {
    console.error('Failed to persist employees to local storage JSON:', error);
  }
};

const initialState = {
  employees: loadEmployeesFromStorage(),
  searchQuery: '',
  selectedDepartment: 'All',
  selectedStatus: 'All',
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const newEmp = {
        ...action.payload,
        id: action.payload.id || `EMP-${Date.now().toString().slice(-4)}`,
      };
      state.employees.unshift(newEmp);
      saveEmployeesToStorage(state.employees);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...action.payload };
        saveEmployeesToStorage(state.employees);
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      saveEmployeesToStorage(state.employees);
    },
    resetEmployees: (state) => {
      state.employees = initialEmployees;
      saveEmployeesToStorage(initialEmployees);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  resetEmployees,
  setSearchQuery,
  setFilterDepartment,
  setFilterStatus,
} = employeeSlice.actions;

export default employeeSlice.reducer;
