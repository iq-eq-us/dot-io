import React, { useState } from 'react';
import { useStoreState, useStoreActions } from '../../../store/store';
import { TagSelection } from './TagSelection';
import {
  FlexContainer,
  Header,
  TagContainer,
  SplitLeft,
  SplitRight,
  ArrowContainer,
  ActionButton,
  BeginButton,
} from './CustomTrainingWelcome.styled';
import type { activeFlashCard } from 'src/models/flashCardsModel';

interface CustomTrainingWelcomeProps {
  setActiveTraining: () => void;
}

export const CustomTrainingWelcome = ({
  setActiveTraining,
}: CustomTrainingWelcomeProps) => {
  const tags = useStoreState((state) => state.tags);
  const setInfiniteSessionTrainingData = useStoreActions(
    (actions) => actions.setInfiniteSessionTrainingData,
  );
  const flashCards = useStoreState((state) => state.flashCards);

  const [unSelectedTags, setUnSelectedTags] = useState<string[]>(
    Object.keys(tags),
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const startTraining = () => {
    if (selectedTags.length != 0) {
      const filteredFlashCards: activeFlashCard[] = [];
      flashCards.forEach((flashCard, index) => {
        for (const tag of selectedTags) {
          if (flashCard.tags.includes(tag)) {
            filteredFlashCards.push({
              flashCard: flashCard,
              flashCardIndex: index,
            });
            break;
          }
        }
      });
      setInfiniteSessionTrainingData(filteredFlashCards);
      setActiveTraining();
    }
  };

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
        <BeginButton onClick={() => startTraining()}>
          Begin Training
        </BeginButton>
      </FlexContainer>
    </React.Fragment>
  );
};
