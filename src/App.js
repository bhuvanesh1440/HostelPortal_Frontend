// App.js or index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext'; // Import AuthProvider
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';
import Signin from './Components/Signin';

function App() {
  return (
    <AuthProvider>
      <Router basename='/HostelPortal_Frontend'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signin />} />
          <Route path="/home" element={<Sidebar />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
