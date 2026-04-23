import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, UserCheck, Briefcase, Clock } from 'lucide-react';

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    totalDepartments: 0,
    pendingLeaves: 0
  });

  useEffect(() => {
    axios.get('/api/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  const cardData = [
    { title: 'Total Employees', value: stats.totalEmployees, icon: <Users size={24} />, color: '#6366f1', bg: '#e0e7ff' },
    { title: 'Active Now', value: stats.activeEmployees, icon: <UserCheck size={24} />, color: '#10b981', bg: '#d1fae5' },
    { title: 'Departments', value: stats.totalDepartments, icon: <Briefcase size={24} />, color: '#f59e0b', bg: '#fef3c7' },
    { title: 'Pending Leaves', value: stats.pendingLeaves, icon: <Clock size={24} />, color: '#ef4444', bg: '#fee2e2' },
  ];

  return (
    <div className="cards">
      {cardData.map((stat, i) => (
        <div key={i} className="card">
          <div className="card-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
            {stat.icon}
          </div>
          <div className="card-title">{stat.title}</div>
          <div className="card-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
