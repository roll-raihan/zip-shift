import React from 'react';
import { useParams } from 'react-router';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {

    const { parcelID } = useParams();
    const axiosSecure = UseAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelID],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelID}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className='flex justify-center items-center'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    return (
        <div className='bg-white rounded-2xl overflow-hidden m-5 p-10'>
            <h2>Please pay for: {parcel.parcelName}</h2>
            <button className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default Payment;