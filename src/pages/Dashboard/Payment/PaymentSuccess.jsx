import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionID = searchParams.get('session_id');
    // console.log(sessionID);
    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        if (sessionID) {
            axiosSecure.patch(`/payment-success?session_id=${sessionID}`)
                .then(res => {
                    console.log(res.data)
                })
        }
    }, [sessionID, axiosSecure])

    return (
        <div>
            <h2 className="text-4xl">Payment Successful</h2>
        </div>
    );
};

export default PaymentSuccess;