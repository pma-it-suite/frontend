import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { signIn, user } = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn(username);
      };

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <h1 className="text-4xl font-bold mb-4">IT Suite Login</h1>
            <p className="text-lg text-center mb-10 mx-4">
                Enter your username to log in.
            </p>
            <form className="mb-6 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
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