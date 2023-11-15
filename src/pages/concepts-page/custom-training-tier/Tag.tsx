import React from 'react';

interface TagProps {
  tag: string;
  setSelectedTag: (tags: string) => void;
}

export const Tag = ({ tag, setSelectedTag }: TagProps) => {
  return (
    <React.Fragment>
      <button onClick={() => setSelectedTag(tag)}>{tag}</button>
    </React.Fragment>
  );
};
