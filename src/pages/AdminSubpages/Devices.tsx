import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

interface Device {
    _id: string;
    name: string;
    user_id: string;
    metadata?: Record<string, any>;
}

const Devices: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [modalType, setModalType] = useState<"device" | null>(null);
    const [selectedItem, setSelectedItem] = useState<Device | string | null>(null);

    useEffect(() => {
        const mockData: Device[] = [
            {
                _id: "device_1A",
                name: "Device Alpha",
                user_id: "1",
            },
            {
                _id: "device_2A",
                name: "Device Beta",
                user_id: "2",
            }
        ];

        setDevices(mockData);
    }, []);

    return (
        <div className="relative ml-2 p-8">
            {/* Modals */}
            <ReactModal isOpen={modalType === "device"}
                onRequestClose={() => setModalType(null)}  
                shouldCloseOnOverlayClick={true} >
                {/* Content of device modal */}
                <div>
                    Device
                </div>
            </ReactModal>
            <div>Todo: show Devices by device type, with users infront of them. Show unpaired devices. Show status indicator lights</div> 
            <table className="min-w-full divide-y divide-gray-200 bg-primary rounded-md shadow-sm">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">User ID</th>
                        <th className="px-6 py-3 text-left">Metadata</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device, index) => (
                        <tr key={index} className={`bg-primary ${index % 2 === 1 ? "bg-primary-light" : ""}`}>
                            <td className="px-6 py-4">{device._id}</td>
                            <td className="px-6 py-4 cursor-pointer" onClick={() => { setSelectedItem(device); setModalType("device"); }}>
                                {device.name}
                            </td>
                            <td className="px-6 py-4">{device.user_id}</td>
                            <td className="px-6 py-4">{JSON.stringify(device.metadata)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className='' >
                    <div className='px-4 py-6'></div>
                </tfoot>
            </table>
        </div>
    );
};

export default Devices;
