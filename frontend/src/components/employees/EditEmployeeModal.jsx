import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

export default function EditEmployeeModal({ isOpen, onClose, onRefresh, employee }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    status: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || 'Engineering',
        designation: employee.designation || '',
        status: employee.status || 'Active'
      });
    }
  }, [employee]);

  if (!isOpen || !employee) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/employees/${employee._id}`, formData)
      .then(() => {
        onRefresh();
        onClose();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ fontWeight: 600 }}>Edit Employee</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              required 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select 
              value={formData.department} 
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            >
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>Legal</option>
            </select>
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input 
              type="text" 
              required 
              value={formData.designation} 
              onChange={(e) => setFormData({...formData, designation: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select 
              value={formData.status} 
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="secondary-btn">Cancel</button>
            <button type="submit" className="primary-btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
