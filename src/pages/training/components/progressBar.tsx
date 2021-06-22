import React, { ReactElement } from 'react';

interface ProgressBarProps {
  /** A value between 0-100, represents the percentage the progress bar is filled. */
  progress: number;
}

export default function ProgressBar({
  progress,
}: ProgressBarProps): ReactElement {
  return (
    <div className="relative pt-1">
      <div className="overflow-hidden h-6 mb-2 text-xs flex bg-red-800">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
        ></div>
      </div>
    </div>
  );
}
