import React from 'react';
import PropTypes from 'prop-types';
import SliderItem from '../SliderItem';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { SLIDER_IMAGES } from 'constants/images';
import { Carousel } from 'antd';
Slider.propTypes = {};

function Slider(props) {
    const items = [
        <SliderItem
            src={SLIDER_IMAGES.SLIDER_1}
            title='Chat nhóm với đồng nghiệp'
            detail='Tiện lợi hơn nhờ các công cụ hỗ trợ chat trên máy tính'
        />,

        <SliderItem
            src={SLIDER_IMAGES.SLIDER_2}
            title='Chat nhóm với đồng nghiệp'
            detail='Tiện lợi hơn nhờ các công cụ hỗ trợ chat trên máy tính'
        />,

        <SliderItem
            src={SLIDER_IMAGES.SLIDER_3}
            title='Chat nhóm với đồng nghiệp'
            detail='Tiện lợi hơn nhờ các công cụ hỗ trợ chat trên máy tính'
        />,
    ];

    return (
        // <AliceCarousel
        //     items={items}
        //     autoHeight={true}
        //     autoWidth={true}
        //     // controlsStrategy='alternate'
        //     autoPlay={true}
        //     animationDuration={3000}
        //     disableButtonsControls={true}
        //     infinite={true}
        //     autoPlayDirection={true}
        //     keyboardNavigation={true}
        //     responsive={{
        //         768: {
        //             items: 1
        //         },
        //         992: {
        //             items: 2
        //         },
        //         1200: {
        //             items: 3
        //         }

        //     }}
        // />

        <Carousel autoplay dots={false}>
            <SliderItem
                src={SLIDER_IMAGES.SLIDER_1}
                title='Chat nhóm với đồng nghiệp'
                detail='Tiện lợi hơn nhờ các công cụ hỗ trợ chat trên máy tính'
            />

            <SliderItem
                src={SLIDER_IMAGES.SLIDER_2}
                title='Chat nhóm với đồng nghiệp'
                detail='Tiện lợi hơn nhờ các công cụ hỗ trợ chat trên máy tính'
            />

            <SliderItem
                src={SLIDER_IMAGES.SLIDER_3}
                title='Chat nhóm với đồng nghiệp'
                detail='Tiện lợi hơn nhờ các công cụ hỗ trợ chat trên máy tính'
            />
        </Carousel>
    );
}

export default Slider;
