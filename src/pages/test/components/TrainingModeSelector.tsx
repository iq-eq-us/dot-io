import React, { ReactElement, useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/store';
import styled from 'styled-components';
import type { TrainingLevels } from 'src/models/trainingLevels';
import { connectDeviceAndPopUp } from '../../../../src/pages/manager/components/connect';
import { getId } from '../../../../src/pages/manager/components/getID';
import { useWordsPerMinute } from '../../../hooks/useWordsPerMinute';
import { createEmptyChordStatistics } from '../../../models/trainingStatistics';

export function TrainingModeSelector(): ReactElement {
  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  const trainingScenario = useStoreState(
    (store: any) => store.currentTrainingScenario,
  );
  const testValue = useStoreState((store: any) => store.wordTestNumber);
  const trainingLevel = useStoreState((store: any) => store.trainingLevel);
  const moduleNumber = useStoreState((store: any) => store.moduleNumber);
  const setModuleNumber = useStoreActions(
    (store: any) => store.setModuleNumber,
  );
  const setDownloadModuleModalToggle = useStoreActions(
    (store: any) => store.setDownloadModuleModalToggle,
  );
  const wpm = useWordsPerMinute();

  const [checkIfUserChangedLevels, setCheckIfUserChangedLevels] = useState(
    'CPM' as TrainingLevels,
  );

  async function LearnPageFunction(value: any, tier: TrainingLevels) {
    const payload: any[] = [];
    payload.push(value);
    sessionStorage.removeItem('tempTestDeIncrement');
    beginTraining(payload);
  }
  function allChords() {
    const doesLibraryExist = localStorage.getItem('chordsReadFromDevice');
    const id = getId();
    if ((id != null && doesLibraryExist == undefined) || null) {
      connectDeviceAndPopUp();
      setDownloadModuleModalToggle(true as boolean);
    } else {
      LearnPageFunction('ALLCHORDS', trainingLevel);
    }
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
  function whatModuleSelectionToShow() {
    const tempStoredChordStatistics: any[] = [];

    if (checkIfUserChangedLevels != trainingLevel) {
      setCheckIfUserChangedLevels(trainingLevel);
      setModuleNumber(1);
    }
    if (trainingLevel == 'CPM') {
      return (
        <React.Fragment>
          <button
            {...(moduleNumber == 1
              ? { className: ' text-white m-2 font-mono' }
              : { className: ' text-neutral-400 m-2 font-mono' })}
            onClick={() => [
              LearnPageFunction('ALPHABET', trainingLevel),
              setModuleNumber(1),
            ]}
          >
            Letters
          </button>
          <div>/</div>
          <button
            {...(moduleNumber == 2
              ? { className: ' text-white m-2 font-mono' }
              : { className: ' text-neutral-400 m-2 font-mono' })}
            onClick={() => [
              LearnPageFunction('TRIGRAM', trainingLevel),
              document.getElementById('txt_Name')?.focus(),
              setModuleNumber(2),
            ]}
          >
            Trigrams
          </button>
          <div>/</div>
          <button
            {...(moduleNumber == 3
              ? { className: ' text-white m-2 font-mono' }
              : { className: ' text-neutral-400 m-2 font-mono' })}
            onClick={() => [
              LearnPageFunction('LEXICAL', trainingLevel),
              document.getElementById('txt_Name')?.focus(),
              setModuleNumber(3),
            ]}
          >
            Words
          </button>
          <div>/</div>
          <button
            {...(moduleNumber == 4
              ? { className: ' text-white m-2 font-mono' }
              : { className: ' text-neutral-400 m-2 font-mono' })}
            onClick={() => [
              TestPageFunction('LEXICAL', 26),
              document.getElementById('txt_Name')?.focus(),
              setModuleNumber(4),
            ]}
          >
            Test
          </button>
        </React.Fragment>
      );
    } else if (trainingLevel == 'CHM') {
      return (
        <React.Fragment>
          <button
            {...(moduleNumber == 1
              ? { className: ' text-white m-2 font-mono' }
              : { className: ' text-neutral-400 m-2 font-mono' })}
            onClick={() => [
              LearnPageFunction('LEXICAL', trainingLevel),
              document.getElementById('txt_Name')?.focus(),
              setModuleNumber(1),
            ]}
          >
            English 200
          </button>
          <div>/</div>
          <button
            {...(moduleNumber == 2
              ? { className: ' text-white m-2 font-mono' }
              : { className: ' text-neutral-400 m-2 font-mono' })}
            onClick={() => [
              allChords(),
              document.getElementById('txt_Name')?.focus(),
              setModuleNumber(2),
            ]}
          >
            All Chords
          </button>
          <div>/</div>
          <button
            {...(moduleNumber == 3
              ? { className: ' text-white m-2 font-mono' }
              : { className: ' text-neutral-400 m-2 font-mono' })}
            onClick={() => [
              LearnPageFunction('LEXICOGRAPHIC', trainingLevel),
              document.getElementById('txt_Name')?.focus(),
              setModuleNumber(3),
            ]}
          >
            Custom
          </button>
        </React.Fragment>
      );
    }
  }
  return (
    <React.Fragment>
      <ItemsContainer>{whatModuleSelectionToShow()}</ItemsContainer>
    </React.Fragment>
  );
}

export async function oneTimeCreateStoredChordStats(
  value: any,
  tier: any,
  library,
) {
  const check = localStorage?.getItem(tier + '_' + value);
  if (check == null || undefined) {
    const storedChordStatArray = [];
    for (let i = 0; i < Object.keys(library).length; i++) {
      storedChordStatArray.push(
        createEmptyChordStatistics(Object.keys(library)[i], value),
      );
    }
    localStorage.setItem(
      tier + '_' + value,
      JSON.stringify({ statistics: storedChordStatArray }),
    );
  }
}
const ItemsContainer = styled.div`
  height: 50px;
  display: flex;
  color: white;
  position: relative;
  flex-direction: row;
  padding: '1rem';
  justify-content: center;
  align-items: center;
`;
