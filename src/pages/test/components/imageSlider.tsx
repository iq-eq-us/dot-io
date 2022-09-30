import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import Model from './TutorialPopUpMenu';


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
    
    <section className='slider'>
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt='travel image' className='image max-w-full max-h-full center' />
            )}
          </div>

        );
      } 
      )}
      <button className='left-arrow text-white rounded inline-block p-2 ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] ' onClick={prevSlide}> {current === 0 ? '' : <>&laquo;</>} </button>
      <button className='right-arrow text-white rounded inline-block p-2 ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] ' onClick={nextSlide}> {current == slides.length-1 ? ['Start Training', localStorage.setItem("FirstTimeViewingModal", JSON.stringify(true))] : <>&raquo;</>} </button>
    </section>
  );
};

export default ImageSlider;