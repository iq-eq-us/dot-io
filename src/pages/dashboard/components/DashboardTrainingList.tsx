import React from 'react';
import DashboardTrainingItemRow, {
  TRAINING_BAR_COLOR,
} from './DashboardTrainingItem';
import Column from '../../../components/column';
import styled from 'styled-components';

const DashboardTrainingList = (): ReactElement => {
  return (
    <DashboardListColumn>
      <AlphabeticTierRow />
      <AmalgamateTierRow />
      <LexicalTierRow />
      <ChordalTierRow />

      <VerticalBlueBar />
    </DashboardListColumn>
  );
};

export default DashboardTrainingList;

const AlphabeticTierRow = () => (
  <DashboardTrainingItemRow
    tutorialButtonTitle="Orientation"
    exerciseButtonTitle="Alphabet Training"
    contentText="0 wpm"
    tierTitle="Alphabetic"
    shouldDisplayHeader
  />
);

const AmalgamateTierRow = () => (
  <DashboardTrainingItemRow
    tutorialButtonTitle="Trigram Tutorial"
    exerciseButtonTitle="Trigram Training"
    contentText="Average Writing Speed = 13 wpm"
    tierTitle="Amalgamate"
  />
);

const LexicalTierRow = () => (
  <DashboardTrainingItemRow
    tutorialButtonTitle="Lexical Tutorial"
    exerciseButtonTitle="Lexical Training"
    contentText="Average Speed of 'Hunt & Peck' Typist = 27 wpm"
    tierTitle="Lexical"
  />
);

const ChordalTierRow = () => (
  <DashboardTrainingItemRow
    tutorialButtonTitle="Chording Tutorial"
    exerciseButtonTitle="Chord Training"
    contentText="Average Speed of Keyboard User = 40 wpm"
    tierTitle="Chordal"
  />
);

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
