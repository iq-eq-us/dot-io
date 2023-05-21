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

  const onBarLeftClick = (e: React.MouseEvent) => {
    let _minValue = minValue - step;
    if (_minValue < min) {
      _minValue = min;
    }
    set_minValue(_minValue);
  };
  const onInputMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _minValue = parseFloat(e.target.value);
    if (_minValue > maxValue - step) {
      _minValue = maxValue - step;
    }
    set_minValue(_minValue);
    setIsChange(true);
  };
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
      if (val < min) {
        val = min;
      } else if (val > maxValue - step) {
        val = maxValue - step;
      }
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
      if (val < min) {
        val = min;
      } else if (val > maxValue - step) {
        val = maxValue - step;
      }
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
  const onInnerBarLeftClick = (e: React.MouseEvent) => {
    let _minValue = minValue + step;
    if (_minValue > maxValue - step) {
      _minValue = maxValue - step;
    }
    set_minValue(_minValue);
  };
  const onInnerBarRightClick = (e: React.MouseEvent) => {
    let _maxValue = maxValue - step;
    if (_maxValue < minValue + step) {
      _maxValue = minValue + step;
    }
    set_maxValue(_maxValue);
  };
  const onInputMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _maxValue = parseFloat(e.target.value);
    if (_maxValue < minValue + step) {
      _maxValue = minValue + step;
    }
    set_maxValue(_maxValue);
    setIsChange(true);
  };
  const onRightThumbMousedown: React.MouseEventHandler = (
    e: React.MouseEvent,
  ) => {
    let startX = e.clientX;
    let thumb = e.target as HTMLDivElement;
    let bar = thumb.parentNode as HTMLDivElement;
    let barBox = bar.getBoundingClientRect();
    let barValue = maxValue;
    setIsChange(false);
    let onRightThumbMousemove: { (e: MouseEvent): void } = (e: MouseEvent) => {
      let clientX = e.clientX;
      let dx = clientX - startX;
      let per = dx / barBox.width;
      let val = barValue + (max - min) * per;
      if (stepOnly) {
        val = Math.round(val / step) * step;
      }
      val = parseFloat(val.toFixed(fixed));
      if (val < minValue + step) {
        val = minValue + step;
      } else if (val > max) {
        val = max;
      }
      set_maxValue(val);
    };
    let onRightThumbMouseup: { (e: MouseEvent): void } = (e: MouseEvent) => {
      setIsChange(true);
      document.removeEventListener('mousemove', onRightThumbMousemove);
      document.removeEventListener('mouseup', onRightThumbMouseup);
    };
    document.addEventListener('mousemove', onRightThumbMousemove);
    document.addEventListener('mouseup', onRightThumbMouseup);
  };
  const onRightThumbTouchStart = (e: React.TouchEvent) => {
    let startX = e.touches[0].clientX;
    let thumb = e.target as HTMLDivElement;
    let bar = thumb.parentNode as HTMLDivElement;
    let barBox = bar.getBoundingClientRect();
    let barValue = maxValue;
    setIsChange(false);
    let onRightThumbTouchMove: { (e: TouchEvent): void } = (e: TouchEvent) => {
      let clientX = e.touches[0].clientX;
      let dx = clientX - startX;
      let per = dx / barBox.width;
      let val = barValue + (max - min) * per;
      if (stepOnly) {
        val = Math.round(val / step) * step;
      }
      val = parseFloat(val.toFixed(fixed));
      if (val < minValue + step) {
        val = minValue + step;
      } else if (val > max) {
        val = max;
      }
      set_maxValue(val);
    };
    let onRightThumbTouchEnd: { (e: TouchEvent): void } = (e: TouchEvent) => {
      setIsChange(true);
      document.removeEventListener('touchmove', onRightThumbTouchMove);
      document.removeEventListener('touchend', onRightThumbTouchEnd);
    };
    document.addEventListener('touchmove', onRightThumbTouchMove);
    document.addEventListener('touchend', onRightThumbTouchEnd);
  };
  const onBarRightClick = (e: React.MouseEvent) => {
    let _maxValue = maxValue + step;
    if (_maxValue > max) {
      _maxValue = max;
    }
    set_maxValue(_maxValue);
  };
  const onMouseWheel = (e: React.WheelEvent) => {
    if (preventWheel === true) {
      return;
    }
    if (!e.shiftKey && !e.ctrlKey) {
      return;
    }
    let val = (max - min) / 100;
    if (val > 1) {
      val = 1;
    }
    if (e.deltaY < 0) {
      val = -val;
    }

    let _minValue = minValue;
    let _maxValue = maxValue;
    if (e.shiftKey && e.ctrlKey) {
      if (_minValue + val >= min && _maxValue + val <= max) {
        _minValue = _minValue + val;
        _maxValue = _maxValue + val;
      }
    } else if (e.ctrlKey) {
      val = _maxValue + val;
      if (val < _minValue + step) {
        val = _minValue + step;
      } else if (val > max) {
        val = max;
      }
      _maxValue = val;
    } else if (e.shiftKey) {
      val = _minValue + val;
      if (val < min) {
        val = min;
      } else if (val > _maxValue - step) {
        val = _maxValue - step;
      }
      _minValue = val;
    }
    setIsChange(false);
    set_maxValue(_maxValue);
    set_minValue(_minValue);
    _wheelTimeout && window.clearTimeout(_wheelTimeout);
    _wheelTimeout = window.setTimeout(() => {
      setIsChange(true);
    }, 100);
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
    _minValue = +_minValue;
    if (_minValue < min) {
      _minValue = min;
    }
    if (_minValue > max) {
      _minValue = max;
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

    if (_maxValue > max) {
      _maxValue = max;
    }
    if (_maxValue < min) {
      _maxValue = min;
    }
    setIsChange(false);
    set_maxValue(+_maxValue);
  }, [props.maxValue, min, max, step]);
  const { parentProps: progresAllTimeWPMsProps, Popper: AllTimePopper } =
    usePopover(
      'All Time WPM for this module = ' +
        _maxValue +
        '\r\n ' +
        'Session WPM for this module = ' +
        minValue,
    );

  const { parentProps: progresSessionWPMsProps, Popper: LocalPopper } =
    usePopover(
      'All Time WPM for this module - ' +
        _maxValue.toFixed(0) +
        `\n` +
        'Session WPM for this module - ' +
        minValue.toFixed(0),
    );

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
      {LocalPopper}
      {AllTimePopper}
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
          {...progresAllTimeWPMsProps}
          {...progresSessionWPMsProps}
        />
        <div
          className="thumb thumb-left absolute"
          style={{ backgroundColor: props.thumbLeftColor }}
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
          {...progresAllTimeWPMsProps}
        />
        <div
          className="thumb thumb-right absolute"
          style={{ backgroundColor: props.thumbRightColor }}
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
