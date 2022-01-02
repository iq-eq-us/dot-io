import React, { ReactElement } from 'react';
import PianoKeyBoard from './component/keyboard';
import {PianoHeader} from './component/PianoHeader';
import {
    ManagerPageContainer,
    TopSectionContainer
  } from './Piano.styled';

  const Piano = (): ReactElement => {
    React.useEffect(() => {
      document.title = "CharaChorder Launchpad"
    }, []);
  
    return (
      
  
  <React.Fragment>
  <ManagerPageContainer>

    <TopSectionContainer>
     <PianoHeader/>
      <PianoKeyBoard/>
      </TopSectionContainer>
      </ManagerPageContainer>
      </React.Fragment>

      
    );
  
  };
  export default Piano;