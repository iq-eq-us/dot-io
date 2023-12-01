import React from 'react';
import { SliderContainer } from './Slider.styled';

interface SliderProps {
  max: number;
  currentNumber: number;
  setCurrentNumber: (number: number) => void;
}

export const Slider = ({
  max,
  currentNumber,
  setCurrentNumber,
}: SliderProps) => {
  return (
    <SliderContainer>
      <input
        type="range"
        min="1"
        max={max}
        value={currentNumber}
        onChange={(e) => setCurrentNumber(e.target.valueAsNumber)}
      />
    </SliderContainer>
  );
};
