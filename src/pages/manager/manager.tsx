import React, { ReactElement } from 'react';
import { ChordManagerHeader } from './components/ChordManagerHeader';

const Manager = (): ReactElement => {
  React.useEffect(() => {
    document.title = "CharaChorder Launchpad"
  }, []);

  return (
    <ChordManagerHeader />
 

  );
};

export default Manager;