import React, { useState, useRef, useEffect } from 'react';
import useDarkMode from '@/hooks/useDarkMode';
import { ToggleSlider } from 'react-toggle-slider';
import { useLocation } from 'react-router-dom';

interface SidebarItem {
  label: string;
  link: string;
  icon?: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', link: '/admin/dash', icon: <i className="fas fa-home"></i> },
  { label: 'Users', link: '/admin/users', icon: <i className="fas fa-users"></i> },
  { label: 'Compliance', link: '/admin/compliance', icon: <i className="fas fa-book"></i> },
  { label: 'Devices', link: '/admin/devices', icon: <i className="fas fa-computer"></i> },
  { label: 'Preferences', link: '/admin/preferences', icon: <i className="fas fa-gears"></i> }
];

const Sidebar: React.FC = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [tenantName, setTenantName] = useState('My Tenant');
  const location = useLocation();
  const activeRoute = location.pathname;

  const [sidebarWidth, setSidebarWidth] = useState(224);
  const [isResizing, setIsResizing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarRef = useRef(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX - (sidebarRef.current?.getBoundingClientRect().left || 0);
      setSidebarWidth(newWidth);
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  function toggleTenantDropdown(event: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div ref={sidebarRef} className={`w-${collapsed ? '0' : sidebarWidth} relative text-primary p-6 h-screen border-r border-primary pt-10 flex flex-col transition-all duration-200 overflow-hidden`} style={{ width: collapsed ? 66 : sidebarWidth }}>
      <div className='flex flex-row items-center mb-8 relative'>
        <div className="rounded-lg bg-primary w-10 h-10 shadow-sm grid place-content-center" >
          <i className="fas fa-shop text-secondary text-xl grid-span-1 opacity-70"></i>
        </div>
        <button onClick={toggleTenantDropdown} className='opacity-70 cursor-pointer flex items-center'>
          <p className='ml-2'>{tenantName}</p>
          <i className="fas fa-chevron-down ml-2 opacity-80"></i>
        </button>
      </div>
      <ul className="space-y-1 mt-8">
        {sidebarItems.map((item, index) => (
          <a href={item.link} key={index} className={`flex items-center gap-2 min-w-18 transition duration-200 link-underline opacity-60 hover:bg-primary-light cursor-pointer rounded-md ${activeRoute === item.link ? "underlined" : ""}`}>
            {item.icon && <div className='w-10 grid place-content-center p-2'>{item.icon}</div>}
            <p className={`py-2 rounded ml-1 ${collapsed ? 'hidden' : ''}`}>{item.label}</p>
          </a>
        ))}
      </ul>
      <div className="flex flex-row items-center justify-center pt-2 border-primary border-t-2 mt-auto">
        <i className="text-secondary aria-hidden p-2 fa-solid hover:text-primary transition-all duration-200 fa-sun opacity-60" />
        <ToggleSlider active={darkMode} onToggle={state => setDarkMode(state)} draggable={false} barBackgroundColorActive='#51685c' />
        <i className="text-secondary aria-hidden p-2 fa-solid hover:text-primary transition-all duration-200 fa-moon opacity-60" />
      </div>
      {/* <div onMouseDown={handleMouseDown} className="cursor-ew-resize select-none absolute right-0 w-2 h-screen bg-red-300 hover:bg-gray-400"></div> */}
      {/* <button onClick={toggleCollapse} className="absolute -top-2 left-4 mt-4 ml-2 bg-primary w-6 h-6 rounded-full border">
        <i className={`fas fa-chevron-${collapsed ? 'right' : 'left'}`}></i>
      </button> */}
    </div>
  );
};

export default Sidebar;
