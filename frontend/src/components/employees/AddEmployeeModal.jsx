import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

export default function AddEmployeeModal({ isOpen, onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    designation: '',
    status: 'Active'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/employees', formData)
      .then(() => {
        onRefresh();
        onClose();
        setFormData({ name: '', email: '', department: 'Engineering', designation: '', status: 'Active' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ fontWeight: 600 }}>Add New Employee</h2>
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
              placeholder="e.g. Alice Johnson"
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="alice@company.com"
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
              placeholder="e.g. Lead Designer"
            />
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="secondary-btn">Cancel</button>
            <button type="submit" className="primary-btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
