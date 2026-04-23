import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Calendar, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8 }}></div>
        <span>Enterprise HR</span>
      </div>
      <ul>
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/employees" className={isActive('/employees') ? 'active' : ''}>
            <Users size={20} />
            <span>Employees</span>
          </Link>
        </li>
        <li>
          <Link to="/departments" className={isActive('/departments') ? 'active' : ''}>
            <Briefcase size={20} />
            <span>Departments</span>
          </Link>
        </li>
        <li>
          <Link to="/leaves" className={isActive('/leaves') ? 'active' : ''}>
            <Calendar size={20} />
            <span>Leaves</span>
          </Link>
        </li>
        <li style={{ marginTop: 'auto' }}>
          <Link to="#">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link to="#" style={{ color: '#ef4444' }}>
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
