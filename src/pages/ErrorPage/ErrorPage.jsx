import React from 'react';
import errorPage from '/404-error.png'
import { Link } from 'react-router';
import { IoArrowBackSharp } from 'react-icons/io5';

const ErrorPage = () => {
    return (
        <div className='relative'>
            <img src={errorPage} alt="" />
            <Link to='/' className='btn btn-primary text-black font-bold absolute bottom-3 right-4/12 left-4/12 text-wrap'><IoArrowBackSharp />Go Back Home</Link>
        </div>
    );
};

export default ErrorPage;