import React, { ReactElement } from 'react';

export function CopyrightNotice({
  lightBg,
}: {
  lightBg?: boolean;
}): ReactElement {
  return (
    <div
      className={`flex py-2 flex-row text-gray-500 items-center justify-center text-sm ${
        lightBg && 'bg-[#222424]'
      }`}
    >
      © Copyright CharaChorder {new Date().getFullYear()}
    </div>
  );
}
