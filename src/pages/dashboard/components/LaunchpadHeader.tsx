import React, { ReactElement } from 'react';

export function LaunchpadHeader(): ReactElement {
  return (
    <div className="flex flex-wrap w-full mb-20">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
          LaunchPad Learn
        </h1>
        <div className="h-1 w-20 bg-green-500 rounded" />
      </div>
      <p className="lg:w-1/2 w-full leading-relaxed text-gray-300 font-semibold">
        Welcome to the LaunchPad Learn! Here you can view tutorials to get to
        know your Charachorder and practice your typing to level up your
        abilities. We&apos;re excited to see how far you will go!
      </p>
    </div>
  );
}
