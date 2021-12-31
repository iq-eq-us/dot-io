import React, { ReactElement } from 'react';
import { ChordManagerHeader } from './components/ChordManagerHeader';
import { ConnectButton } from '../manager/components/connect'
import { DisconnectButton } from '../manager/components/disconnect'
import { ImportChords } from '../manager/components/importChords'
import { BootLoaderButton } from '../manager/components/bootLoader'
import { RebootButton } from '../manager/components/reboot'
import { AddHeaders } from '../manager/components/addHeaders'
import { Download } from '../manager/components/download'
import { Clear } from '../manager/components/resetDataTable'
import { Export } from '../manager/components/exportLibrary'
import { AddChordMap } from '../manager/components/addChordMap'
import { PressCommit } from '../manager/components/commitAll'



import {
  ManagerPageContainer,
  Table,
  ChordContainer,
  PageContainer,
  TopSectionContainer
  
  
} from '../manager/manager.styled';

const Manager = (): ReactElement => {
  React.useEffect(() => {
    document.title = "CharaChorder Launchpad"
  }, []);

  return (
    

<React.Fragment>
<ManagerPageContainer>
  <TopSectionContainer>
   <ChordManagerHeader/>
   <Table>
    <ConnectButton/>
    <DisconnectButton/>
    <div/>    
    <BootLoaderButton/>
    <RebootButton/>
    <Clear/>
    <PressCommit/>
    <div/>
    <ImportChords/>
    <Download/>
    <Export/>
    </Table>
    <PageContainer>
    <AddHeaders/>
    <ChordContainer>
    <div/>
    <div/>

    <AddChordMap/>
    </ChordContainer>

    </PageContainer>
  
    </TopSectionContainer>
    </ManagerPageContainer>
    </React.Fragment>

  );

};

export default Manager;