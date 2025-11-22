import React from 'react';
import locationMerchant from '../../../assets/location-merchant.png';
import vector from '../../../assets/Vector.png'
import vector1 from '../../../assets/Vector1.png'

const MerchantBanner = () => {
    return (
        <div className='m-20 border rounded-2xl bg-secondary text-white p-10 relative'>
            <div className='flex items-center justify-center absolute top-0'>
                <img src={vector1} alt="" />
                <img src={vector} alt="" />
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex flex-col items-start'>
                    <h2 className='font-bold text-2xl text-wrap my-3'>
                        Merchant and Customer Satisfaction is Our First Priority
                    </h2>
                    <p className='text-wrap my-3'>
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='flex justify-center items-center gap-5 my-3'>
                        <button className='btn btn-primary text-black rounded-full'>Become a Merchant</button>
                        <button className='btn btn-outline border border-primary rounded-full'>Earn with ZipShift Courier</button>
                    </div>
                </div>
                <div className=''>
                    <img src={locationMerchant} alt="location merchant image" />
                </div>
            </div>
        </div>
    );
};

export default MerchantBanner;