import styled from 'styled-components';
import Column from '../../../components/Column';

export const DashboardRow = styled(Column).attrs({
  className: 'w-[650px]',
})`
  align-items: flex-start;
  width: 650px;
  margin-right: 40px;
`;
