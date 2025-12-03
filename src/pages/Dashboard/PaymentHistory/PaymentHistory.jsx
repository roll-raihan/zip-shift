import React from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import UseAuth from '../../../hooks/UseAuth'
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {

    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <div className='m-4 p-6 rounded-2xl bg-white'>
            <h2 className='text-3xl font-bold text-secondary my-5'>Payment History : ({payments.length})</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Transaction Id</th>
                            <th>Payment Info</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, i) =>
                                <tr key={payment._id}>
                                    <th>{i + 1}</th>
                                    <td>{payment.parcelName}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>$ {payment.amount}  ({payment.paymentStatus})</td>
                                    <td><button className='btn btn-primary btn-sm text-black'>View</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;