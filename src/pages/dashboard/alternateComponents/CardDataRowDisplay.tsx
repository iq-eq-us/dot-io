import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useStoreActions, useStoreState } from '../../../store/store';

export function CardDataRowDisplay(): ReactElement {
  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute);
  const clearStatsWithoutPrompt = useStoreActions(
    (store) => store.clearAllStorage,
  );

  const onClickRefreshButton = () => {
    const shouldClear = window.confirm(
      'Are you sure you want to clear all your progress?',
    );
    if (shouldClear) clearStatsWithoutPrompt();
  };

  return (
    <CardDataRow>
      <MaxWPMBadge>Max WPM: {maxWPM.toFixed()}</MaxWPMBadge>

      <RefreshButton onClick={onClickRefreshButton}>
        Clear Progress
      </RefreshButton>
    </CardDataRow>
  );
}

export const RefreshButton = styled.button.attrs({
  className: `text-white rounded p-2 px-4 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] mr-2 lg:mr-0`,
})``;

export const MaxWPMBadge = styled.span.attrs({
  className: `bg-green-500 text-white rounded p-2 px-4 mb-4 inline-block`,
})``;

export const CardDataRow = styled.div.attrs({
  className: `w-full lg:w-3/4 mx-4 lg:mx-auto flex flex-row justify-end`,
})``;
