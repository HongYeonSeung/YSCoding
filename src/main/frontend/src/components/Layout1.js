// src/components/Layout1.js
import React from 'react';
import './Layout1.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination,Autoplay } from "swiper/modules"; // 스타일 파일을 임포트합니다.

function Layout1() {
  return (
    <div className="layout1">
        <div className="img-box">
            <Swiper
                modules={[Navigation, Pagination, A11y,Autoplay ]}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide><img src="/banner1.png"/></SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </div>
    </div>
  );
}

export default Layout1;
