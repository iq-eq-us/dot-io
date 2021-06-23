import React, { ChangeEventHandler, ReactElement } from 'react';

interface NumberInputProps {
  labelTitle: string;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export default function NumberInput({
  labelTitle,
  value,
  onChange,
  disabled,
}: NumberInputProps): ReactElement {
  return (
    <div className="flex flex-row w-full justify-end mb-1">
      <label className={`mr-1 ${disabled && 'text-gray-500'}`}>
        {labelTitle}
      </label>
      <input
        className={`mr-2 leading-tight w-16 text-black`}
        type="number"
        value={value}
        onChange={onChange}
        disabled={disabled || false}
      />
    </div>
  );
}
