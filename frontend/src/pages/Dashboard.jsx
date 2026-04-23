import React from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DashboardCards from '../components/dashboard/DashboardCards';

export default function Dashboard() {
  return (
    <>
      <Navbar onSearch={() => {}} />
      <div className="layout">
        <Sidebar />
        <div className="content">
          <header className="page-header">
            <h1 className="page-title">Enterprise Overview</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here's a high-level look at your organization.</p>
          </header>
          <DashboardCards />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Activity Chart Placeholder
            </div>
            <div className="card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Recent Notifications Placeholder
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
