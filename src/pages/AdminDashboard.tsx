import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newUserType, setNewUserType] = useState('user');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleAddUser = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      username: newUsername,
      type: newUserType,
      tenant_id: user.tenant_id,
      subscription_id: user.subscription_id
    };
    console.log(data);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/`, data);

    if (response.data.status === 'OK') {
      // Refresh the list of users after successfully adding a new user
      setUsers([...users, response.data.newUser]);
    }
  };

  const batchCommand = async (user_id: string, command: string) => {
    console.log(user_id, command);
    const data = {
      user_id,
      name: "shellCmd",
      args: command
    };
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/commands/batch`, data);
    if (response.data.status === 'OK') {
      console.log(response.data);
    } else {
      alert('Error sending command');
    }
  }

  const handleSubmit = (e, userId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const command = formData.get("command");
    batchCommand(userId, command as string);
  };

  useEffect(() => {
    const fetchData = async () => {
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
    <div className="mx-auto p-6 pt-20 h-full flex flex-col items-center">
      <h1 className="text-8xl font-bold mb-6">Your Devices</h1>
      <div className='flex flex-row items-center'>
        <h2 className="bg-gray-500 text-sm text-gray-100 font-light px-6 rounded-full mb-2">Tenant: {user.tenant_id}</h2>
        <h2 className="bg-gray-500 text-gray-100 font-light px-6 rounded-full text-sm ml-10 mb-2">Subscription: {user.subscription_id}</h2>
      </div>


      <table className="min-w-full bg-white mt-4 p-6 rounded-xl shadow-lg border-none">
        <thead className="bg-gray-800 rounded-xl text-white">
          <tr>
            <th className="w-1/3 py-2 px-4">Username</th>
            <th className="w-1/3 py-2 px-4">Type</th>
            <th className="w-1/3 py-2 px-4">Id</th>
            <th className="w-1/3 py-2 px-4">Devices</th>
            <th className="w-1/3 py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 rounded-lg">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{user?.username}</td>
              <td className="py-2 px-4 border">{user?.type}</td>
              <td className="py-2 px-4 border">{user?._id}</td>
              <td className="py-2 px-4 border">
                {user?.devices?.map((deviceId) => (
                  <div key={deviceId}>
                    <li>
                      <Link className='underline' to={`/device/${deviceId}`}>{deviceId}</Link>
                    </li>
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border">
                {user?.devices?.length && <form onSubmit={(e) => handleSubmit(e, user._id)} className='flex flex-row'>
                  <input
                    name="command"
                    type="text"
                    className="mr-2 p-1 rounded-md border-gray-200 border-2"
                    placeholder="Enter command"
                  />
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded-md ml-">
                    Batch
                  </button>
                </form>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        onSubmit={handleAddUser}
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center mt-10"
      >
        <h2 className="text-2xl mt-6 mb-4 text-gray-700 mx-auto font-bold">Create a User</h2>
        <label htmlFor="newUsername" className="block text-sm font-medium text-gray-600 mb-2">
          New Username
        </label>
        <input
          type="text"
          id="newUsername"
          placeholder="Enter new username"
          className="mt-1 p-2 w-full border rounded-md mb-4"
          value={newUsername}
          onChange={e => setNewUsername(e.target.value)}
        />

        <label htmlFor="newUserType" className="block text-sm font-medium text-gray-600 mb-2">
          User Type
        </label>
        <select
          id="newUserType"
          className="mt-1 p-2 w-full border rounded-md mb-4"
          value={newUserType}
          onChange={e => setNewUserType(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
