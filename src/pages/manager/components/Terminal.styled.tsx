import styled from 'styled-components';

export const TerminalItem = styled.div.attrs((props: {value : string}) =>({
    className: `text-sm leading-tight text-grey-dark disabled`,
    value:`${props.value}`,
  }))``;
  export const TerminalContainer = styled.h1.attrs({
    className: `md:flex  flex-col m-2 px-6 py-4 bg-[#333] h-96 w-6/12 rounded-md shadow-sm shadow-neutral-700
    `,
  })``;

  export const TerminalHeader = styled.h1.attrs({
    className: `text-white text-md text-bold font-medium
    `,
  })``;

  export const TerminalHistoryContainer = styled.div.attrs({
    className: `md:flex pt-4 pl-2 flex-col font-normal text-black bg-[#C5C5C5] h-full w-full rounded-md shadow-sm shadow-neutral-700 overflow-y-auto
    `,
  })``;

  
  export const TerminalInput = styled.input.attrs((props: {value: string}) =>({
    className: ` m-2 block h-4 relative sm:h-6 w-full rounded-xs mx-auto shadow-sm shadow-black mb-4 sm:mb-0 sm:mr-4 sm:ml-0 text-black rounded `,
    type: 'text',
    value: `${props.value}`
  }))``;

  export const SendButton = styled.button.attrs(() =>({
    className: `m-1 font-semibold relative rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#FFFFF] text-purple hover:bg-purple hover:text-black `,
  }))``;

