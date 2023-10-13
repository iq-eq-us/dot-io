import React, { ReactElement } from 'react';

export function AnalyticalDashboardHeader(): ReactElement {
  const user = "Jane's";

  return (
    <div className="flex flex-row w-full">
      <div className="lg:w-1/2 w-full mb-6"></div>
      <p className="pl-28 pt-0 lg:w-112 h-50 text-center leading-relaxed text-4xl text-gray-300 font-medium font-mono">
        Welcome to {user} Dashboard!
      </p>
    </div>
  );
}
