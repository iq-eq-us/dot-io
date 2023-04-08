import styled from 'styled-components';

interface ContainerProps {
  isDisplayingModal: boolean;
  isTestTier: boolean;
}

export const StatisticsColumnContainer = styled.div.attrs<ContainerProps>(
  (props) => {
    return {
      className: `
      ${props.isDisplayingModal && props.isTestTier ? 'visible' : 'invisible'}
      fixed inset-0 bg-[#121212E5]
      min-w-[324px] overflow-y-scroll max-h-full rounded-lg
      lg:block lg:bg-transparent lg:relative lg:overflow-hidden
    `,
    };
  },
)<ContainerProps>``;
