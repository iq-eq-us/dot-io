import React from 'react';
import { Tag } from './Tag';
import {
  TagSelectionWrapper,
  TagSelectionHeader,
  TagContainerWrapper,
} from './TagSelection.styled';

interface TagSelectionProps {
  tags: string[];
  selected: boolean;
  setSelectedTag: (tag: string, selected: boolean) => void;
}

export const TagSelection = ({
  tags,
  selected,
  setSelectedTag,
}: TagSelectionProps) => {
  const setSelectedParent = (tag: string) => {
    setSelectedTag(tag, selected);
  };

  const renderedTags = tags.map((tag) => {
    return <Tag key={tag} tag={tag} setSelectedTag={setSelectedParent} />;
  });

  return (
    <React.Fragment>
      <TagSelectionWrapper>
        {selected ? (
          <TagSelectionHeader>Selected Tags</TagSelectionHeader>
        ) : (
          <TagSelectionHeader>Unselected Tags</TagSelectionHeader>
        )}
        <TagContainerWrapper>{renderedTags}</TagContainerWrapper>
      </TagSelectionWrapper>
    </React.Fragment>
  );
};
