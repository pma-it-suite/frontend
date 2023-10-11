// NotificationButton.tsx
import React, { useState } from 'react';

const NotificationButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const unreadNotifications = 5;  // Sample count

    // Sample notifications data
    const notifications = [
        'Notification 1',
        'Notification 2',
        'Notification 3'
        // ... add more notifications as required
    ];

    return (
        <div className="relative ml-2">
            <button onClick={() => setIsOpen(!isOpen)} className="relative">
                {/* Notification Icon */}
                <i className="fas fa-bell text-2xl mt-2 opacity-60"></i>

                {/* Badge */}
            {unreadNotifications > 0 && (
                    <div className="absolute top-0 -right-2 px-1 bg-red-500 text-white text-xs rounded-full">
                        {unreadNotifications}
                    </div>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute mt-2 w-64 border rounded shadow-lg bg-primary right-0 z-50">
                    <ul>
                        {notifications.map((notification, index) => (
                            <li key={index} className="p-2 hover:bg-primary-light border-b">
                                {notification}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotificationButton;
