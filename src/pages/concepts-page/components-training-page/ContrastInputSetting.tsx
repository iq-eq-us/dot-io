import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import usePopover from '../../../hooks/usePopover';
import type { SettingsProps } from './CustomTrainingSettingsBox';
import HelpCircleIcon from './HelpCircleIcon';

export function ContrastInputSetting(props: SettingsProps): ReactElement {
  const [value, setValue] = useState<string | number>(
    props.trainingSettings.contrastPercentage,
  );

  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    const isValid = !isNaN(value) && value >= 50 && value <= 100;

    if (isValid) {
      props.setTrainingSettings({
        ...props.trainingSettings,
        contrastPercentage: value,
      });
    } else {
      setValue(props.trainingSettings.contrastPercentage);
    }
  };

  const { parentProps, Popper } = usePopover(
    'Adjust the contrast of the colors on the page. Can be between 50-100%.',
  );

  return (
    <Container>
      <Label {...parentProps}>
        Contrast
        <HelpCircleIcon />
        {Popper}
      </Label>

      <ContrastInput
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type="text"
        pattern="[0-9]*"
      />
    </Container>
  );
}

const Label = styled.label.attrs({
  className: `text-sm font-bold mb-2 inline-flex flex-row gap-2 items-center`,
})``;

const ContrastInput = styled.input.attrs({
  className: `mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100`,
})``;

const Container = styled.div.attrs({
  className: `w-full mt-4`,
})``;
