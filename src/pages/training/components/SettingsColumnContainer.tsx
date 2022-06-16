import styled from 'styled-components';

interface SettingsColumnContainerProps {
  isDisplayingModal: boolean;
}

export const SettingsColumnContainer = styled.div.attrs<SettingsColumnContainerProps>(
  (props) => {
    return {
      className: `
      fixed left-0 top-0 right-0 bottom-0 bg-[#121212E5] p-8 z-10 flex flex-col
      xl:p-0 xl:z-auto xl:m-8 xl:bg-transparent xl:relative xl:w-1/4
      ${props.isDisplayingModal ? 'visible' : 'invisible'}
    `,
    };
  },
)<SettingsColumnContainerProps>``;
