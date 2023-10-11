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
        <nav className="p-5 absolute text-black text-lg font-medium z-10 flex flex-row backdrop-blur-xl shadow-md mt-6 rounded-md w-11/12">
            <Link to="/" className="mr-4">

                Home
            </Link>
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
