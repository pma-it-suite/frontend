import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const subscriptionId = user.subscription_id;
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/subscriptions/`, {
        params: { subscription_id: subscriptionId }
      });

      if (response.data.status === 'OK') {
        setUsers(response.data.users);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 py-2 px-4">Username</th>
            <th className="w-1/3 py-2 px-4">Email</th>
            <th className="w-1/3 py-2 px-4">Subscription ID</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{user.username}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.subscription_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
