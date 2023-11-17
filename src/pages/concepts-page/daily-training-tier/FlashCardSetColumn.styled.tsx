import styled from 'styled-components';

export const InputIdentifiers = styled.div.attrs({
  className: `text-white pl-6 mb-2  `,
})``;

export const InputIdentifiersForPhrase = styled.div.attrs({
  className: `lg:h-auto pl-6 text-white pb-4 lg:w-54 flex-none bg-cover bg-[#3A5A42] rounded-tr rounded-tl overflow-hidden`,
})``;

export const CardContainer = styled.div.attrs({
  className: `m-1 flex flex-row bg-[#333] rounded-md mb-2 border-2 border-white border-opacity-5 shadow-lg shadow-white'

    `,
})``;

export const FlashCardCancelButton = styled.button.attrs(
  (props: { cancelled: boolean; shouldDelete: boolean }) => ({
    className: `text-xs m-1 h-6 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-neutral-400 text-black hover:bg-purple hover:text-white  ${
      props.cancelled || props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;
export const FlashCardSaveButton = styled.button.attrs(
  (props: { cancelled: boolean; shouldDelete: boolean }) => ({
    className: `text-xs m-1 h-6 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#22c55e] text-black hover:bg-purple hover:text-white ${
      props.cancelled || props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;

export const FlashCardEditButton = styled.button.attrs(() => ({
  className: `text-xs m-1 h-6 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-blue-500 text-white hover:bg-purple hover:text-white`,
}))``;
export const FlashCardConfirmDeleteButton = styled.button.attrs(
  (props: { shouldDelete: boolean }) => ({
    className: `text-xs m-1 h-6 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#22c55e] text-white hover:bg-white hover:text-black ${
      !props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;

export const FlashCardCancelDeleteButton = styled.button.attrs(
  (props: { shouldDelete: boolean }) => ({
    className: `text-xs m-1 h-6 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-neutral-400 text-white hover:bg-purple hover:text-black ${
      !props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;

export const FlashCardDeleteButton = styled.button.attrs(
  (props: { shouldDelete: boolean }) => ({
    className: `text-xs m-1 h-6 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#FF0000] text-white hover:bg-purple hover:text-black ${
      props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;

export const ChordTextBox = styled.input.attrs(
  (props: { placeholder: string; disabled: boolean; value: string }) => ({
    className: `${
      props.disabled ? 'placeholder:text-white' : ''
    } block h-4 sm:h-6 rounded-xs mx-auto shadow-sm overflow-x-scroll shadow-black mb-4 sm:mb-0 sm:mr-4 sm:ml-0 text-black text-center overflow-y-auto rounded ${
      props.disabled ? 'disabled' : ''
    }`,
    type: 'text',
    placeholder: `${props.placeholder}`,
    value: `${props.value}`,
  }),
)``;

export const PhraseTextBox = styled.input.attrs(
  (props: { placeholder: string; disabled: boolean }) => ({
    className: `${
      props.disabled ? 'placeholder:text-white' : ''
    } block h-4 sm:h-6 rounded-xs mx-auto overflow-x-scroll shadow-sm shadow-black sm:mb-0 sm:mr-4 sm:ml-0 text-black text-center rounded ${
      props.disabled ? 'disabled' : ''
    } `,
    type: 'text',
    placeholder: `${props.placeholder}`,
  }),
)``;
