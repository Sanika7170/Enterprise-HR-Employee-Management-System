import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDept, setNewDept] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios.get('/api/departments')
      .then(res => {
        setDepartments(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  const addDepartment = (e) => {
    e.preventDefault();
    if (!newDept) return;
    axios.post('/api/departments', { name: newDept })
      .then(() => {
        setNewDept('');
        fetchDepartments();
      })
      .catch(err => console.error(err));
  };

  const deleteDepartment = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      axios.delete(`/api/departments/${id}`)
        .then(() => fetchDepartments())
        .catch(err => console.error(err));
    }
  };

  return (
    <>
      <Navbar onSearch={() => {}} />
      <div className="layout">
        <Sidebar />
        <div className="content">
          <header className="page-header">
            <h1 className="page-title">Departments</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage organizational departments and structures.</p>
          </header>

          <div style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Add New Department</h3>
            <form onSubmit={addDepartment} style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Department Name" 
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', outline: 'none' }}
              />
              <button type="submit" className="primary-btn" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Add
              </button>
            </form>
          </div>

          <div className="cards">
            {departments.map((dept) => (
              <div key={dept._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="card-icon" style={{ backgroundColor: '#e0e7ff', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    <Briefcase size={20} />
                  </div>
                  <div style={{ fontWeight: 600 }}>{dept.name}</div>
                </div>
                <button 
                  onClick={() => deleteDepartment(dept._id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {departments.length === 0 && !loading && (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%', padding: '2rem' }}>
                No departments found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
