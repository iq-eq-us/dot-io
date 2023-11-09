import React, { forwardRef, useEffect, useRef, useState } from 'react';

import './multirangeslider.css';
import './multirangesliderblack.css';
import usePopover from '../../../hooks/usePopover';
import { useStoreState } from 'easy-peasy';

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

  const trainingSettings = useStoreState(
    (store: any) => store.trainingSettings,
  );

  /*if (
    props.minValue != 'Infinity' &&
    (props.minValue > max || props.maxValue > max) &&
    trainingSettings.isProgressBarDynamic == true
  ) {
    //console.log('inMacValue ' + inMaxValue + ' ' + maxValue)
    if (props.maxValue > props.minValue) {
      if (100 > props.maxValue) {
        max = 100;
      } else if (200 > props.maxValue) {
        max = 200;
      } else if (300 > props.maxValue) {
        max = 300;
      } else if (400 > props.maxValue) {
        max = 400;
      } else if (500 > props.maxValue) {
        max = 500;
      } else if (600 > props.maxValue) {
        max = 600;
      } else if (700 > props.maxValue) {
        max = 700;
      }
    } else if (trainingSettings.isProgressBarDynamic == true) {
      if (100 > props.minValue) {
        max = 100;
      } else if (200 > props.minValue) {
        max = 200;
      } else if (300 > props.minValue) {
        max = 300;
      } else if (400 > props.minValue) {
        max = 400;
      } else if (500 > props.minValue) {
        max = 500;
      } else if (600 > props.minValue) {
        max = 600;
      } else if (700 > props.minValue) {
        max = 700;
      }
    }
  }*/

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

  const [minValue, set_minValue] = useState(+props.minValue);
  const [maxValue, set_maxValue] = useState(+props.maxValue);

  if (minValue > maxValue) {
    set_maxValue(+props.minValue);
    console.log('Props min ' + props.minValue + ' ' + minValue + ' ' + max);
    set_minValue(+props.maxValue);
    console.log('Props min ' + props.maxValue + ' ' + maxValue + ' ' + max);
  }

  const [barMin, set_barMin] = useState(((minValue - min) / (max - min)) * 100);
  const [barMax, set_barMax] = useState(((max - maxValue) / (max - min)) * 100);
  const [minCaption, setMinCaption] = useState<string>('');
  const [maxCaption, setMaxCaption] = useState<string>('');
  const [isChange, setIsChange] = useState(true);

  useEffect(() => {
    const triggerChange = () => {
      let result: ChangeResult = { min, max, minValue, maxValue };
      isChange && props.onChange && props.onChange(result);
      props.onInput && props.onInput(result);
    };

    let _barMin = ((minValue - min) / (max - min)) * 100;
    set_barMin(_barMin);
    let _barMax = ((max - maxValue) / (max - min)) * 100;
    set_barMax(_barMax);
    _triggerTimeout && window.clearTimeout(_triggerTimeout);
    _triggerTimeout = window.setTimeout(triggerChange, 20);
  }, [minValue, maxValue, min, max, fixed, props, isChange]);

  useEffect(() => {
    let _minValue = props.minValue;

    setIsChange(false);
    set_minValue(+_minValue);
  }, [props.minValue, min, max]);

  useEffect(() => {
    let _maxValue = props.maxValue;

    setIsChange(false);
    set_maxValue(+_maxValue);
  }, [props.maxValue, min, max, step]);

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
              <div className="text-[10px] absolute font-bold -ml-2 text-center text-neutral-300 flex-col w-4">
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
          style={{
            backgroundColor:
              props.minValue > props.maxValue ? '#ef4444' : '#38bdf8',
          }}
        ></div>
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
          style={{
            backgroundColor:
              props.minValue > props.maxValue ? '#38bdf8' : '#ef4444',
          }}
        ></div>

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
