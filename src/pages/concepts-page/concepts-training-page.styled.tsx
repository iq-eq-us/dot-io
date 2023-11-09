import styled from 'styled-components';

const height = 'height: calc(100vh - 64px);';

export const PageContainer = styled.div.attrs({
  className: 'text-gray-600 body-font flex flex-row',
})`
  background-color: #222424;
  ${height}
`;
