import React, { useRef } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AssignRiders = () => {

    const axiosSecure = UseAxiosSecure();
    const riderModalRef = useRef();

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data;
        }
    })

    const openAssignRiderModel = parcel => {
        riderModalRef.current.showModal()
    }

    return (
        <div className='my-5 bg-white rounded-2xl overflow-hidden mb-20 m-5 p-10'>
            <h2 className="text-4xl font-bold text-secondary">Assign Riders: {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) =>
                                <tr key={parcel._id}>
                                    <th>{i + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{parcel.createdAt}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>
                                        <button onClick={() => openAssignRiderModel(parcel)} className="btn btn-secondary">Assign Rider</button>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>

            {/*  */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/*  */}
        </div>
    );
};

export default AssignRiders;