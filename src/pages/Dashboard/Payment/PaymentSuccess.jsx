import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();

    const [paymentInfo, setPaymentInfo] = useState({});

    const sessionID = searchParams.get('session_id');
    // console.log(sessionID);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        if (sessionID) {
            axiosSecure.patch(`/payment-success?session_id=${sessionID}`)
                .then(res => {
                    // console.log(res.data);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionID, axiosSecure])

    return (
        <div className='my-5 bg-white rounded-2xl overflow-hidden mb-20 m-5 p-10'>
            <h2 className="text-4xl my-4">Payment Successful</h2>
            <p>Your Transaction id: {paymentInfo.transactionId}</p>
            <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;