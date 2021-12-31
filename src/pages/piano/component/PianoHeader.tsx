import React, { ReactElement } from 'react';

export function PianoHeader(): ReactElement {
  return (
    <div className="flex flex-wrap w-full mb-20">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
          Chara-Piano
        </h1>
        <div className="h-1 w-20 bg-green-500 rounded" />
      </div>
      <p className="lg:w-1/2 w-full leading-relaxed text-gray-300 font-semibold">
        Welcome to the CharaPiano! Here you can use your CharaChorder to record you&apos;re own CharaChorder Piano Piece.
        


      </p>
    </div>
  );
}
