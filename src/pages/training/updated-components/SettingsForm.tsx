import styled from 'styled-components';

interface SettingsFormInterface {
  transitionTransform: string;
}
export const SettingsForm = styled.form.attrs<SettingsFormInterface>(
  (props) => {
    return {
      className: `bg-[#222] min-w-[221px] max-w-[300px] text-gray-100 rounded-lg rounded-md px-8 pt-6 pb-8 w-full relative max-h-[95%] overflow-y-auto sm:overflow-y-visible
    ${props.transitionTransform}
    `,
    };
  },
)<SettingsFormInterface>``;
