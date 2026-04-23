import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

export default function RequestLeaveModal({ isOpen, onClose, onRefresh }) {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee: '',
    type: 'Sick',
    startDate: '',
    endDate: '',
    reason: ''
  });

  useEffect(() => {
    if (isOpen) {
      axios.get('/api/employees')
        .then(res => {
          setEmployees(res.data);
          if (res.data.length > 0) {
            setFormData(prev => ({ ...prev, employee: res.data[0]._id }));
          }
        })
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/leaves', formData)
      .then(() => {
        onRefresh();
        onClose();
        setFormData({ employee: '', type: 'Sick', startDate: '', endDate: '', reason: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ fontWeight: 600 }}>Request Leave</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Employee</label>
            <select 
              required
              value={formData.employee} 
              onChange={(e) => setFormData({...formData, employee: e.target.value})}
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Leave Type</label>
            <select 
              value={formData.type} 
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option>Sick</option>
              <option>Vacation</option>
              <option>Personal</option>
              <option>Other</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Start Date</label>
              <input 
                type="date" 
                required 
                value={formData.startDate} 
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>End Date</label>
              <input 
                type="date" 
                required 
                value={formData.endDate} 
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Reason</label>
            <textarea 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.5rem', outline: 'none', minHeight: '80px' }}
              value={formData.reason} 
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              placeholder="Briefly explain the reason..."
            />
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="secondary-btn">Cancel</button>
            <button type="submit" className="primary-btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
