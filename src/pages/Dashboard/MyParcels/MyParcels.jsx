import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyParcels = () => {

    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })

    const handleParcelDelete = id => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        // console.log(res.data);

                        if (res.data.deletedCount) {
                            // auto refetching after delete
                            refetch();
                            Swal.fire({
                                title: "Deleted",
                                text: "Your selected parcel is deleted.",
                                icon: "success"
                            });
                        }

                    })


            }
        });
    }

    return (
        <div>
            All my parcels: {parcels.length}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {
                            parcels.map(
                                (parcel, index) => <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>Unpaid</td>
                                    <td>
                                        <button className='btn btn-square hover:bg-primary'>
                                            <FaMagnifyingGlass></FaMagnifyingGlass>
                                        </button>
                                        <button className='btn btn-square hover:bg-primary mx-2'>
                                            <FaRegEdit />
                                        </button>
                                        <button
                                            onClick={() => handleParcelDelete(parcel._id)}
                                            className='btn btn-square hover:bg-primary'>
                                            <FaTrashCan />
                                        </button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;