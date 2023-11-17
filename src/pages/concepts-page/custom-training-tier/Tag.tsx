import React from 'react';
import { TagWrapper, TagButton } from './Tag.styled';

interface TagProps {
  tag: string;
  setSelectedTag: (tags: string) => void;
}

export const Tag = ({ tag, setSelectedTag }: TagProps) => {
  return (
    <TagWrapper>
      <TagButton onClick={() => setSelectedTag(tag)}>{tag}</TagButton>
    </TagWrapper>
  );
};
