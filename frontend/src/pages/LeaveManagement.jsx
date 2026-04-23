import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { Calendar, Check, X, Clock, Plus } from 'lucide-react';
import RequestLeaveModal from '../components/leaves/RequestLeaveModal';

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = () => {
    axios.get('/api/leaves')
      .then(res => {
        setLeaves(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const updateStatus = (id, status) => {
    axios.patch(`/api/leaves/${id}`, { status })
      .then(() => fetchLeaves())
      .catch(err => console.error(err));
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="content">
          <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 className="page-title">Leave Management</h1>
              <p style={{ color: 'var(--text-muted)' }}>Review and manage employee leave requests.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="primary-btn" 
              style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={18} /> Request Leave
            </button>
          </header>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave._id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{leave.employee?.name || 'Unknown'}</div>
                    </td>
                    <td>{leave.type}</td>
                    <td>
                      <div style={{ fontSize: '0.875rem' }}>
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td>
                      {leave.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => updateStatus(leave._id, 'Approved')}
                            style={{ background: 'var(--success)', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                          >
                            <Check size={14} />
                          </button>
                          <button 
                            onClick={() => updateStatus(leave._id, 'Rejected')}
                            style={{ background: 'var(--danger)', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {leaves.length === 0 && !loading && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>
                      <Clock size={48} color="var(--border)" style={{ marginBottom: '1rem' }} />
                      <div style={{ color: 'var(--text-muted)' }}>No leave requests found.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <RequestLeaveModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchLeaves} 
      />
    </>
  );
}
