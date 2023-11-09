import React, { ReactElement } from 'react';

export function SettingsHeader({
  transitionTransform,
}: {
  transitionTransform: string;
}): ReactElement {
  return (
    <span
      className={`text-white text-2xl mb-2 font-semibold ${transitionTransform}`}
    >
      Settings
    </span>
  );
}
