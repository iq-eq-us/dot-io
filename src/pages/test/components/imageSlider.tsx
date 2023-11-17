import React, { useState, useEffect } from 'react';
import {
  SliderData,
  SliderDataForCHMTier,
  SliderForConceptsMastered,
  SliderForAnalyticalDashboard,
} from './SliderData';
import { useStoreState, useStoreActions } from '../../../store/store';

const ImageSlider = () => {
  let slides: any = [];
  const trainingLevel = useStoreState((store: any) => store.trainingLevel);

  useEffect(() => {
    // Reset current slide when training level changes
    setCurrent(0);
  }, [trainingLevel]);

  if (trainingLevel === 'CHM') {
    slides = SliderDataForCHMTier;
  } else if (trainingLevel === 'CPM') {
    slides = SliderData;
  } else if (trainingLevel === 'CM') {
    slides = SliderForConceptsMastered;
  } else if (trainingLevel === 'AnalyticalDashboard') {
    slides = SliderForAnalyticalDashboard;
  } else {
    slides = SliderData;
  }

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === length - 1 ? 0 : prevCurrent + 1,
    );
  };

  const prevSlide = () => {
    setCurrent((prevCurrent) =>
      prevCurrent === 0 ? length - 1 : prevCurrent - 1,
    );
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const isDisplayingIntroductionModal = useStoreState(
    (store: any) => store.isDisplayingIntroductionModal,
  );
  const setIsDisplayingIntroductionModal = useStoreActions(
    (store: any) => store.setIsDisplayingIntroductionModal,
  );

  return (
    <section className="slider">
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img
                src={slide.image}
                alt="slide"
                className="image max-w-full max-h-full center"
              />
            )}
          </div>
        );
      })}
      <button
        className={`right-arrow text-white rounded inline-block p-2 ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] ${
          current === 0 || current === length - 1 ? 'hidden' : ''
        }`}
        onClick={prevSlide}
      >
        {' '}
        {current === 0 ? '' : <>&laquo;</>}{' '}
      </button>
      <button
        className="right-arrow text-white rounded inline-block p-2 ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        onClick={nextSlide}
      >
        {' '}
        {current === slides.length - 1 ? (
          (trainingLevel === 'CHM' || trainingLevel === 'CPM') && [
            'Start Training',
            localStorage.setItem('FirstTimeViewingModal', JSON.stringify(true)),
          ]
        ) : (
          <>&raquo;</>
        )}{' '}
      </button>
    </section>
  );
};

export default ImageSlider;
