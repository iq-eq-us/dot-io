import React, { ReactElement } from 'react';
import { useWordsPerMinute } from '../../../hooks/useWordsPerMinute';
import { blueTextStyle } from './trainingProgressContainer';

interface ProgressBarProps {
  /** A value between 0-100, represents the percentage the progress bar is filled. */
  progress: number;
}

export default function ProgressBar({
  progress,
}: ProgressBarProps): ReactElement {
  const wpm = useWordsPerMinute();

  return (
    <div className="relative pt-1">
      <div className="h-6 mb-2 text-xs flex bg-red-800">
        <div
          style={{ width: `${progress}%` }}
          className="relative shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-400"
        >
          <p
            style={blueTextStyle}
            className="absolute -bottom-8 -right-10 text-xl"
          >
            {wpm?.toFixed(0)} wpm
          </p>
        </div>
      </div>
    </div>
  );
}
