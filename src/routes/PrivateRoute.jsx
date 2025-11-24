import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {

    const { user, loading } = UseAuth();

    if (loading) {
        return <div className='flex justify-center items-center'>
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }

    if (!user) {
        return <Navigate to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;