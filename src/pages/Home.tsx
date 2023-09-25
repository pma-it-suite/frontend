import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeScene from "@/components/ThreeScene";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loginClicked, setLoginClicked] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center">
      <ThreeScene loginClicked={loginClicked} />
      <div className="absolute fade-out pointer-events-none w-screen h-screen bg-black z-40" />
      <div className="absolute">
        {!loginClicked && <div className={`flex flex-col items-center justify-center ${loginClicked ? 'opacity-0' : 'opacity-100'}`}>
          <h1 id="kdns-text" className='text-8xl font-bold p-0 m-0 text-white -mt-20 z-50'>ITx</h1>

          <p className="text-3xl text-center mt-6 mb-10 mx-4 font-bold ">
            An all inclusive IT admin plaform. <a href='https://shellhacks2023.blob.core.windows.net/pkgs/ITX_s.pkg' className='underline cursor-pointer'>Install</a> now.
          </p>
          <button
            onClick={setLoginClicked.bind(null, true)}
            className="px-20 mt-40 py-4 text-black font-semibold bg-white hover:bg-gray-200 rounded opacity-70 shadow-md"
          >
            Login
          </button>
        </div>}
        {loginClicked && <div className={`flex flex-col items-center justify-center ${loginClicked ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <button
              onClick={setLoginClicked.bind(null, false)}
              className="text-white font-semibold bg-blue-500 hover:bg-blue-700 py-2 px-8 rounded"
            >
              Back
            </button>
          </div>
          <h1>Login</h1>
          <div>
            <input
              type="text"
              placeholder="Email"
              className="p-2 w-64 border rounded"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Password"
              className="p-2 w-64 border rounded"
            />
          </div>
          <div>
            <label>Remember me</label>
            <input
              type="checkbox"
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={navigate.bind(null, '/dashboard')}
            className="text-white font-semibold bg-blue-500 hover:bg-blue-700 py-2 px-8 rounded mt-8"
          >
            Login
          </button>
        </div>
        }
      </div>

    </div>
  );
}

export default Home;
