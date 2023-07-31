import React, { ReactElement } from 'react';
import { ChordManagerHeader } from './components/ChordManagerHeader';
import { ConnectButton } from '../manager/components/connect';
import { DisconnectButton } from '../manager/components/disconnect';
import { ImportChords } from '../manager/components/importChords';
import { BootLoaderButton } from '../manager/components/bootLoader';
import { RebootButton } from '../manager/components/reboot';
import { AddHeaders } from '../manager/components/addHeaders';
import { Download } from '../manager/components/download';
import { Clear } from '../manager/components/resetDataTable';
import { Export } from '../manager/components/exportLibrary';
import { AddChordMap } from '../manager/components/addChordMap';
import { PressCommit } from './components/saveAll';
import { ImportChordLayout } from './components/importLayout';
import { ExportChordLayout } from './components/exportLayout';
import { CommitAllLayoutChanges } from './components/commitAllLayouts';
import { ChordMapColumn } from './components/ChordMapCardColumn';
import { ChordLayoutColumn } from './components/ChordLayoutCardColumn';
import { Terminal } from './components/Terminal';
import {
  ManagerPageContainer,
  Table,
  RightTable,
  ChordContainer,
  PageContainer,
  TopSectionContainer,
} from '../manager/manager.styled';
import { DeviceNavigationBar } from './components/DeviceNavigationBar';
import ManagersDeviceOverlay from './components/ManagersDeviceOverlay';

const Manager = (): ReactElement => {
  React.useEffect(() => {
    document.title = 'dot i/o Device Manager';
  }, []);

  return (
    <React.Fragment>
      <ManagerPageContainer>
        <TopSectionContainer>
          <ChordManagerHeader />

          <Table>
            <div className="font-mono text-xl ml-2">Connect</div>
            <ConnectButton />
            <DisconnectButton />
            <BootLoaderButton />
            <RebootButton />
            <div className="h-1 w-6/12 bg-[#3A5A42] rounded mb-10 mt-10" />
            <div className="font-mono text-xl ml-2">
              Layout{' '}
              <a
                rel="noreferrer"
                className="hover:text-[#40508d] active:text-[#40508d] animate-pulse"
                target="_blank"
                href="https://charachorder-config.com/"
              >
                {' '}
                External GUI for Chord Mapping
              </a>
            </div>
            <ImportChordLayout />
            <ExportChordLayout />
            <CommitAllLayoutChanges />
            <ChordLayoutColumn />
            <div className="h-1 w-6/12 mt-6 bg-[#3A5A42] rounded mb-10" />
            <div className="font-mono text-xl ml-2">Library</div>
            <div
              id="downloadCompletionPercentage"
              className="text-white mb-4 inline-block ml-2"
            />

            <div id="commitAllProgress" />

            <ImportChords />
            <Export />
            <Download />
            <PressCommit />
          </Table>
          <PageContainer>
            <ChordMapColumn />
            <ChordContainer>
              <div />
              <div />
              <AddHeaders />
              <AddChordMap />
            </ChordContainer>
            <div className="h-1 w-6/12 mt-16 bg-[#3A5A42] rounded mb-10" />

            <Terminal />
          </PageContainer>
        </TopSectionContainer>
      </ManagerPageContainer>
    </React.Fragment>
  );
};

export default Manager;
