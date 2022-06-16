import React, { ReactElement, useEffect } from 'react';
import { useStoreState } from '../store/store';

interface Props {
  onClose: (isAutoWriteEnabled: boolean) => void;
}

export const PromptBeforeClosing = ({ onClose }: Props): ReactElement => {
  const isAutoWrite = useStoreState(
    (store) => store.trainingSettings.isAutoWrite,
  );

  const shouldPromptBeforeClosing =
    document.location.href.includes('training') && !isAutoWrite;

  useEffect(() => {
    if (shouldPromptBeforeClosing)
      window.addEventListener('beforeunload', alertUser);
    window.addEventListener('unload', handleTabClosing);

    return () => {
      if (shouldPromptBeforeClosing)
        window.removeEventListener('beforeunload', alertUser);
      window.removeEventListener('unload', handleTabClosing);
    };
  }, [isAutoWrite]);

  const handleTabClosing = () => {
    onClose(isAutoWrite);
  };

  const alertUser = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  };

  return <span />;
};
