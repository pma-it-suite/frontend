import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const Navbar: React.FC = () => {
    const { user, signOut } = useAuth(); // Replace this line according to your useAuth hook implementation
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <Link to="/" className="mr-4">Home</Link>
            {user ? (
                <>
                    <Link to={`/${user?.type}/dashboard`} className="mr-4">Dashboard</Link>
                    <button onClick={handleLogout}>Sign Out</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;
