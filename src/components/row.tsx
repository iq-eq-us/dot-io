import styled from 'styled-components';

interface Props {
  center?: boolean;
}

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  ${(props) => (props.center ? 'align-items: center;' : '')}
`;

export default Row;
