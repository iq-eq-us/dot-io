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
import { ImportChordLayout } from './components/importLayout';
import { ExportChordLayout } from './components/exportLayout';
import { AddLayoutHeaders } from './components/addHeadersLayout';
import { CommitAllLayoutChanges } from './components/commitAllLayouts';
import { UpgradeFunction } from './components/upgradeFunction';


import {
  ManagerPageContainer,
  Table,
  ChordContainer,
  PageContainer,
  TopSectionContainer
  
  
} from '../manager/manager.styled';

const Manager = (): ReactElement => {
  React.useEffect(() => {
    document.title = "dot i/o Device Manager"
  }, []);

  return (
    

<React.Fragment>
<ManagerPageContainer>
  <TopSectionContainer>
   <ChordManagerHeader/>
   <Table>
   <div className="font-mono text-xl ml-2">Connect</div>
    <ConnectButton/>
    <DisconnectButton/>
    <BootLoaderButton/>
    <RebootButton/>
    <div className="h-1 w-6/12 bg-green-500 rounded mb-10 mt-10" />
    <div className="font-mono text-xl ml-2">Layout</div>
    <ImportChordLayout/>
    <ExportChordLayout/>
    <CommitAllLayoutChanges/>
    <AddLayoutHeaders/>
    <div className="h-1 w-6/12 mt-6 bg-green-500 rounded mb-10" />
    <div className="font-mono text-xl ml-2">Library</div>
    <div id="commitAllProgress"/>
    <ImportChords/>
    <Export/>
    <Download/>
    <PressCommit/>
    <Clear/>    
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