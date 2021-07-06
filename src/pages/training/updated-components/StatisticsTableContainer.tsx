import styled from 'styled-components';

interface TableContainerProps {
  transitionTransform: string;
}

export const StatisticsTableContainer = styled.div.attrs<TableContainerProps>(
  (props) => {
    return {
      className: `flex flex-col items-end ${props.transitionTransform}`,
    };
  },
)<TableContainerProps>``;
