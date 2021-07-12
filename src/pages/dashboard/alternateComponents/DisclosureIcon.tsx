import React, { ReactElement } from 'react';

interface Props {
  open?: boolean;
}

function DisclosureIcon({ open }: Props): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-chevrons-down transition-transform ${
        open ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <polyline points="7 13 12 18 17 13" />
      <polyline points="7 6 12 11 17 6" />
    </svg>
  );
}

export default DisclosureIcon;
