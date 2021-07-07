import React, { ReactElement } from 'react';
import DashboardTrainingItemRow, {
  TRAINING_BAR_COLOR,
} from './DashboardTrainingItem';
import Column from '../../../components/router';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ROUTER_PATHS } from '../../../components/router';
import { useStoreActions } from '../../../store/store';

const TRAINING_VIDEOS = {
  alphabet: 'https://www.youtube.com/watch?v=Vq8NJd3J0Ag',
  trigram: 'https://www.youtube.com/watch?v=IiuEYX7QFjA',
  lexical: 'https://www.youtube.com/watch?v=HvVvxD48cDI',
  chord: 'https://www.youtube.com/watch?v=-4QuWCf8PKM',
};

const DashboardTrainingList = (): ReactElement => {
  return (
    <DashboardListColumn>
      <AlphabeticTierRow />
      <AmalgamateTierRow />
      <LexicalTierRow />
      <ChordalTierRow />

      <AdvancedTrainingRow />
      <ExpertTrainingRow />

      <VerticalBlueBar />
    </DashboardListColumn>
  );
};

export default DashboardTrainingList;

const AlphabeticTierRow = () => {
  const history = useHistory();
  const startAlphabetTraining = useStoreActions(
    (store) => store.beginTrainingAlphabetMode,
  );

  return (
    <DashboardTrainingItemRow
      tutorialButtonTitle="Orientation"
      exerciseButtonTitle="Alphabet Training"
      contentText="0 wpm"
      tierTitle="Alphabetic"
      shouldDisplayHeader
      onClickExerciseButton={() => {
        startAlphabetTraining();
        history.push(ROUTER_PATHS.home);
      }}
      onClickTutorialButton={() => {
        window.open(TRAINING_VIDEOS.alphabet, '_blank');
      }}
    />
  );
};

const AmalgamateTierRow = () => {
  const history = useHistory();
  const startTrigramTraining = useStoreActions(
    (store) => store.beginTrainingTrigramMode,
  );

  return (
    <DashboardTrainingItemRow
      tutorialButtonTitle="Trigram Tutorial"
      exerciseButtonTitle="Trigram Training"
      contentText="Average Writing Speed = 13 wpm"
      tierTitle="Amalgamate"
      onClickExerciseButton={() => {
        startTrigramTraining();
        history.push(ROUTER_PATHS.home);
      }}
      onClickTutorialButton={() => {
        window.open(TRAINING_VIDEOS.trigram, '_blank');
      }}
    />
  );
};

const LexicalTierRow = () => {
  const history = useHistory();
  const startLexicalTraining = useStoreActions(
    (store) => store.beginTrainingLexicalMode,
  );

  return (
    <DashboardTrainingItemRow
      tutorialButtonTitle="Lexical Tutorial"
      exerciseButtonTitle="Lexical Training"
      contentText="Average Speed of 'Hunt & Peck' Typist = 27 wpm"
      tierTitle="Lexical"
      onClickExerciseButton={() => {
        startLexicalTraining();
        history.push(ROUTER_PATHS.home);
      }}
      onClickTutorialButton={() => {
        window.open(TRAINING_VIDEOS.lexical, '_blank');
      }}
    />
  );
};

const ChordalTierRow = () => {
  const history = useHistory();
  const startChordTraining = useStoreActions(
    (store) => store.beginTrainingChordMode,
  );

  return (
    <DashboardTrainingItemRow
      tutorialButtonTitle="Chording Tutorial"
      exerciseButtonTitle="Chord Training"
      contentText="Average Speed of Keyboard User = 40 wpm"
      tierTitle="Chordal"
      onClickExerciseButton={() => {
        startChordTraining();
        history.push(ROUTER_PATHS.home);
      }}
      onClickTutorialButton={() => {
        window.open(TRAINING_VIDEOS.chord, '_blank');
      }}
    />
  );
};

const ExpertTrainingRow = () => {
  // const history = useHistory();

  return (
    <DashboardTrainingItemRow
      tutorialButtonTitle="Advanced Certificate"
      exerciseButtonTitle="Expert Training"
      contentText="Average Speed of Human Speech = 120 wpm"
      tierTitle="SuperSonic"
      onClickExerciseButton={() => {
        // history.push(ROUTER_PATHS.chordTraining);
      }}
    />
  );
};

const AdvancedTrainingRow = () => {
  // const history = useHistory();

  return (
    <DashboardTrainingItemRow
      isDoubleButtonVariant
      exerciseButtonTitle="Advanced Training"
      contentText="Average Speed of Professional Typist = 75 wpm"
      tierTitle="LexicoGraphic"
      onClickExerciseButton={() => {
        // history.push(ROUTER_PATHS.chordTraining);
      }}
    />
  );
};

const DashboardListColumn = styled(Column)`
  width: 100%;
  position: relative;
`;

const VerticalBlueBar = styled.div`
  position: absolute;
  right: -18px;
  top: 0;
  height: 100%;
  border-right: 16px solid ${TRAINING_BAR_COLOR};
  z-index: 0;
`;
