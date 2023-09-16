import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to IT Suite</h1>
      <p className="text-lg text-center mb-10 mx-4">
        Your Ultimate Mobile Device Management Software.
      </p>
      <button 
        onClick={goToLogin} 
        className="text-white font-semibold bg-blue-500 hover:bg-blue-700 py-2 px-8 rounded"
      >
        Login
      </button>
    </div>
  );
}

export default Home;
