import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Row from '../../../components/row';
import Column from '../../../components/column';
import DashboardTrainingRowButton from './DashboardTrainingRowButton';

interface DashboardTrainingItemProps {
  shouldDisplayHeader?: boolean;
  contentText?: string;
  tutorialButtonTitle?: string;
  exerciseButtonTitle?: string;
  tierTitle?: string;
  onClickTutorialButton?: () => void;
  onClickExerciseButton?: () => void;
  isDoubleButtonVariant?: boolean;
}

const DashboardTrainingItemRow = ({
  tierTitle,
  contentText,
  shouldDisplayHeader,
  tutorialButtonTitle,
  exerciseButtonTitle,
  onClickTutorialButton,
  onClickExerciseButton,
  isDoubleButtonVariant,
}: DashboardTrainingItemProps): ReactElement => {
  return (
    <Wrapper>
      <DashboardTrainingItemRowContainer>
        <ButtonRow center>
          <DashboardHeaderText>
            {shouldDisplayHeader ? 'Tutorials' : ''}
          </DashboardHeaderText>
          <Spacer />
          <DashboardHeaderText>
            {shouldDisplayHeader ? 'Exercises' : ''}
          </DashboardHeaderText>
        </ButtonRow>

        <DashboardHeaderContentText>{contentText}</DashboardHeaderContentText>
      </DashboardTrainingItemRowContainer>
      <ContentContainer>
        <FullHeightRow center>
          {isDoubleButtonVariant ? (
            <div className="flex flex-col justify-center">
              <DashboardTrainingRowButton
                doubleButtonVariant
                title="Impulse Chords"
              />
              <DashboardTrainingRowButton doubleButtonVariant title="Macros" />
            </div>
          ) : (
            <DashboardTrainingRowButton
              onClick={onClickTutorialButton}
              title={tutorialButtonTitle || ''}
            />
          )}
          <DashboardTrainingRowButton
            onClick={onClickExerciseButton}
            title={exerciseButtonTitle || ''}
          />
        </FullHeightRow>

        <TitleColumn>
          <TitleColumnText>{tierTitle || ''}</TitleColumnText>
          <TitleColumnText footer>Tier</TitleColumnText>
        </TitleColumn>
      </ContentContainer>
      <EndCapCircle />
    </Wrapper>
  );
};

export default DashboardTrainingItemRow;

export const TRAINING_BAR_COLOR = '#6D9FE6';
const ROW_HEIGHT = 24;
const BORDER_WIDTH = 1;
const ENDCAP_BORDER_WIDTH = 2;
const ENDCAP_HEIGHT = 32;

const TitleColumn = styled(Column)`
  align-items: flex-end;
  justify-content: center;
`;

interface TextProps {
  footer?: boolean;
}

const TitleColumnText = styled.p<TextProps>`
  font-size: ${(props) => (props.footer ? '1.2rem' : '2rem')};
  margin: 0;
  margin-left: 16px;
`;

const FullHeightRow = styled(Row)`
  height: 100%;
`;

const ButtonRow = styled(Row)`
  margin-left: 60px;
`;

const ContentContainer = styled.div`
  background-color: #1a1a1a;
  width: calc(100% + 2px);
  height: 100px;
  z-index: -10;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
`;

const DashboardTrainingItemRowContainer = styled(Row)`
  border-top: ${BORDER_WIDTH}px solid ${TRAINING_BAR_COLOR};
  border-bottom: ${BORDER_WIDTH}px solid ${TRAINING_BAR_COLOR};
  width: 100%;
  position: relative;
  background-color: black;
  z-index: initial;
  justify-content: space-between;
`;

const DashboardHeaderText = styled.p`
  font-size: 14px;
  height: 24px;
  margin: 0px;
  padding: 4px 0px;
  color: #808080;
  letter-spacing: 1px;
`;

const DashboardHeaderContentText = styled(DashboardHeaderText)`
  color: ${TRAINING_BAR_COLOR};
  font-size: 14px;
`;

const EndCapCircle = styled.div`
  height: ${ENDCAP_HEIGHT + ENDCAP_BORDER_WIDTH}px;
  width: ${ENDCAP_HEIGHT + ENDCAP_BORDER_WIDTH}px;
  border-radius: 50%;
  border: ${ENDCAP_BORDER_WIDTH}px solid ${TRAINING_BAR_COLOR};
  position: absolute;
  right: -${ENDCAP_HEIGHT / 1.2}px;
  top: ${-(ENDCAP_HEIGHT - ROW_HEIGHT + 2 * BORDER_WIDTH - 2) / 2}px;
  background-color: black;
  z-index: -1;
`;

const Spacer = styled.div`
  width: 88px;
`;
