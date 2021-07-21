import React, { useState } from "react";
import { SliderData } from "./SliderData";
import leftArrow from "../../../image/left-arrow-alt-solid-24.png";
import rigthArrow from "../../../image/right-arrow-alt-solid-24.png";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider-img">
      <img
        src={leftArrow}
        alt="LeftArrow"
        className="leftArrow"
        onClick={prevSlide}
      />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slice active" : "slice"}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt="Dell" className="image" />
            )}
          </div>
        );
      })}
      <img
        src={rigthArrow}
        alt="RigthArrow"
        className="rightArrow"
        onClick={nextSlide}
      />
    </section>
  );
};

export default ImageSlider;
