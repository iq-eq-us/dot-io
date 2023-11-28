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

const height = 'calc(100vh - 80px);';

export const PageContainer = styled.div.attrs({
  className: 'text-gray-600 body-font flex',
})`
  flex-direction: column;
  background-color: #222424;
  height: calc(100% - 111px);
`;

export const ConceptsContainer = styled.div`
  min-height: ${height};
`;
