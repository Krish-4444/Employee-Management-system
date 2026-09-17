# 💼 Employee Management System

A modern, responsive, and full-featured **Employee Management System** built with **React**, **Redux Toolkit** for state management, **Material UI (MUI)** for UI components, and **JSON Storage** (`localStorage` persisted and initialized with structured JSON seed data).

---

## 🚀 Features

- **Full CRUD Operations**:
  - **Create**: Add new employees with dynamic field validations (Name, Email format, Phone, Department, Role, Salary, Date of Joining, Status).
  - **Read**: View master employee list with department tags, avatars, salary, and status indicators. Includes detailed profile viewer modal.
  - **Update**: Edit existing employee records with pre-filled forms.
  - **Delete**: Remove employee records with a safety confirmation dialog.
- **JSON Storage & Persistence**:
  - Initial dataset seeded from `src/data/initialEmployees.json`.
  - All additions, updates, and deletions automatically persist to browser `localStorage` as JSON (`JSON.stringify`/`JSON.parse`).
  - Includes a **"Reset Data"** option to revert state back to the original seed JSON.
- **Metrics Dashboard**:
  - Dynamic summary cards displaying Total Employees, Active Staff count, Department count, and Total Monthly Payroll.
- **Live Search & Filtering**:
  - Real-time search across Name, Email, Employee ID, or Role.
  - Filter by Department and Employment Status (Active, On Leave, Inactive).
  - Built-in pagination and clean empty states.
- **100% Material UI (MUI) Design**:
  - Custom theme configuration (`ThemeProvider`), responsive layout containers, styled avatars, action badges, tooltips, and interactive dialogs.
  - Real-time action feedback via MUI `Snackbar` notifications.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **UI Framework**: Material UI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Data Persistence**: JSON Storage via `localStorage` initialized with `src/data/initialEmployees.json`

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. **Clone or navigate to the project folder**:
   ```bash
   git clone https://github.com/Krish-4444/Employee-Management-system
   cd Employee-Management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173` (or the port indicated in your terminal, e.g., `http://localhost:5174`).

---

## 📦 Build for Production

To generate a production-ready static bundle:

```bash
npm run build
```

To preview the built production bundle locally:
```bash
npm run preview
```

---

## 📄 Employee Data Schema

Each employee record stored in JSON format contains the following fields:

```json
{
  "id": "EMP-001",
  "name": "Employee",
  "email": "example@gamil.com",
  "phone": "+91 1010010101",
  "department": "Engineering",
  "role": "Senior Full Stack Developer",
  "salary": "15000",
  "joinDate": "2026-01-01",
  "status": "Active"
}
```
