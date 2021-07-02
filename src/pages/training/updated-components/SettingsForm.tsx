import styled from 'styled-components';

interface SettingsFormInterface {
  transitionTransform: string;
}
export const SettingsForm = styled.form.attrs<SettingsFormInterface>(
  (props) => {
    return {
      className: `bg-[#222] max-w-[300px] text-gray-100 rounded-lg rounded-md px-8 pt-6 pb-8 w-full relative
    ${props.transitionTransform}
    `,
    };
  },
)<SettingsFormInterface>``;
