import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface DashboardTrainingRowButtonProps {
  title: string;
  onClick?: () => void;
  doubleButtonVariant?: boolean;
}

export default function DashboardTrainingRowButton({
  title,
  onClick,
  doubleButtonVariant,
}: DashboardTrainingRowButtonProps): ReactElement {
  return (
    <Button
      doubleButtonVariant={doubleButtonVariant}
      active={!!onClick}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

interface ButtonProps {
  active?: boolean;
  doubleButtonVariant?: boolean;
}

const Button = styled.button<ButtonProps>`
  ${(props) =>
    props.active ? `background-color: #4daf4a;` : `background-color: #bbb;`}

  height: calc(90% - 20px);
  padding: 0.5rem 0.3rem;
  color: white;
  border-radius: 16px;
  box-sizing: border-box;
  border: none;
  margin: 10px;
  width: 150px;
  font-size: 1.2rem;

  ${(props) =>
    props.doubleButtonVariant &&
    'margin: 2px 10px; padding: 0.25rem 0.15rem; border-radius: 12px; font-size: 1rem;'}
`;
