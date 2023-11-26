import styled from 'styled-components';

export const FullWidthFullHeightContainer = styled.div.attrs({
  className: 'relative h-full w-full',
})``;

export const SmallScreenButtons = styled.div.attrs({
  className: 'flex flex-row justify-between w-full mb-4',
})``;

export const FinishTrainingButton = styled.button.attrs({
  className:
    'import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative',
})`
  font-size: 1.2rem;
  width: 150px;
  height: 50px;
`;

export const ButtonContainer = styled.div.attrs({
  className: `
      text-md font-bold mt-12 flex flex-col items-center w-full justify-center text-white
      sm:text-xl md:text-2xl xl:mt-12 content:center
    `,
})``;
