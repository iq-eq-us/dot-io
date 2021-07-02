import React, { ReactElement } from 'react';

export function TextPrompt(): ReactElement {
  return (
    <div className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-12 xl:mt-24 flex flex-col items-center w-full gap-4 justify-center text-white">
      <div className="flex flex-row gap-6 justify-center w-full">
        <span className="text-green-500 underline">America</span>
        <span>song</span>
        <span>most</span>
        <span>learn</span>
        <span>world</span>
      </div>
      <div className="flex flex-row gap-6 justify-center w-full">
        <span>light</span>
        <span>water</span>
        <span>have</span>
        <span>time</span>
        <span>big</span>
      </div>
    </div>
  );
}
