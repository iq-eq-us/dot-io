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

  const setNames = [];
  for (const [key] of Object.entries(tags)) {
    <option key={key} value={key}>
      {key}
    </option>;
  }
  if (setNames.length === 0) {
    <option value="" />;
  }
  console.log(setNames);

  return (
    <Dropdown
      name="Select Flash Card"
      onSelectedChange={() => setSelectedTag(selectedTag)}
      options={setNames}
      selected={selectedTag}
    />
  );
};
