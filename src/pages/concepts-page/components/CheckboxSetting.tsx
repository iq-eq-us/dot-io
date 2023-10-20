import React, { ReactElement } from 'react';
import usePopover from '../../../hooks/usePopover';
import HelpCircleIcon from './HelpCircleIcon';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  title: string;
  helpText?: string;
}

export function CheckboxSetting({
  title,
  onChange,
  checked,
  helpText,
}: CheckboxProps): ReactElement {
  const { parentProps, Popper } = usePopover(helpText || '');

  return (
    <div className="mb-4">
      {Popper}
      <label
        className="inline-flex text-sm font-bold mb-1 flex-row gap-2 items-center"
        {...parentProps}
      >
        {title}

        <HelpCircleIcon />
      </label>
      <div className="w-1/2">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span onClick={onChange} className="ml-2 select-none">
          Enabled
        </span>
      </div>
    </div>
  );
}
