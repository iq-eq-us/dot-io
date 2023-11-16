import React, { useState } from 'react';
import {
  SliderData,
  SliderDataForCHMTier,
  SliderForConceptsMastered,
} from './SliderData';
import { useStoreState, useStoreActions } from '../../../store/store';

const ImageSlider = () => {
  let slides: any = [];
  const trainingLevel = useStoreState((store: any) => store.trainingLevel);

  if (trainingLevel == 'CHM') {
    slides = SliderDataForCHMTier;
  } else if (trainingLevel == 'CPM') {
    slides = SliderData;
  } else if (trainingLevel === 'CM') {
    slides = SliderForConceptsMastered;
  } else {
    slides = SliderData;
  }

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);

    if (current == length - 1) {
      setIsDisplaying();
      setIsDisplayingIntroductionModal(true as boolean);
      setIsDisplayingIntroductionModal(false as boolean);

      localStorage.setItem('FirstTimeViewingModal', JSON.stringify(true));
      console.log('jsdns ' + isDisplayingIntroductionModal);
    }
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
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

  function setIsDisplaying() {
    setIsDisplayingIntroductionModal(isDisplayingIntroductionModal as boolean);
  }

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
                alt="travel image"
                className="image max-w-full max-h-full center"
              />
            )}
          </div>
        );
      })}
      <button
        className={`right-arrow text-white rounded inline-block p-2 ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] ${
          current === 0 || current == slides.length - 1 ? 'hidden' : ''
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
        {current == slides.length - 1 ? (
          [
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
