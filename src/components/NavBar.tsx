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
        <nav className="p-4 absolute text-black z-10 w-screen flex flex-row">
            <Link to="/" className="mr-4">Home</Link>
            {user ? (
                <>
                    <Link to={`/${user?.type}/dashboard`} className="mr-4">Dashboard</Link>
                    <button className='ml-auto' onClick={handleLogout}>Sign Out</button>
                </>
            ) : (
                <Link className='ml-auto' to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;
