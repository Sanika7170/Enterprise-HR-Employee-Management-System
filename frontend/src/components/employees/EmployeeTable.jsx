
import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  useEffect(()=>{
    api.get('/employees').then(res=>setEmployees(res.data));
  },[]);

  return (
    <table className="table">
      <thead>
        <tr><th>Name</th><th>Department</th><th>Status</th></tr>
      </thead>
      <tbody>
        {employees.map(e=>(
          <tr key={e._id}>
            <td>{e.name}</td>
            <td>{e.department}</td>
            <td>{e.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
