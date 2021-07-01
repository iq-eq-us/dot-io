import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { large } from '../../../helpers/breakpoints';

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

  &:hover {
    ${(props) =>
      props.active ? `background-color: #3f903c;` : `background-color: #bbb;`}
  }

  &:active {
    ${(props) =>
      props.active ? `background-color: #2f6c2d;` : `background-color: #bbb;`}
  }

  height: calc(90% - 20px);
  padding: 0.5rem 0.3rem;
  color: white;
  border-radius: 16px;
  box-sizing: border-box;
  border: none;
  margin: 10px;
  width: 150px;
  font-size: 1.2em;

  ${(props) =>
    props.doubleButtonVariant &&
    'margin: 2px 10px; padding: 0.25rem 0.15rem; border-radius: 12px; font-size: 1rem;'}

  @media only screen and (max-width: ${large}) {
    font-size: 1em;
    width: 100px;
    line-break: strict;
    hyphens: auto;
    padding: 0.2rem 0.3rem;
    line-height: 1.2em;
  }
`;
