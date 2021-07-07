import styled from 'styled-components';

interface ContainerProps {
  isDisplayingModal: boolean;
}

export const StatisticsColumnContainer = styled.div.attrs<ContainerProps>(
  (props) => {
    return {
      className: `
      ${props.isDisplayingModal ? 'visible' : 'invisible'}
      fixed inset-0 bg-[#121212E5]
      min-w-[324px] overflow-y-scroll max-h-full rounded-lg p-4 pr-6 pb-6
      lg:block lg:w-1/4 lg:bg-transparent lg:relative lg:mt-4 lg:overflow-hidden
      2xl:mr-8
    `,
    };
  },
)<ContainerProps>``;
