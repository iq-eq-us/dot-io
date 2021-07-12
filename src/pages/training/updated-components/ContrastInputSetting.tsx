import React, { ReactElement } from 'react';
import styled from 'styled-components';
import type { SettingsProps } from './SettingsProps';

export function ContrastInputSetting(props: SettingsProps): ReactElement {
  const onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 50 && value <= 100)
      props.setTrainingSettings({
        ...props.trainingSettings,
        contrastPercentage: value,
      });
  };

  return (
    <Container>
      <Label>Contrast</Label>

      <ContrastInput
        onBlur={onBlur}
        defaultValue={props.trainingSettings.contrastPercentage}
        type="text"
        pattern="[0-9]*"
      />
    </Container>
  );
}

const Label = styled.label.attrs({
  className: `block text-sm font-bold mb-2`,
})``;

const ContrastInput = styled.input.attrs({
  className: `mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100`,
})``;

const Container = styled.div.attrs({
  className: `w-full mt-4`,
})``;
