import styled from 'styled-components';

export const TrainingContainer = styled.div.attrs({
  className: `
      text-md font-bold mt-12 flex flex-col items-center w-full justify-center text-white
      sm:text-xl md:text-2xl xl:mt-12 content:center
    `,
})``;

export const TrainingPromptBox = styled.div.attrs({
  className: `
      flex text-md font-bold flex flex-col items-center w-full	justify-center text-gray-400
      sm:text-xl md:text-2xl bg-[#FFF] rounded-3xl p-4 h-50 m-auto font-mono
    `,
})``;
