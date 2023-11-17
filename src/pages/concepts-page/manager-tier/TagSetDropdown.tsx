import React from 'react';
import { useStoreState } from '../../../store/store';
import { Dropdown } from './Dropdown';

interface TagSetDropdownProps {
  selectedTag: string;
  setSelectedTag: (selectedTag: string) => void;
}

export const TagSetDropdown = ({
  selectedTag,
  setSelectedTag,
}: TagSetDropdownProps) => {
  const tags = useStoreState((state) => state.tags);

  const setNames = ['All', ''].concat(Object.keys(tags));

  return (
    <Dropdown
      name="Select Flash Card"
      onSelectedChange={(selectedTag) => {
        //console.log('Selected Tag:', selectedTag);
        setSelectedTag(selectedTag);
      }}
      options={setNames}
      selected={selectedTag}
    />
  );
};
