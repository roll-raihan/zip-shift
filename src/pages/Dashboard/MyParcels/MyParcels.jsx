import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

const MyParcels = () => {

    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <div>
            All my parcels: {parcels.length}
        </div>
    );
};

export default MyParcels;