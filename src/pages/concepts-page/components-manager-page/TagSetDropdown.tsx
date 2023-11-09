import React from 'react';
import { useStoreState } from '../../../store/store';
import Dropdown from './Dropdown';

interface TagSetDropdownProps {
  selectedTag: string;
  setSelectedTag: (selectedTag: string) => void;
}

export const TagSetDropdown = ({
  selectedTag,
  setSelectedTag,
}: TagSetDropdownProps) => {
  const tags = useStoreState((state) => state.tags);

  const setNames = ['All'];
  for (const [key] of Object.entries(tags)) {
    setNames.push(key);
  }
  console.log(setNames);

  return (
    <Dropdown
      name="Select Flash Card"
      onSelectedChange={setSelectedTag}
      options={setNames}
      selected={selectedTag}
    />
  );
};
