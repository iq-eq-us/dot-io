import React, { ReactElement } from 'react';
import {PianoHeader} from './component/PianoHeader';
import {
    ManagerPageContainer,
    Table,
    ChordContainer,
    PageContainer,
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
      </TopSectionContainer>
      </ManagerPageContainer>
      </React.Fragment>

      
    );
  
  };
  export default Piano;