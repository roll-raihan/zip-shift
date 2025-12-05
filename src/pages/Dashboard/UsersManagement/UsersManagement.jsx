import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = UseAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users`);
            return res.data;
        }
    })

    const handleMarkUserToAdmin = user => {
        const roleInfo = { role: 'admin' };
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${user.displayName} is marked as an admin.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' };
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${user.displayName} is removed from admin.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div className='my-5 bg-white rounded-2xl overflow-hidden mb-20 m-5 p-10'>
            <h2 className="text-4xl font-bold text-secondary">Users Management : {users.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user.role}
                                </td>
                                <td>
                                    {
                                        user.role === 'admin' ?
                                            <button
                                                onClick={() => handleRemoveAdmin(user)}
                                                className='btn bg-red-500'>
                                                <FiShieldOff />
                                            </button>
                                            : <button
                                                onClick={() => handleMarkUserToAdmin(user)}
                                                className='btn bg-green-500'>
                                                <FaUserShield></FaUserShield>
                                            </button>
                                    }
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">View</button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;