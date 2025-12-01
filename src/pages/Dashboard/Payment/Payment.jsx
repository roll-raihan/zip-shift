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

    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelName: parcel.parcelName,
            senderEmail: parcel.senderEmail,
            parcelID: parcel._id
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
        console.log(res.data);

    }

    if (isLoading) {
        return <div className='flex justify-center items-center'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    return (
        <div className='bg-white rounded-2xl overflow-hidden m-5 p-10'>
            <h2>Please pay ${parcel.cost} for: {parcel.parcelName}</h2>
            <button onClick={handlePayment} className="btn btn-primary text-black">Pay</button>
        </div>
    );
};

export default Payment;