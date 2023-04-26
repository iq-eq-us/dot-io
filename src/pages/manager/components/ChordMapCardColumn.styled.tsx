import styled from 'styled-components';

export const InputIdentifiers = styled.div.attrs({
    className: `text-sm leading-tight text-grey-dark`,
  })``;
  export const CardContainer = styled.div.attrs({
    className: `md:flex md:items-center m-2 px-6 py-4 bg-[#333] rounded-md shadow-sm shadow-neutral-700 h-12

    `,
  })``;

  export const CardCancelButton = styled.button.attrs((props: {cancelled: boolean , shouldDelete: boolean}) =>({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-neutral-400 text-black hover:bg-purple hover:text-white  ${props.cancelled || props.shouldDelete ? 'hidden' : ''}`,
    
}))``;

export const CardSaveButton = styled.button.attrs((props: {cancelled: boolean , shouldDelete: boolean}) =>({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#22c55e] text-purple hover:bg-purple hover:text-black ${props.cancelled || props.shouldDelete ? 'hidden' : ''}`,
    
}))``;

  export const CardEditButton = styled.button.attrs((props: {cancelled: boolean, shouldDelete: boolean}) =>({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#22c55e] text-purple hover:bg-purple hover:text-black ${(!props.cancelled || props.shouldDelete) ? 'hidden' : ''}`,

}))``;
  export const CardConfirmDeleteButton = styled.button.attrs((props: {shouldDelete: boolean}) =>({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#22c55e] text-white hover:bg-white hover:text-black ${!props.shouldDelete ? 'hidden' : ''}`,
}))``;

  export const CardCancelDeleteButton = styled.button.attrs((props: {shouldDelete: boolean}) =>({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-neutral-400 text-white hover:bg-purple hover:text-black ${!props.shouldDelete ? 'hidden' : ''}`,
}))``;

  export const CardDeleteButton = styled.button.attrs((props: {shouldDelete: boolean}) =>({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#FF0000] text-purple hover:bg-purple hover:text-black ${props.shouldDelete ? 'hidden' : ''}`,
}))``;
  export const ChordTextBox = styled.input.attrs((props: {placeholder: string, disabled: boolean, value: string}) => ({
    className: `${props.disabled ? 'placeholder:text-white' : ''} block h-4 sm:h-6 rounded-xs mx-auto shadow-sm shadow-black mb-4 sm:mb-0 sm:mr-4 sm:ml-0 text-black text-center overflow-y-auto rounded ${props.disabled ? 'disabled' : ''}`,
    type: 'text',
    placeholder: `${props.placeholder}`,
    value:`${props.value}`,
    

  }))``;
  export const PhraseTextBox = styled.input.attrs((props: {placeholder: string, disabled: boolean}) =>({
    className: `${props.disabled ? 'placeholder:text-white' : ''} block h-4 sm:h-6 rounded-xs mx-auto mb-4 shadow-sm shadow-black sm:mb-0 sm:mr-4 sm:ml-0 text-black text-center  rounded ${props.disabled ? 'disabled' : ''} `,
    type: 'text',
    placeholder: `${props.placeholder}`,
  }))``;
  