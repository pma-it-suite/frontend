import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommandPalette from './CommandPalette';
import NotificationButton from './NotificationButton';

const Header: React.FC = () => {
    return (
        <div className='p-10 w-full flex flex-row items-center'>
            {/* search / command pallete */}
            <div className='w-3/4' >
                <CommandPalette />
            </div>
            {/* feedback icon button */}
            <button className='flex flex-row items-center ml-auto bg-primary px-4 py-2 rounded shadow-sm text-secondary hover:bg-primary-light'>
                <div className="text-primary opacity-60 flex-row flex">
                    <svg width="20" height="20" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M26.001 7.353a2.75 2.75 0 0 0-3.459-2.657L4.046 9.63a2.75 2.75 0 0 0-2.042 2.658v3.427a2.75 2.75 0 0 0 2.042 2.657L7 19.159v.341a4.5 4.5 0 0 0 8.56 1.942l6.982 1.862a2.75 2.75 0 0 0 3.459-2.657V7.353Zm-3.072-1.207A1.25 1.25 0 0 1 24.5 7.353v13.294a1.25 1.25 0 0 1-1.572 1.208L4.432 16.92a1.25 1.25 0 0 1-.928-1.207v-3.428c0-.566.381-1.061.928-1.207L22.93 6.146Zm-8.857 14.899A3 3 0 0 1 8.5 19.559l5.572 1.486Z" fill="currentColor" />
                    </svg>
                    Feedback
                </div>
            </button>
            {/* notifications with badge */}
            <div className='ml-2'>
                <NotificationButton />
            </div>
        </div>
    );
};

export default Header;
