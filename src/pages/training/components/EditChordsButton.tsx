import React, { ReactElement } from 'react';
import type { ActionCreator } from 'easy-peasy';

interface EditChordProps {
  openChordEditModal: ActionCreator<void>;
}

export function EditChordsButton({
  openChordEditModal,
}: EditChordProps): ReactElement {
  return (
    <button className="rounded mt-4 mr-4" onClick={() => openChordEditModal()}>
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
        className="feather feather-edit text-gray-100 hover:text-gray-400 active:text-gray-500 pb-1"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>
  );
}
