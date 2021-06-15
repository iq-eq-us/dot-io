import React from 'react';
import styled from 'styled-components';

interface DashboardTrainingRowButtonProps {
  title: string;
}

export default function DashboardTrainingRowButton({
  title,
}: DashboardTrainingRowButtonProps) {
  return <Button>{title}</Button>;
}

const Button = styled.button`
  background-color: #4daf4a;
  height: calc(90% - 20px);
  padding: 0.5rem 0.3rem;
  color: white;
  border-radius: 16px;
  box-sizing: border-box;
  border: none;
  margin: 10px;
  width: 150px;
  font-size: 1.2rem;
`;
