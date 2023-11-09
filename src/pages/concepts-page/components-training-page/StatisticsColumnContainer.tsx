import styled from 'styled-components';

interface ContainerProps {
  isDisplayingModal: boolean;
  isTestTier: boolean;
}

export const StatisticsColumnContainer = styled.div<ContainerProps>`
  position: fixed;
  inset: 0;
  background-color: #121212e5;
  min-width: 324px;
  overflow-y: scroll;
  max-height: 100%;
  border-radius: 1rem;

  @media (min-width: 1024px) {
    position: relative;
    background-color: ${({ isTestTier }) =>
      isTestTier ? '#121212E5' : 'transparent'};
    overflow: hidden;
  }
`;
