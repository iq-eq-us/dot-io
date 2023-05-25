import React, { forwardRef, useEffect, useRef, useState } from 'react';

import './multirangeslider.css';
import './multirangesliderblack.css';
import usePopover from '../../../hooks/usePopover';

/* eslint-disable */

type Props = {
  id?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  minValue?: number | string;
  maxValue?: number | string;
  baseClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  ruler?: boolean | string;
  label?: boolean | string;
  subSteps?: boolean | string;
  stepOnly?: boolean | string;
  preventWheel?: boolean | string;
  labels?: string[];
  minCaption?: string;
  maxCaption?: string;
  barLeftColor?: string;
  barRightColor?: string;
  barInnerColor?: string;
  thumbLeftColor?: string;
  thumbRightColor?: string;
  onInput?: (e: ChangeResult) => void;
  onChange?: (e: ChangeResult) => void;
};

let thumbLeftColor = 'red';
let thumbRightColor = 'blue';

export type ChangeResult = {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
};
let _wheelTimeout: number | null = null;
let _triggerTimeout: number | null = null;
export const MultiRangeSlider = (
  props: Props,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element => {
  let ruler =
    props.ruler === undefined || props.ruler === null ? true : props.ruler;
  let label =
    props.label === undefined || props.label === null ? true : props.label;
  let subSteps =
    props.subSteps === undefined || props.subSteps === null
      ? false
      : props.subSteps;
  let stepOnly =
    props.stepOnly === undefined || props.stepOnly === null
      ? false
      : props.stepOnly;
  let preventWheel =
    props.preventWheel === undefined || props.preventWheel === null
      ? false
      : props.preventWheel;
  let refBar = useRef<HTMLDivElement>(null);
  let min = +(props.min || 0);
  let max = +(props.max || 350);
  let step = +(props.step || 10);
  let fixed = 0;

  let stepCount = Math.floor((+max - +min) / +step);
  let labels: string[] = props.labels || [];
  if (labels.length === 0) {
    labels = [];
    labels.push(min.toString());
    labels.push(max.toString());
  } else {
    stepCount = labels.length - 1;
  }

  if (typeof label === 'string') {
    label = label === 'true';
  }
  if (typeof ruler === 'string') {
    ruler = ruler === 'true';
  }
  if (typeof preventWheel === 'string') {
    preventWheel = preventWheel === 'true';
  }
  if (step.toString().includes('.')) {
    fixed = 2;
  }
  let _minValue = props.minValue;
  if (_minValue === null || _minValue === undefined) {
    _minValue = 25;
  }
  _minValue = +_minValue;
  let _maxValue = props.maxValue;
  if (_maxValue === null || _maxValue === undefined) {
    _maxValue = 75;
  }
  _maxValue = +_maxValue;

  const [minValue, set_minValue] = useState(+_minValue);
  const [maxValue, set_maxValue] = useState(+_maxValue);
  const [barMin, set_barMin] = useState(((minValue - min) / (max - min)) * 100);
  const [barMax, set_barMax] = useState(((max - maxValue) / (max - min)) * 100);
  const [minCaption, setMinCaption] = useState<string>('');
  const [maxCaption, setMaxCaption] = useState<string>('');
  const [isChange, setIsChange] = useState(true);

  const onLeftThumbMousedown: React.MouseEventHandler = (
    e: React.MouseEvent,
  ) => {
    let startX = e.clientX;
    let thumb = e.target as HTMLDivElement;
    let bar = thumb.parentNode as HTMLDivElement;
    let barBox = bar.getBoundingClientRect();
    let barValue = minValue;
    setIsChange(false);
    let onLeftThumbMousemove: { (e: MouseEvent): void } = (e: MouseEvent) => {
      let clientX = e.clientX;
      let dx = clientX - startX;
      let per = dx / barBox.width;
      let val = barValue + (max - min) * per;
      if (stepOnly) {
        val = Math.round(val / step) * step;
      }
      val = parseFloat(val.toFixed(fixed));

      set_minValue(val);
    };
    let onLeftThumbMouseup: { (e: MouseEvent): void } = (e: MouseEvent) => {
      setIsChange(true);
      document.removeEventListener('mousemove', onLeftThumbMousemove);
      document.removeEventListener('mouseup', onLeftThumbMouseup);
    };
    document.addEventListener('mousemove', onLeftThumbMousemove);
    document.addEventListener('mouseup', onLeftThumbMouseup);
  };
  const onLeftThumbTouchStart = (e: React.TouchEvent) => {
    let startX = e.touches[0].clientX;
    let thumb = e.target as HTMLDivElement;
    let bar = thumb.parentNode as HTMLDivElement;
    let barBox = bar.getBoundingClientRect();
    let barValue = minValue;
    setIsChange(false);
    let onLeftThumbToucheMove: { (e: TouchEvent): void } = (e: TouchEvent) => {
      let clientX = e.touches[0].clientX;
      let dx = clientX - startX;
      let per = dx / barBox.width;
      let val = barValue + (max - min) * per;
      if (stepOnly) {
        val = Math.round(val / step) * step;
      }
      val = parseFloat(val.toFixed(fixed));

      set_minValue(val);
    };
    let onLeftThumbTouchEnd: { (e: TouchEvent): void } = (e: TouchEvent) => {
      setIsChange(true);
      document.removeEventListener('touchmove', onLeftThumbToucheMove);
      document.removeEventListener('touchend', onLeftThumbTouchEnd);
    };

    document.addEventListener('touchmove', onLeftThumbToucheMove);
    document.addEventListener('touchend', onLeftThumbTouchEnd);
  };

  useEffect(() => {
    if (refBar && refBar.current) {
      let bar = refBar.current as HTMLDivElement;
      let p_bar = bar.parentNode as HTMLDivElement;
      p_bar.addEventListener('wheel', (e) => {
        if (!e.shiftKey && !e.ctrlKey) {
          return;
        }
        e.preventDefault();
      });
    }
  }, [refBar]);

  useEffect(() => {
    const triggerChange = () => {
      let result: ChangeResult = { min, max, minValue, maxValue };
      isChange && props.onChange && props.onChange(result);
      props.onInput && props.onInput(result);
    };
    setMinCaption(props.minCaption || minValue.toFixed(fixed));
    setMaxCaption(props.maxCaption || maxValue.toFixed(fixed));
    let _barMin = ((minValue - min) / (max - min)) * 100;
    set_barMin(_barMin);
    let _barMax = ((max - maxValue) / (max - min)) * 100;
    set_barMax(_barMax);
    _triggerTimeout && window.clearTimeout(_triggerTimeout);
    _triggerTimeout = window.setTimeout(triggerChange, 20);
  }, [minValue, maxValue, min, max, fixed, props, isChange]);

  useEffect(() => {
    let _minValue = props.minValue;
    if (_minValue === null || _minValue === undefined) {
      _minValue = 25;
    }

    setIsChange(false);
    set_minValue(+_minValue);
  }, [props.minValue, min, max]);
  useEffect(() => {
    let _maxValue = props.maxValue;
    if (_maxValue === null || _maxValue === undefined) {
      _maxValue = 75;
    }
    _maxValue = +_maxValue;

    setIsChange(false);
    set_maxValue(+_maxValue);
  }, [props.maxValue, min, max, step]);

  if (minValue > maxValue) {
    const tempHold = maxValue;
    set_maxValue(minValue);
    set_minValue(tempHold);
    //maxValue = minValue
    thumbLeftColor = 'blue';
    thumbRightColor = 'red';
  }

  return (
    <div
      ref={ref}
      id={props.id}
      className={
        (props.baseClassName || 'multi-range-slider') +
        ' ' +
        (props.className || '')
      }
      style={props.style}
    >
      {ruler && (
        <div className="ruler">
          {[...Array(stepCount)].map((e, i) => (
            <div key={i} className="ruler-rule flex-col">
              {subSteps &&
                [...Array(10)].map((e, n) => (
                  <div key={n} className="ruler-sub-rule absolute"></div>
                ))}
              <div className="text-[6px] absolute font-bold m-auto text-center text-neutral-600 flex-col">
                {i * step}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bar flex" ref={refBar}>
        <div
          className="bar-left"
          style={{ width: barMin + '%', backgroundColor: props.barLeftColor }}
        ></div>
        <input
          placeholder="min-value"
          className="input-type-range input-type-range-min absolute"
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
        />
        <div
          className="thumb thumb-left absolute"
          style={{ backgroundColor: thumbLeftColor }}
        >
          <div className="caption">
            <span className="min-caption">{minCaption}</span>
          </div>
        </div>
        <div
          className="bar-inner"
          style={{ backgroundColor: props.barInnerColor }}
        >
          <div className="bar-inner-left"></div>
          <div className="bar-inner-right"></div>
        </div>
        <input
          placeholder="max-value"
          className="input-type-range input-type-range-max	absolute"
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
        />
        <div
          className="thumb thumb-right absolute"
          style={{ backgroundColor: thumbRightColor }}
        >
          <div className="caption">
            <span className="max-caption">{maxCaption}</span>
          </div>
        </div>

        <div
          className="bar-right"
          style={{ width: barMax + '%', backgroundColor: props.barRightColor }}
        ></div>
      </div>
    </div>
  );
};
/* eslint-enable */

export default React.memo(forwardRef<HTMLDivElement, Props>(MultiRangeSlider));
