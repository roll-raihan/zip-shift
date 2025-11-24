import React from 'react';
import liveTrack from '../../../assets/live-tracking.png'
import safeDelivery from '../../../assets/safe-delivery.png'

const ActiveServices = () => {

    const objs = [
        {
            name: "Live Parcel Tracking",
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            imgs: liveTrack
        },
        {
            name: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            imgs: safeDelivery
        },
        {
            name: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            imgs: safeDelivery
        },
    ]

    return (
        <div className='m-20'>
            <div className='flex flex-col gap-5'>
                {
                    objs.map(
                        (obj, index) =>
                            <div
                                key={index}
                                className='flex flex-col md:flex-row justify-center items-center gap-5 p-10 bg-white rounded-2xl border-gray-500'>
                                <img src={obj.imgs} alt="" />
                                <div>
                                    <h3 className='font-bold text-xl'>
                                        {obj.name}
                                    </h3>
                                    <p>
                                        {obj.description}
                                    </p>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    );
};

export default ActiveServices;