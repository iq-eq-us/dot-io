import styled from 'styled-components';

export const TagSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 20px;
  text-align: center;
`;

export const TagSelectionHeader = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  font-weight: 500;
`;

export const TagContainerWrapper = styled.div`
  height: 400px;
  margin-top: 20px;
  border: 1px solid #ffffff;
  padding: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
`;
