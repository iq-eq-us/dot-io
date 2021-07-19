import React, { MouseEventHandler, ReactElement } from 'react';

export interface ThirdButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const ThirdButton = ({
  title,
  onClick,
}: ThirdButtonProps): ReactElement => {
  return (
    <div
      onClick={onClick}
      className="flex-1 bg-white hover:bg-gray-200 py-2 rounded cursor-pointer active:bg-gray-300"
    >
      <p className="text-center w-full">{title}</p>
    </div>
  );
};
