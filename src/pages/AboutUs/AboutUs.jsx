import React from 'react';
import { NavLink, Outlet } from 'react-router';

const AboutUs = () => {
    return (
        <div className='my-10 bg-white rounded-2xl overflow-hidden mt-10 mb-20 m-5 p-10'>
            <div className='my-5'>
                <h2 className='text-3xl font-bold text-secondary'>About Us</h2>
                <p className='text-wrap'>
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>
            <div className='border-t border-gray-300'></div>
            <div className='flex gap-5  my-5'>
                <NavLink
                    to='/about-us/story'
                    className='font-semibold'>Story</NavLink>
                <NavLink
                    to='/about-us/mission'
                    className='font-semibold'>Mission</NavLink>
                <NavLink
                    to='/about-us/success'
                    className='font-semibold'>Success</NavLink>
                <NavLink
                    to='/about-us/terms-and-conditions'
                    className='font-semibold'>Team & Others</NavLink>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default AboutUs;