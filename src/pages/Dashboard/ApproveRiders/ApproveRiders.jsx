import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashCan, FaUserCheck } from 'react-icons/fa6';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import Swal from 'sweetalert2';

const ApproveRiders = () => {

    const axiosSecure = UseAxiosSecure();
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const updateRiderStatus = (id, status) => {
        const updateInfo = {
            status: status
        }
        axiosSecure.patch(`/riders/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Rider status is set to ${status}.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                };
            })
    }

    const handleRiderApproval = id => {
        updateRiderStatus(id, 'approved');
    }

    const handleRiderRejection = id => {
        updateRiderStatus(id, 'rejected')
    }

    return (
        <div className='my-5 bg-white rounded-2xl overflow-hidden mb-20 m-5 p-10'>
            <h2 className="text-4xl font-bold text-secondary">Riders Approval Pending : {riders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, i) => <tr key={rider._id}>
                                <th>{i + 1}</th>
                                <td>{rider.riderName}</td>
                                <td>{rider.riderDistrict}</td>
                                <td>
                                    <p className={`${rider.status === 'approved' ? 'text-green-800' : 'text-red-800'}`}>{rider.status}</p>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleRiderApproval(rider._id)}
                                        className='btn btn-sm'>
                                        <FaUserCheck />
                                    </button>
                                    <button
                                        onClick={() => handleRiderRejection(rider._id)}
                                        className='btn btn-sm'>
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className='btn btn-sm'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;