import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ImageURL } from '../../../constants';
import defaultImage from '../../../assets/contactsvg.svg';

const ImageSlider = ({ images }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div style={{ padding: '10px' }} className='flex flex-row sm:block'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={`swipe-${index}`}>
                        <img key={`image-${index}`} src={image ? ImageURL + image : defaultImage} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={`swipe1-${index}`}>
                        <img key={`image1-${index}`} src={image ? ImageURL + image : defaultImage} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
export default ImageSlider