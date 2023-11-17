import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 30px;
`;

export const SplitLeft = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
  width: 50%;
`;

export const SplitRight = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 50px;
  width: 50%;
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
`;

export const ActionButton = styled.button.attrs({
  className:
    'import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative',
})`
  font-size: 1.2rem;
  width: 100px;
  height: 50px;
`;

export const BeginButton = styled.button.attrs({
  className:
    'import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative',
})`
  font-size: 1.2rem;
  width: 150px;
  height: 50px;
`;
