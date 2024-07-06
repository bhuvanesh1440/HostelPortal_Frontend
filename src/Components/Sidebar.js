import React, { useState } from 'react';
import './Sidebar.css'; // Your custom styles
import 'boxicons/css/boxicons.min.css'; // Boxicons CSS
import PermissionsForm from './PermissionsForm'; // Import the form component
import AdminPermissions from './AdminPermissions';
import ManageStudents from './ManageStudents';
import NotApprovedRequests from './NotApprovedRequests';

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [showPermissionsForm, setShowPermissionsForm] = useState(false);
  const [showAdminPermissionsForm, setShowAdminPermissionsForm] = useState(false);
  const [showManageStudents, setShowManageStudents] = useState(false);
  const [showNotApprovedRequests, setShowNotApprovedRequests] = useState(false);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  const toggleSubMenu = (e) => {
    const arrowParent = e.target.closest('.iocn-link');
    arrowParent.classList.toggle('showMenu');
  };

  const openPermissionsForm = () => {
    setShowPermissionsForm(true);
    setShowAdminPermissionsForm(false);
    setShowManageStudents(false);
    setShowNotApprovedRequests(false);
  };

  const openAdminPermissionsForm = () => {
    setShowPermissionsForm(false);
    setShowAdminPermissionsForm(true);
    setShowManageStudents(false);
    setShowNotApprovedRequests(false);
  };

  const openManageStudents = () => {
    setShowPermissionsForm(false);
    setShowAdminPermissionsForm(false);
    setShowManageStudents(true);
    setShowNotApprovedRequests(false);
  };

  const openNotApprovedRequests = () => {
    setShowPermissionsForm(false);
    setShowAdminPermissionsForm(false);
    setShowManageStudents(false);
    setShowNotApprovedRequests(true);
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
            <a href="#" onClick={openManageStudents}>
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Dashboard</a></li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
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
              <a href="#">
                <i className='bx bx-user'></i>
                <span className="link_name">Profile</span>
              </a>
            </div>
            <ul className="sub-menu">
              <li><a className="link_name" href="#">Profile</a></li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#" onClick={openPermissionsForm}>
                <i className='bx bx-check-shield'></i>
                <span className="link_name">Permissions & Leaves</span>
              </a>
            </div>
            <ul className="sub-menu">
              <li><a className="link_name" href="#" onClick={openPermissionsForm}>Permissions & Leaves</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-home'></i>
              <span className="link_name">Residency</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Residency</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-calendar-check'></i>
              <span className="link_name">Attendance</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Attendance</a></li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className='bx bx-calendar'></i>
              <span className="link_name">Time Table</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#">Time Table</a></li>
            </ul>
          </li>
          <li>
            <a href="#" onClick={openNotApprovedRequests}>
              <i className='bx bx-history'></i>
              <span className="link_name">History</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#" onClick={openNotApprovedRequests}>History</a></li>
            </ul>
          </li>
          <li>
            <a href="#" onClick={openAdminPermissionsForm}>
              <i className='bx bx-cog'></i>
              <span className="link_name">Setting</span>
            </a>
            <ul className="sub-menu blank">
              <li><a className="link_name" href="#" onClick={openAdminPermissionsForm}>Setting</a></li>
            </ul>
          </li>
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

        {showPermissionsForm && <PermissionsForm />}
        {showAdminPermissionsForm && <AdminPermissions />}
        {showManageStudents && <ManageStudents />}
        {showNotApprovedRequests && <NotApprovedRequests />}

      </section>
    </>
  );
};

export default Sidebar;
