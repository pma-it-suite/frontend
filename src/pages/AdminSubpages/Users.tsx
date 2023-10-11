import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

interface User {
    _id?: string;
    name?: string;
    email?: string;
    subscription_id?: string;
    tenant_id?: string;
    device_ids?: string[];
    role_id?: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [modalType, setModalType] = useState<"user" | "subscription" | "tenant" | "device" | null>(null);
    const [selectedItem, setSelectedItem] = useState<User | string | null>(null);

    const ProfilePic: React.FC<{ name: string }> = ({ name }) => {
        const initials = name.split(' ').map(word => word[0]).join('');
        return <div className="rounded-full bg-priamry-light text-primary border border-primary w-12 h-12 p-2 grid place-content-center no-underline">{initials}</div>;
    };

    useEffect(() => {
        const mockData: User[] = [
            {
                _id: "1",
                name: "John Doe",
                email: "john@example.com",
                subscription_id: "sub_1",
                tenant_id: "tenant_1",
                device_ids: ["device_1A", "device_1B"],
                role_id: "role_admin"
            },
            {
                _id: "2",
                name: "Jane Smith",
                email: "jane@example.com",
                subscription_id: "sub_2",
                tenant_id: "tenant_2",
                device_ids: ["device_2A"],
                role_id: "role_user"
            },
            {
                _id: "2",
                name: "Jane Smith",
                email: "jane@example.com",
                subscription_id: "sub_2",
                tenant_id: "tenant_2",
                device_ids: ["device_2A"],
                role_id: "role_user"
            }
        ];

        setUsers(mockData);
    }, []);

    return (
        <div className="relative ml-2 p-8">
            {/* Modals */}
            <ReactModal isOpen={modalType === "user"}
                onRequestClose={() => setModalType(null)}  // This will be triggered by pressing Escape
                shouldCloseOnOverlayClick={true} >
                {/* Content of user modal */}
                <div>
                    User
                </div>
            </ReactModal>
            <ReactModal isOpen={modalType === "subscription"} onRequestClose={() => setModalType(null)}  // This will be triggered by pressing Escape
                shouldCloseOnOverlayClick={true}>
                {/* Content of subscription modal */}
                <div>
                    Subscription
                </div>
            </ReactModal>
            <p>Todo: Groups (sunscriptions) that are expandable and allow u to drag and drop users between groups. Ungrouped users are also here. Sorting table would be nice too</p>
            <table className="min-w-full divide-y divide-gray-200 bg-primary rounded-md shadow-sm">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left">ID</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Subscription</th>
                        <th className="px-6 py-3 text-left">Devices</th>
                        <th className="px-6 py-3 text-right">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className={`bg-primary ${index % 2 === 1 ? "bg-primary-light" : ""}`}>
                            <td className="px-6 py-4">{user._id}</td>
                            <td className="px-6 py-4 flex items-center cursor-pointer" onClick={() => { setSelectedItem(user); setModalType("user"); }}>
                                {/* <ProfilePic name={user.name || ""} /> */}
                                <span className=''>
                                    {user.name}
                                </span>
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4 cursor-pointer underline" onClick={() => { setSelectedItem(user.subscription_id); setModalType("subscription"); }}>
                                {user.subscription_id}
                            </td>
                            <td className="px-6 py-4 cursor-pointer underline" onClick={() => { setSelectedItem(user.device_ids?.join(', ')); setModalType("device"); }}>
                                {user.device_ids?.join(', ')}
                            </td>
                            <td className="px-6 py-4 flex items-center justify-end cursor-pointer" title='Role detail'>
                                {user.role_id}
                                <i data-tip="Role Info" className="fas fa-info-circle ml-2"></i>
                            </td>
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

export default Users;
