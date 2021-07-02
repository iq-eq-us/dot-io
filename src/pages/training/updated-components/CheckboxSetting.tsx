import React, { ReactElement } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  title: string;
}

export function CheckboxSetting({
  title,
  onChange,
  checked,
}: CheckboxProps): ReactElement {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">{title}</label>
      <div className="w-1/2">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className="ml-2">Enabled</span>
      </div>
    </div>
  );
}
