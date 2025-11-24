import React from 'react';
import Logo from '../../components/logo/Logo';
import { Outlet } from 'react-router';
import authImage from '../../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto m-10'>
            <Logo></Logo>
            <div className='flex m-10 justify-center items-center flex-col md:flex-row'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;