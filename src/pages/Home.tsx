import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeScene from "@/components/ThreeScene";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.getElementById('background-container')?.classList.add('fade');
    }, 1000); // animation starts after 1 second

    const text1 = document.querySelector('.text-1');
    const text2 = document.querySelector('.text-2');

    const interval = setInterval(() => {
      text1?.classList.toggle('hidden');
      text2?.classList.toggle('hidden');
    }, 2000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <ThreeScene />
      <div className="w-screen h-screen top-0 left-0 absolute flex flex-col items-center justify-center ">
        <h1 id="kdns-text" className='z-[1] text-8xl font-bold p-0 m-0 text-white -mt-20'>IT Suite</h1>
        <div className="absolute fade-out w-screen h-screen bg-black" />
        <p className="text-3xl text-center mt-6 mb-10 mx-4 font-bold z-10">
          An all inclusive IT admin plaform. <a href='' className='underline cursor-pointer'>Install</a> now.
        </p>
      </div>
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
