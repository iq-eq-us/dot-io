import React, { ReactElement, useState } from 'react';
import Dropdown from 'react-dropdown';
import { CMradialGraph } from './CMradialGraph';
import styled from 'styled-components';
import 'react-dropdown/style.css';
import { CMEbbinghausGraph } from './CMEbbinhausGraph';

export function CMdashboardAnalytics(): ReactElement {
  const options = [
    'Select flashcard set',
    'Flashcard Set 1',
    'Flashcard Set 2',
    'Flashcard Set 3',
  ];
  const defaultOption = options[0];

  const [componentToShow, setComponentToShow] = useState('');
  const [updatedComponent, setUpdatedComponet] = useState(false);

  const updateFlashcardName = (e) => {
    console.log('updated flashcard name:');
    localStorage.setItem(
      'dropdownFlashcardSetSelected',
      JSON.stringify(e.value),
    );
    console.log(
      JSON.parse(localStorage.getItem('dropdownFlashcardSetSelected')),
    );
    console.log(componentToShow);
    localStorage.setItem(
      'dropdownFlashcardSetSelectedUpdated',
      JSON.stringify(true),
    );
  };

  return (
    <div className="flex flex-col">
      <Dropdown
        options={options}
        onChange={updateFlashcardName}
        value={defaultOption}
        className="border rounded-md"
      />
      <CMradialGraph />
      <div className="pt-42">
        <CMEbbinghausGraph />
      </div>
    </div>
  );
}
