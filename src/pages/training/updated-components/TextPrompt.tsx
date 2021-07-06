import React, { ReactElement } from 'react';

export function TextPrompt(): ReactElement {
  return (
    <div
      className={`
        text-xs font-bold mt-12 flex flex-col items-center w-full justify-center text-white
        sm:text-xl md:text-2xl xl:mt-24
      `}
    >
      <div className={`flex flex-row gap-[1vw] justify-center w-full`}>
        <span className="text-green-500 underline">America</span>
        <span>song</span>
        <span>most</span>
        <span>learn</span>
        <span>world</span>
        <span>light</span>
        <span>water</span>
        <span>have</span>
        <span>time</span>
        <span>big</span>
      </div>
      <div className={`flex flex-row gap-[1vw] justify-center w-full mt-2`}>
        <span>around</span>
        <span>far</span>
        <span>from</span>
        <span>old</span>
        <span>up</span>
        <span>are</span>
        <span>at</span>
        <span>good</span>
        <span>them</span>
        <span>year</span>
      </div>
    </div>
  );
}
