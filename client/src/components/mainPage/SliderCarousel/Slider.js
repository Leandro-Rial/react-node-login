import React from 'react';
import ImageSlider from './ImageSlider';
import { SliderData } from './SliderData';

const Slider = () => {
    return (
        <>
            <ImageSlider slides={SliderData} />
        </>
    )
}

export default Slider
