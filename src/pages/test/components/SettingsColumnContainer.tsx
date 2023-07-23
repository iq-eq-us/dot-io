import styled from 'styled-components';

interface SettingsColumnContainerProps {
  isDisplayingModal: boolean;
}

export const SettingsColumnContainer = styled.div.attrs<SettingsColumnContainerProps>(
  (props) => {
    return {
      className: `
            fixed inset-0 bg-[#121212E5]
      min-w-[324px] max-h-full rounded-lg
      lg:block lg:bg-transparent lg:relative
       lg:ml-16 overflow-y-auto
      ${props.isDisplayingModal ? 'visible' : 'invisible'}
    `,
    };
  },
)<SettingsColumnContainerProps>``;
