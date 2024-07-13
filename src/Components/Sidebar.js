import React, { useState } from 'react';
import './Sidebar.css'; // Your custom styles
import 'boxicons/css/boxicons.min.css'; // Boxicons CSS
import { useAuth } from './AuthContext'; // Import the useAuth hook
import PermissionsForm from './PermissionsForm'; // Import the form component
import ManageStudents from './ManageStudents';
import AdminPermissions from './AdminPermissions';
import NotApprovedRequests from './NotApprovedRequests';
import NotReturned from './NotReturned';
import Reports from './reporttable';
import Registration from './Admin_Registration'; // Import the Registration component

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // State to manage active tab
  const { authState } = useAuth(); // Get the authState from the context

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ManageStudents />;
      case 'notifications':
        return <Registration />; // Render the Registration component under Notifications
      case 'profile':
        return <div>Profile</div>; // Placeholder for Profile component
      case 'permissions':
        return authState.role === 'student' ? <PermissionsForm /> : null;
      case 'residency':
        return <div>Residency</div>; // Placeholder for Residency component
      case 'attendance':
        return <div>Attendance</div>; // Placeholder for Attendance component
      case 'timetable':
        return <NotReturned />; // Placeholder for Time Table component
      case 'history':
        return <NotApprovedRequests />;
      case 'settings':
        return <AdminPermissions />;
      case 'reports':
        return <Reports />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`sidebar ${isClosed ? 'close' : ''}`}>
        <div className="logo-details">
          <img src="/images/Nec.png" alt="Logo" className="logo-img" width="60px" />
          <span className="logo_name"></span>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#" onClick={() => setActiveTab('dashboard')}>
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Dashboard</a></li>
            </ul>
          </li>
          {authState.role === 'student' ? (
            <li>
              <div className="iocn-link">
                <a href="#" onClick={() => setActiveTab('permissions')}>
                  <i className='bx bx-check-shield'></i>
                  <span className="link_name">Permissions & Leaves</span>
                </a>
              </div>
              <ul className="sub-menu">
                <li><a className="link_name" href="#">Permissions & Leaves</a></li>
              </ul>
            </li>
          ) : (
            <>
              <li>
                <div className="iocn-link">
                  <a href="#" onClick={() => setActiveTab('notifications')}>
                    <i className='bx bx-bell'></i>
                    <span className="link_name">Notifications</span>
                  </a>
                </div>
                <ul className="sub-menu">
                  <li><a className="link_name" href="#">Notifications</a></li>
                </ul>
              </li>
              <li>
                <div className="iocn-link">
                  <a href="#" onClick={() => setActiveTab('profile')}>
                    <i className='bx bx-user'></i>
                    <span className="link_name">Profile</span>
                  </a>
                </div>
                <ul className="sub-menu">
                  <li><a className="link_name" href="#">Profile</a></li>
                </ul>
              </li>
              <li>
                <a href="#" onClick={() => setActiveTab('residency')}>
                  <i className='bx bx-home'></i>
                  <span className="link_name">Residency</span>
                </a>
                <ul className="sub-menu blank">
                  <li><a className="link_name" href="#">Residency</a></li>
                </ul>
              </li>
              <li>
                <a href="#" onClick={() => setActiveTab('attendance')}>
                  <i className='bx bx-calendar-check'></i>
                  <span className="link_name">Attendance</span>
                </a>
                <ul className="sub-menu blank">
                  <li><a className="link_name" href="#">Attendance</a></li>
                </ul>
              </li>
              <li>
                <a href="#" onClick={() => setActiveTab('timetable')}>
                  <i className='bx bx-calendar'></i>
                  <span className="link_name">Time Table</span>
                </a>
                <ul className="sub-menu blank">
                  <li><a className="link_name" href="#">Time Table</a></li>
                </ul>
              </li>
              <li>
                <a href="#" onClick={() => setActiveTab('history')}>
                  <i className='bx bx-history'></i>
                  <span className="link_name">History</span>
                </a>
                <ul className="sub-menu blank">
                  <li><a className="link_name" href="#">History</a></li>
                </ul>
              </li>
              <li>
                <a href="#" onClick={() => setActiveTab('reports')}>
                  <i className='bx bx-cog'></i>
                  <span className="link_name">Setting</span>
                </a>
                <ul className="sub-menu blank">
                  <li><a className="link_name" href="#">Setting</a></li>
                </ul>
              </li>
            </>
          )}
          <li>
            <div className="profile-details">
              <div className="name-job">
                <div className="profile_name">Bhuvanesh</div>
                <div className="job">Student</div>
              </div>
              <i className='bx bx-log-out'></i>
            </div>
          </li>
        </ul>
      </div>

      <section className="home-section">
        <div className="home-content">
          <i className='bx bx-menu' onClick={toggleSidebar}></i>
          <span className="text">NEC - STUDENT</span>
        </div>

        {renderTab()}

      </section>
    </>
  );
};

export default Sidebar;
