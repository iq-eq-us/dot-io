import React, { useState, ReactElement } from 'react';
import { useStoreState, useStoreActions } from '../../../store/store';
import { _chordMaps } from '../../../../src/pages/manager/controls/maps';
import { downloadChordsForAllChordsModule } from '../../../../src/pages/manager/components/download';
import { MainControls } from '../../.././../src/pages/manager/controls/mainControls';
import { ProgressBar } from './ProgressBar';
import IQEQLogoImage from './assets/iqeq.png';
import { generateNewChordRecordForAllChordsModule } from './EditChordModal';

function ModuleCompleteModal(): ReactElement {
  const moduleNumber = useStoreState((store: any) => store.moduleNumber);
  const trainingLevel = useStoreState((store: any) => store.trainingLevel);
  const downloadModulModalToggle = useStoreState(
    (store: any) => store.downloadModulModalToggle,
  );
  const moduleCompleteModalToggle = useStoreState(
    (store: any) => store.moduleCompleteModalToggle,
  );
  const setModuleCompleteModalToggle = useStoreActions(
    (store: any) => store.setModuleCompleteModalToggle,
  );
  const setDownloadModulModalToggle = useStoreActions(
    (store: any) => store.setDownloadModulModalToggle,
  );
  const setStoredChordsRepresentation = useStoreActions(
    (store: any) => store.setStoredChordsRepresentation,
  );
  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  const setModuleNumber = useStoreActions(
    (store: any) => store.setModuleNumber,
  );

  const trainingLevelIsCPM = trainingLevel == 'CPM';

  const [value, setValue] = useState(false);

  function LearnPageFunction(value: string) {
    const payload: any[] = [];
    payload.push(value);
    sessionStorage.removeItem('tempTestDeIncrement');
    beginTraining(payload);
  }

  function TestPageFunction(value: string, testLength: any) {
    const payload: any[] = [];
    payload.push(value);
    payload.push(testLength);
    sessionStorage.removeItem('tempTestDeIncrement');
    sessionStorage.removeItem('Refresh');
    sessionStorage.setItem('CustomNonRefresh', JSON.stringify(1));
    sessionStorage.removeItem('tempTestDeIncrement');
    beginTraining(payload);
  }

  function selectTheTrainingMode() {
    if (trainingLevel == 'CPM') {
      if (moduleNumber < 4) {
        if (moduleNumber + 1 == 2) {
          LearnPageFunction('TRIGRAM');
        } else if (moduleNumber + 1 == 3) {
          LearnPageFunction('LEXICAL');
        } else if (moduleNumber + 1 == 4) {
          TestPageFunction('LEXICAL', 26);
        }
      }
      setModuleNumber(moduleNumber + 1);
    } else if (trainingLevel == 'CHM') {
      if (moduleNumber < 4) {
        if (moduleNumber + 1 == 2) {
          LearnPageFunction('LEXICAL');
        } else if (moduleNumber + 1 == 3) {
          LearnPageFunction('LEXICAL');
        }
        setModuleNumber(moduleNumber + 1);
      }
    }
  }

  async function downloadChords() {
    const done = await downloadChordsForAllChordsModule();
    console.log('THis is done in downloadCHords ' + done);
    setStoredChordsRepresentation(
      generateNewChordRecordForAllChordsModule(
        JSON?.parse(localStorage.getItem('chordsReadFromDevice')),
      ),
    );
    done == true
      ? [
          LearnPageFunction('ALLCHORDS'),
          setDownloadModulModalToggle(!downloadModulModalToggle),
        ]
      : '';
  }

  return (
    <React.Fragment>
      {moduleCompleteModalToggle && trainingLevelIsCPM ? (
        <div className="flex-row border-zinc-400 border-4	left-56 rounded-xl absolute ml-80 mt-24 justify-center h-2/5 bg-white">
          <button
            className="close absolute ml-96 text-5xl pt-4 text-[#181818]"
            onClick={() => [
              setModuleCompleteModalToggle(!moduleCompleteModalToggle),
            ]}
          >
            &times;
          </button>
          <p className="pt-4 m-10 font-bold ">Congratulations!</p>
          <p className=" ml-10 mr-10">You have completed the current module!</p>
          <p className=" ml-10 mr-10 ">
            Press &lsquo;Continue&rsquo; below to move on to the next Module,
          </p>
          <p className=" ml-10 mr-10 mb-10">
            Or press &lsquo;X&rsquo; to continue practicing.
          </p>
          <button
            className="drop-shadow-2xl right-arrow text-white rounded inline-block p-2 ml-36 focus bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
            onClick={() => [
              selectTheTrainingMode(),
              setModuleCompleteModalToggle(!moduleCompleteModalToggle),
            ]}
          >
            {' '}
            Move To Next Module
          </button>
        </div>
      ) : null}

      {downloadModulModalToggle ? (
        <div className="flex-row border-zinc-400 border-4	left-56 rounded-xl absolute ml-80 mt-24 justify-center h-2/5 bg-white">
          <button
            className={`close absolute ml-96 text-5xl pl-8 pt-4 text-[#181818] ${
              value == true ? `hidden` : ``
            }`}
            onClick={() => [
              setDownloadModulModalToggle(!downloadModulModalToggle),
            ]}
          >
            &times;
          </button>
          <p className="pt-2 m-10 font-bold mr-64">Download Your Chords!</p>
          <p className=" ml-10 mr-10" id="statusDiv"></p>
          <p className=" ml-10 mr-10 text-white">
            Or press &lsquo;X&rsquo; to continue practicing. Or press
            &lsquo;X&rsquo; to conti.
          </p>
          <img
            src={IQEQLogoImage}
            className={`h-28 w-28 animate-bounce  ml-48 ${
              value == false ? `hidden` : ``
            }`}
          />
          <p
            className=" ml-10 mr-10 ml-36"
            id="downloadCompletionPercentage"
          ></p>
          <button
            className={`drop-shadow-2xl right-arrow text-white rounded inline-block p-2 ml-48 mt-4 focus bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] ${
              value == true ? `hidden` : ``
            }`}
            onClick={() => [setValue(true), downloadChords()]}
          >
            Download
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default ModuleCompleteModal;
