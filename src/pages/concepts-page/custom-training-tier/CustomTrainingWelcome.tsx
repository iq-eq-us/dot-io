import React, { useState } from 'react';
import { useStoreState } from '../../../store/store';
import { TagSelection } from './TagSelection';
import {
  FlexContainer,
  Header,
  TagContainer,
  SplitLeft,
  SplitRight,
  ArrowContainer,
  ActionButton,
} from './CustomTrainingWelcome.styled';

interface CustomTrainingWelcomeProps {
  setCurrentTier: (tier: number) => void;
}

export const CustomTrainingWelcome = ({
  setCurrentTier,
}: CustomTrainingWelcomeProps) => {
  const tags = useStoreState((state) => state.tags);

  const [unSelectedTags, setUnSelectedTags] = useState<string[]>(
    Object.keys(tags),
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(['hello']);

  const switchTag = (tag: string, selected: boolean) => {
    if (selected == true) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag),
      );
      setUnSelectedTags([...unSelectedTags, tag]);
    } else {
      setSelectedTags([...selectedTags, tag]);
      setUnSelectedTags(
        unSelectedTags.filter((unSelectedTag) => unSelectedTag !== tag),
      );
    }
  };

  const moveAllTags = (selected: boolean) => {
    if (selected == true) {
      setSelectedTags([...selectedTags, ...unSelectedTags]);
      setUnSelectedTags([]);
    } else {
      setUnSelectedTags([...unSelectedTags, ...selectedTags]);
      setSelectedTags([]);
    }
  };

  return (
    <React.Fragment>
      <FlexContainer>
        <Header>Select Tags to train</Header>
        <TagContainer>
          <SplitLeft>
            <TagSelection
              tags={unSelectedTags}
              selected={false}
              setSelectedTag={switchTag}
            />
          </SplitLeft>
          <ArrowContainer>
            <ActionButton onClick={() => moveAllTags(true)}>
              --&gt;&gt;
            </ActionButton>
            <ActionButton onClick={() => moveAllTags(false)}>
              &lt;&lt;--
            </ActionButton>
          </ArrowContainer>
          <SplitRight>
            <TagSelection
              tags={selectedTags}
              selected={true}
              setSelectedTag={switchTag}
            />
          </SplitRight>
        </TagContainer>
        <ActionButton onClick={() => console.log('hello')}>
          Begin Training
        </ActionButton>
      </FlexContainer>
    </React.Fragment>
  );
};
