import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Navbar({ onSearch }) {
  return (
    <nav className="navbar">
      <div className="navbar-search">
        <Search size={18} color="#64748b" />
        <input 
          type="text" 
          placeholder="Search employees..." 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="navbar-profile">
        <button className="icon-btn" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Bell size={20} color="#64748b" />
        </button>
        <div className="avatar">JD</div>
        <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>John Doe</span>
      </div>
    </nav>
  );
}
