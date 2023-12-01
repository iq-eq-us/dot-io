import React from 'react';
import { useStoreState } from '../../../store/store';

interface HashtagProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  onRemove: () => void;
}

const Hashtag: React.FC<HashtagProps> = ({
  text,
  selected,
  onClick,
  onRemove,
}) => {
  const hashtagStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    margin: '5px',
    padding: '5px',
    borderRadius: '10px',
    backgroundColor: selected ? '#3A5A42' : '#A3A3A3 ',
    color: 'white',
    cursor: 'pointer',
  };

  const closeStyle: React.CSSProperties = {
    marginLeft: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={hashtagStyle} onClick={onClick}>
      {text}
      {selected && (
        <span style={closeStyle} onClick={onRemove}>
          {' '}
          x
        </span>
      )}
    </div>
  );
};

interface HashTagProps {
  selectedTags: string[];
  setSelectedTags: (selectedTags: string[]) => void;
}

const HashTagMap: React.FC<HashTagProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const tags = useStoreState((state) => state.tags) || {};
  const tagNames = Object.keys(tags).filter((tagName) => tagName !== 'All');

  const handleTagClick = (tagName) => {
    if (tagName === 'All') {
      return;
    } else {
      const newSelectedTags = selectedTags.includes(tagName)
        ? selectedTags.filter((tag) => tag !== tagName)
        : [...selectedTags, tagName];
      setSelectedTags(newSelectedTags);
    }
  };

  return (
    <div>
      {tagNames.map((tagName) => (
        <Hashtag
          key={tagName}
          text={tagName}
          selected={selectedTags.includes(tagName)}
          onClick={() => handleTagClick(tagName)}
          onRemove={() => handleTagClick(tagName)}
        />
      ))}
    </div>
  );
};

export default HashTagMap;
