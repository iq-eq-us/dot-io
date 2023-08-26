import React, { ReactElement } from 'react';

function Circle(): ReactElement {
  return (
    <svg height="50%" width="5%" className="absolute overflow-visible mt-1">
      <circle
        cx="38"
        cy="30"
        r="33"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

export default Circle;
