import styled from 'styled-components';

interface TableContainerProps {
  transitionTransform: string;
}

export const PreviousTestTableContainer = styled.div.attrs<TableContainerProps>(
  (props) => {
    return {
      className: `flex flex-col items-end ${props.transitionTransform} h-full min-w-[300px]`,
    };
  },
)<TableContainerProps>``;
