import React from 'react';
import UseAuth from '../hooks/UseAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {

    const { loading } = UseAuth();
    const { roleLoading, role } = useRole();

    if (loading || roleLoading) {
        return <div className='flex justify-center items-center'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if (role !== 'admin') {
        return <div className='flex justify-center items-center my-5 bg-white rounded-2xl overflow-hidden mb-20 m-5 p-10'>
            <p className='text-3xl'>You are not allowed to visit this page!</p>
        </div>
    }

    return children;
};

export default AdminRoute;