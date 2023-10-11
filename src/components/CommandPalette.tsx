import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import useDarkMode from '@/hooks/useDarkMode';

const CommandPalette: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [matchedResults, setMatchedResults] = useState<any[]>([]);
    const paletteRef = useRef(null);
    const { darkMode, setDarkMode } = useDarkMode();
    const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(null);

    const commands = [
        { type: 'navigate', name: 'Navigate to Users', path: '/admin/users', icon: <i className="fas fa-users col-span-1"></i> },
        { type: 'navigate', name: 'Navigate to Dashboard', path: '/admin/dash', icon: <i className="fas fa-home col-span-1"></i> },
        { type: 'navigate', name: 'Navigate to Compliance', path: '/admin/compliance', icon: <i className="fas fa-book col-span-1"></i> },
        { type: 'navigate', name: 'Navigate to Devices', path: '/admin/devices', icon: <i className="fas fa-computer col-span-1"></i> },
        { type: 'toggleDarkMode', name: 'Toggle Dark Mode', icon: <i className="fas fa-adjust col-span-1"></i> }
    ];

    const fuse = new Fuse(commands, {
        keys: ['name'],
        includeScore: true
    });

    const handleCommandClick = (command: any) => {
        switch (command.type) {
            case 'navigate':
                window.location.href = command.path;
                setQuery('');
                break;
            case 'toggleDarkMode':
                setDarkMode(!darkMode);
                setQuery('');
                break;
            default:
                console.warn('Unknown command type', command.type);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K to open the command palette
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
            if (e.key === 'Enter' && matchedResults.length && selectedResultIndex !== null) {
                console.log('Enter on ', selectedResultIndex)
                handleCommandClick(matchedResults[selectedResultIndex]);
            }
            if (e.key === 'ArrowDown') {
                setSelectedResultIndex(prev => {
                    if (prev === null || prev === matchedResults.length - 1) {
                        return 0;  // loop to the start
                    }
                    return prev + 1;
                });
            }
            if (e.key === 'ArrowUp') {
                setSelectedResultIndex(prev => {
                    if (prev === null || prev === 0) {
                        return matchedResults.length - 1;  // loop to the end
                    }
                    return prev - 1;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [matchedResults, selectedResultIndex]);

    useEffect(() => {
        if (query) {
            const results = fuse.search(query);
            setMatchedResults(results.map(r => r.item));
            setSelectedResultIndex(0);
        } else {
            setMatchedResults([]);
            setSelectedResultIndex(null);  // reset selection
        }
    }, [query]);



    return (
        <div className="relative w-full">
            <i className="fas fa-search absolute top-3 left-3 text-gray-400"></i>
            <input
                type="text"
                onFocus={() => setIsOpen(true)}
                placeholder="Search..."
                className="p-2 pl-8 shadow-sm rounded w-full placeholder:font-light placeholder-primary bg-primary text-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black opacity-30  transition-all first-letter:font-bold duration-20"
                    ></div>
                    <div ref={paletteRef} className="z-20 relative rounded-md bg-primary shadow-[0_25px_70px_15px_rgba(0,0,0,0.3)] w-1/2 border-primary border p-2 transition-all">
                        <i className="fas fa-search absolute top-4 left-3 p-2 text-gray-400"></i>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="p-3 w-full rounded-lg text-l bg-primary text-primary border-primary outline-none border-none pl-10"
                            placeholder="Search commands..."
                            autoFocus
                            onSubmit={() => handleCommandClick(matchedResults[0])}
                        />
                        <ul className="mt-3 space-y-2 backdrop-blur-md">
                            {matchedResults.map((result, index) => (
                                <li
                                    key={index}
                                    className={`p-3 grid grid-cols-[auto_1fr] items-center justify-center relative rounded-md  ${selectedResultIndex === index ? 'bg-accent text-white' : ''}`}
                                    onClick={() => handleCommandClick(result)}
                                >
                                    <div className='w-4 grid place-content-center'>
                                        {result.icon}
                                    </div>
                                    <span className='col-span-1 w-full ml-3'>
                                        {result.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommandPalette;
