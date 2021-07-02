import React, { ReactElement } from 'react';

export function ProgressBar(): ReactElement {
  return (
    <div>
      <div className="flex flex-row items-end justify-between mb-2 text-sm sm:text-lg">
        <div className="text-white font-semibold">Complete: 24</div>
        <div className="text-white font-semibold">Current Level: 24/200</div>
        <div className="text-white font-semibold">Remaining: 2</div>
      </div>
      <div className="rounded bg-[#333] h-12 w-full p-1">
        <div className="rounded bg-red-500 w-full h-full w-full overflow-hidden">
          <div className="relative rounded-r-xl bg-green-500 w-1/3 h-full">
            <div className="absolute text-white font-semibold -right-8 -bottom-8">
              WPM: 20
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
