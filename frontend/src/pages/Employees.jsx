import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import EmployeeTable from '../components/employees/EmployeeTable';

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <div className="layout">
        <Sidebar />
        <div className="content">
          <header className="page-header">
            <h1 className="page-title">Employee Management</h1>
            <p style={{ color: 'var(--text-muted)' }}>View, add, and manage your workforce.</p>
          </header>
          <EmployeeTable searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
}
