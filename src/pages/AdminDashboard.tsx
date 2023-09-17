import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newUserType, setNewUserType] = useState('user');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [dataLoaded, setDataLoaded] = useState(false);

  const [buttonStatus, setButtonStatus] = useState('Run');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending...';
      case 'in_progress':
        return 'In Progress...';
      case 'finished':
        return 'Done';
      default:
        return 'Update';
    }
  };

  const batchCommand = async (user_id, command) => {
    try {
      const data = { user_id, name: 'shellCmd', args: command };
      const response = await axios.post('http://172.178.91.48:5001/commands/batch', data);

      if (response.data.status === 'OK') {
        const commandId = response.data.newCommands[0]._id;

        setButtonDisabled(true);
        setButtonStatus('Pending...');

        const interval = setInterval(async () => {
          const statusResponse = await axios.get(`http://172.178.91.48:5001/commands/status?command_id=${commandId}`);
          setButtonStatus(getStatusText(statusResponse.data))

          if (statusResponse.data === 'finished') {
            clearInterval(interval);
            setButtonDisabled(false);
            setButtonStatus('Run');
          }
        }, 1000);

      } else {
        alert('Error sending command');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  const handleSubmit = (e, userId) => {
    const formData = new FormData(e.target);
    const command = formData.get('command');
    if (command.length > 1) {
      e.preventDefault();
      batchCommand(userId, command);
    } else {
      alert('Please enter a command');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const subscriptionId = user.subscription_id;
      const response = await axios.get(`http://172.178.91.48:5001/subscriptions/`, {
        params: { subscription_id: subscriptionId }
      });

      if (response.data.status === 'OK') {
        setUsers(response.data.users);
        setDataLoaded(true);
        console.log(dataLoaded)
      }
    };

    fetchData();
  }, []);
  return (
    <div className="mx-auto p-6 pt-40 h-full flex flex-col items-center">
      <h1 className="text-8xl font-bold mb-6">Your Devices</h1>
      <div className='flex flex-row items-center'>
        <h2 className="bg-gray-400 text-sm text-gray-100 font-light px-6 rounded-full">Tenant: {user.tenant_id}</h2>
        <h2 className="bg-gray-400 text-gray-100 font-light px-6 rounded-full text-sm ml-10">Subscription: {user.subscription_id}</h2>
      </div>
      <div className={`transition-opacity duration-700 ease-in-out ${dataLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <table className={`min-w-full table-auto bg-white mt-12 p-6 rounded-xl shadow-2xl border-none opacity-100 ease-in-out transition-opacity duration-700`}>
          <thead className="text-black rounded-xl text-left">
            <tr className='font-medium font-4xl border-b-2'>
              <th className="p-6 rounded-tl-xl uppercase tracking-widest font-normal">Member</th>
              <th className="p-6 rounded-tl-xl uppercase tracking-widest font-normal">Devices</th>
              <th className="p-6 rounded-tl-xl uppercase tracking-widest font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="py-2 p-4 border-t capitalize"> {/* Added border-b */}
                  <div className='flex flex-row items-center p-1'>
                    <p className='text-lg'>{user?.username}</p>
                    <p className={`ml-2 text-sm rounded-full text-white ${user?.type == 'admin' ? 'bg-red-400' : 'bg-blue-400'} px-3`}>{user?.type}</p>
                  </div>
                  {/* <h2 className="bg-gray-400 text-sm text-gray-100 font-light px-6 rounded-full mt-1">User: {user?._id}</h2> */}
                </td>
                <td className="py-2 p-4 rounded ">
                  {user?.devices?.length &&
                    <form onSubmit={(e) => handleSubmit(e, user._id)} className='flex flex-row items-center bg-gray-900 p-2 rounded-md'>
                      <span className="text-green-400 font-mono">$ </span>
                      <input
                        name="command"
                        type="text"
                        className="flex-grow mr-2 p-1 rounded-md bg-gray-900 text-white placeholder-gray-300 focus:bg-gray-900 font-mono border-none focus:outline-0 focus:ring-0"
                        placeholder="Enter command"
                        disabled={buttonDisabled}
                        min={1}
                      />
                      <button type="submit" className={`p-2 font-mono rounded-md text-sm w-36 ${buttonDisabled ? 'bg-gray-400' : 'bg-blue-500'} text-white`} >
                        {buttonStatus}
                      </button>
                    </form>
                  }
                </td>
                <td className="py-2 p-4 flex flex-row items-center"> {/* Added border-b */}
                  {user?.devices?.map((device) => (
                    <div key={device.device_id} className='flex flex-col items-center m-3 border-2 p-6 rounded-lg shadow-lg'>
                      <h1 className='text-sm font-bold'>{device.name}</h1>
                      <img src={device.imageUrl} alt={device.name} className="w-36 mt-6" />
                      <button className="bg-blue-500 text-white w-36 py-2 rounded-md mt-8">
                        Update
                      </button>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
