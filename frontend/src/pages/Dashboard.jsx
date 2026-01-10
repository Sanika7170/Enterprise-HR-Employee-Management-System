
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DashboardCards from '../components/dashboard/DashboardCards';
import EmployeeTable from '../components/employees/EmployeeTable';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="content">
          <DashboardCards />
          <EmployeeTable />
        </div>
      </div>
    </>
  );
}
