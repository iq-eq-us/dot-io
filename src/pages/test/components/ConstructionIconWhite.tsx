import React from 'react';

function ConstructionIconWhite(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="grey"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-lock"
    >
      {/* Box */}
      <path d="M2,2 L2,12" />
      <path d="M2,2 L22,2" />
      <path d="M22,2 L22,12" />
      <path d="M2,12 L22,12" />
      {/* Legs */}
      <path d="M5,14 L5,22" />
      <path d="M19,14 L19,22" />
      {/* Slashes */}
      <path d="M10,2 L2,6" />
      <path d="M18,2 L2,10" />
      <path d="M22,4 L6,12" />
      <path d="M22,8 L14,12" />
    </svg>
  );
}

export default ConstructionIconWhite;
