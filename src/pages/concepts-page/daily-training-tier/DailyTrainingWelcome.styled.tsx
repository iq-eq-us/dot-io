import styled from 'styled-components';

export const Fill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
`;

export const TrisplitScreen = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin: 30px;
  padding: 30px;
`;

export const LabeledAction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const ActionButton = styled.button.attrs({
  className:
    'import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative',
})``;
