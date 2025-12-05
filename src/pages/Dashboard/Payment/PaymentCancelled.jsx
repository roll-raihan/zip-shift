import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='my-5 bg-white rounded-2xl overflow-hidden mb-20 m-5 p-10'>
            <h2 className="text-4xl my-4">Payment Cancelled. Please, try again</h2>
            <Link to='/dashboard/my-parcels' className='btn btn-active'>My Parcels</Link>
        </div>
    );
};

export default PaymentCancelled;