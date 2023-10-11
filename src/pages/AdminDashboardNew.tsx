import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { URL } from '../util/constants';
import Sidebar from '@/components/SideBar';
import Header from '../components/Header';
import { Routes, Route, Navigate, } from "react-router-dom";
import Dashboard from './AdminSubpages/Dashboard';
import Users from './AdminSubpages/Users';
import Devices from './AdminSubpages/Devices';
import Compliance from './AdminSubpages/Compliance';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-row w-full bg-secondary dark:bg-theme bg-center bg-cover">
        {/* sidebar */}
        <Sidebar />
        <div className='flex flex-col w-full'>
          <Header />
          <Routes>
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/users" element={<Users/>} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/devices" element={<Devices />} />
          </Routes>
        </div>
    </div>
  );
};

export default AdminDashboard;
