import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = UseAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', searchText],
        queryFn: async () => {
            const res = await axiosSecure.get(`users?searchText=${searchText}`);
            return res.data;
        }
    })

    const handleMarkUserToAdmin = user => {
        const roleInfo = { role: 'admin' };
        Swal.fire({
            title: "Are you sure?",
            text: `You want to mark "${user.displayName}" as an admin!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, mark Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
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
        });

    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' };
        Swal.fire({
            title: "Are you sure?",
            text: `You want to remove "${user.displayName}" from admin!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
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
        });
    }

    return (
        <div className='my-5 bg-white rounded-2xl overflow-hidden mb-20 m-5 p-10'>
            <h2 className="text-4xl font-bold text-secondary my-5">Users Management : {users.length}</h2>

            {/* search field */}
            <label className="input my-5">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    type="search"
                    required
                    placeholder="Search user" />
            </label>

            <div className="overflow-x-auto my-5">
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