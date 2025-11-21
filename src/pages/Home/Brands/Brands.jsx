import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import casio from '../../../assets/brands/casio.png'
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import moonstar from '../../../assets/brands/moonstar.png'
import star from '../../../assets/brands/star.png'
import start_people from '../../../assets/brands/start_people.png'
import randstad from '../../../assets/brands/randstad.png'
import { Autoplay } from 'swiper/modules';

const Brands = () => {

    const brandLogos = [casio, amazon, amazon_vector, moonstar, star, start_people, randstad]

    return (
        <>
            <h2 className='font-bold text-2xl text-center mb-2 mt-8'>We've helped thousands of sales teams</h2>
            <Swiper
                slidesPerView={2}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                modules={[Autoplay]}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                className='my-10'
            >
                {
                    brandLogos.map((logo, index) => <SwiperSlide key={index}><img src={logo} alt="" /></SwiperSlide>)
                }
            </Swiper>
        </>
    );
};

export default Brands;