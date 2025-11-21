import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'
import { FaArrowCircleRight } from 'react-icons/fa';

// react awesome component -> carousel
const Banner = () => {
    return (
        <Carousel
        // autoPlay={true}
        // infiniteLoop={true}
        >
            <div className='relative'>
                <img src={bannerImg1} />
                <div className='flex justify-center items-center gap-5 absolute bottom-0 left-8 md:bottom-8 lg:bottom-20 lg:left-20'>
                    <button className='rounded-2xl bg-primary p-2 flex justify-center items-center gap-2 font-bold'>Track Your Parcel <FaArrowCircleRight /></button>
                    <button className='btn font-bold'>Be A Rider</button>
                </div>
            </div>
            <div className='relative'>
                <img src={bannerImg2} />
                <div className='flex justify-center items-center gap-5 absolute bottom-8 lg:bottom-20 left-8 lg:left-20'>
                    <button className='rounded-2xl bg-primary p-2 flex justify-center items-center gap-2 font-bold'>Track Your Parcel <FaArrowCircleRight /></button>
                    <button className='btn font-bold'>Be A Rider</button>
                </div>
            </div>
            <div className='relative'>
                <img src={bannerImg3} />
                <div className='flex justify-center items-center gap-5 absolute bottom-8 lg:bottom-20 left-8 lg:left-20'>
                    <button className='rounded-2xl bg-primary p-2 flex justify-center items-center gap-2 font-bold'>Track Your Parcel <FaArrowCircleRight /></button>
                    <button className='btn font-bold'>Be A Rider</button>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;