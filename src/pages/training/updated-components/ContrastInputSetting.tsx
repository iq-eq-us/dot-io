import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import type { SettingsProps } from './CustomTrainingSettingsBox';

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

  return (
    <Container>
      <Label>Contrast</Label>

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
  className: `block text-sm font-bold mb-2`,
})``;

const ContrastInput = styled.input.attrs({
  className: `mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100`,
})``;

const Container = styled.div.attrs({
  className: `w-full mt-4`,
})``;
