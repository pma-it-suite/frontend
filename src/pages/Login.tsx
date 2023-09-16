import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/check`, {
                params: {
                    username
                },
                validateStatus(status) {
                    return (status >= 200 && status < 300) || status === 404;
                },
            });

            if (response.data.status === 'OK') {
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Save to local storage
                if (response.data.user.type === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/dashboard');
                }
            } else {
                alert('Username is not valid');
            }
        } catch (error) {
            console.error('Error while checking username:', error);
            alert('An error occurred while checking the username.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="text-4xl font-bold mb-4">IT Suite Login</h1>
            <p className="text-lg text-center mb-10 mx-4">
                Enter your username to log in.
            </p>
            <form className="mb-6 flex flex-col items-center justify-center" onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 w-64 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white font-semibold bg-blue-500 hover:bg-blue-700 py-2 px-8 rounded mt-8"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;