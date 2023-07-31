import React, { ReactElement } from 'react';

export function DeviceNavigationBar(): ReactElement {
  return (
    <ul className="flex justify-center content-center items-center">
      <li className="flex-1 mr-2">
        <a className="text-center block border bg-green-500 border-blue-white rounded py-2 px-4 hover:bg-white text-black">
          Device Chords
        </a>
      </li>
      <li className="flex-1 mr-2">
        <a className="text-center block bg-green-500 border border-white rounded hover:border-gray-200 text-black hover:bg-gray-200 py-2 px-4">
          Device Key Maps
        </a>
      </li>
      <li className="text-center flex-1">
        <a className="text-center block border bg-green-500 border-white rounded hover:border-gray-200 text-black hover:bg-gray-200 py-2 px-4">
          Device Settings
        </a>
      </li>
    </ul>
  );
}
