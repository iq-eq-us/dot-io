import React from 'react';
import { Tag } from './Tag';

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
      {selected ? <h1>Selected Tags</h1> : <h1>Unselected Tags</h1>}
      {renderedTags}
    </React.Fragment>
  );
};
