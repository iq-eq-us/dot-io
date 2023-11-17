import styled from 'styled-components';

export const ItemsContainer = styled.div`
  height: 50px;
  display: flex;
  color: white;
  position: relative;
  flex-direction: row;
  padding: '1rem';
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #222424;
`;

const height = 'height: calc(100vh - 64px);';

export const PageContainer = styled.div.attrs({
  className: 'text-gray-600 body-font flex flex-row',
})`
  background-color: #222424;
  min-height: ${height};
`;
