import styled from 'styled-components';

export const KeyMapInputIdentifiers = styled.div.attrs({
  className: `text-white  pl-6 mb-2  `,
})``;

export const FirstKeyMapInputIdentifiers = styled.div.attrs({
  className: `lg:h-auto pl-4 text-white  lg:w-54 flex-none bg-cover bg-[#778D83] rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden`,
})``;
export const CardLayoutContainer = styled.div.attrs({
  className: `m-1 flex flex-row bg-[#333] rounded-md mb-2 border-2 border-white border-opacity-5 shadow-lg shadow-white'

    `,
})``;

export const CardCancelButton = styled.button.attrs(
  (props: { cancelled: boolean; shouldDelete: boolean }) => ({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-neutral-400 text-black hover:bg-purple hover:text-white  ${
      props.cancelled || props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;

export const CardSaveButton = styled.button.attrs(
  (props: { cancelled: boolean; shouldDelete: boolean }) => ({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#22c55e] text-black hover:bg-purple hover:text-white ${
      props.cancelled || props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;

export const CardEditButton = styled.button.attrs(
  (props: { cancelled: boolean; shouldDelete: boolean }) => ({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-blue-500 text-white hover:bg-purple hover:text-white ${
      !props.cancelled || props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;
export const CardConfirmDeleteButton = styled.button.attrs(
  (props: { shouldDelete: boolean }) => ({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#22c55e] text-white hover:bg-white hover:text-black ${
      !props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;

export const CardCancelDeleteButton = styled.button.attrs(
  (props: { shouldDelete: boolean }) => ({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-neutral-400 text-white hover:bg-purple hover:text-black ${
      !props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;

export const CardDeleteButton = styled.button.attrs(
  (props: { shouldDelete: boolean }) => ({
    className: `text-xs m-2 mt-6 float-right font-semibold rounded-full px-4 py-1 shadow-sm shadow-black leading-normal bg-[#FF0000] text-white hover:bg-purple hover:text-black ${
      props.shouldDelete ? 'hidden' : ''
    }`,
  }),
)``;
export const KeyMapPositionTextBox = styled.input.attrs(
  (props: { placeholder: string }) => ({
    className: `block h-4 sm:h-6 rounded-xs mx-auto shadow-sm shadow-black mb-4 sm:mb-0 sm:mr-4 sm:ml-0 text-black text-center overflow-y-auto rounded `,
    type: 'text',
    placeholder: `${props.placeholder}`,
  }),
)``;
export const KeyMapValueTextBox = styled.input.attrs(
  (props: { placeholder: string; disabled: boolean }) => ({
    className: `${
      props.disabled ? 'placeholder:text-white' : ''
    } block h-4 sm:h-6 rounded-xs mx-auto mb-4 shadow-sm shadow-black sm:mb-0 sm:mr-4 sm:ml-0 text-black text-center  rounded ${
      props.disabled ? 'disabled' : ''
    } `,
    type: 'text',
    placeholder: `${props.placeholder}`,
  }),
)``;
export const KeyMapTextBox = styled.input.attrs(
  (props: { placeholder: string; disabled: boolean }) => ({
    className: `${
      props.disabled ? 'placeholder:text-white' : ''
    } block h-4 sm:h-6 rounded-xs mx-auto mb-4 shadow-sm shadow-black sm:mb-0 sm:mr-4 sm:ml-0 text-black text-center  rounded ${
      props.disabled ? 'disabled' : ''
    } `,
    type: 'text',
    placeholder: `${props.placeholder}`,
  }),
)``;
