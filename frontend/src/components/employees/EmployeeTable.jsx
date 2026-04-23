import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MoreVertical, Trash2, Edit } from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';

export default function EmployeeTable({ searchTerm }) {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('/api/employees')
      .then(res => {
        setEmployees(res.data);
        setFilteredEmployees(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = employees.filter(emp => 
        emp.name.toLowerCase().includes(lowercasedSearch) ||
        emp.email.toLowerCase().includes(lowercasedSearch) ||
        emp.department.toLowerCase().includes(lowercasedSearch) ||
        emp.designation.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchTerm, employees]);

  const deleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`/api/employees/${id}`)
        .then(() => fetchEmployees())
        .catch(err => console.error(err));
    }
  };

  const openEditModal = (emp) => {
    setEditingEmployee(emp);
    setIsEditModalOpen(true);
    setActiveMenu(null);
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading employees...</div>;

  return (
    <div className="table-container">
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontWeight: 600 }}>Employee Directory</h3>
        <button 
          className="primary-btn" 
          onClick={() => setIsAddModalOpen(true)}
          style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}
        >
          Add Employee
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp._id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.75rem' }}>
                    {emp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{emp.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.email}</div>
                  </div>
                </div>
              </td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>
                <span className={`badge badge-${emp.status.toLowerCase()}`}>
                  {emp.status}
                </span>
              </td>
              <td style={{ position: 'relative' }}>
                <button 
                  onClick={() => setActiveMenu(activeMenu === emp._id ? null : emp._id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <MoreVertical size={16} />
                </button>
                {activeMenu === emp._id && (
                  <div style={{ 
                    position: 'absolute', 
                    right: '1.5rem', 
                    top: '2.5rem', 
                    background: 'white', 
                    border: '1px solid var(--border)', 
                    borderRadius: '0.5rem', 
                    boxShadow: 'var(--shadow-lg)', 
                    zIndex: 20,
                    minWidth: '120px'
                  }}>
                    <button 
                      onClick={() => openEditModal(emp)}
                      style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => deleteEmployee(emp._id)}
                      style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddEmployeeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onRefresh={fetchEmployees} 
      />

      <EditEmployeeModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onRefresh={fetchEmployees}
        employee={editingEmployee}
      />
    </div>
  );
}
