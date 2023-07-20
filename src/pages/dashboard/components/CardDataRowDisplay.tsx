import React, { ReactElement } from 'react';
import styled from 'styled-components';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';
import { useHistory } from 'react-router-dom';
import { ROUTER_PATHS } from '../../../components/router';
import GoalsButton from '../../dashboard/components/goalsButton';

export function CardDataRowDisplay(): ReactElement {
  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute);
  const clearStatsWithoutPrompt = useStoreActions(
    (store) => store.clearAllStorage,
  );

  const { parentProps: wpmProps, Popper: SpeedPopper } = usePopover(
    'This shows the fastest you have typed in any training module. Get a faster top speed to progress through the training modules.',
  );

  const { parentProps: progressProps, Popper: ProgressPopper } = usePopover(
    'Clear all of the progress you have saved, both your top speed as well as your chord statistics for each training module.',
  );

  const onClickRefreshButton = () => {
    const shouldClear = window.confirm(
      'Are you sure you want to clear all your progress?',
    );
    if (shouldClear) clearStatsWithoutPrompt();
  };
  const history = useHistory();

  return (
    <CardDataRow>
      {SpeedPopper}
      {ProgressPopper}
      <MaxWPMBadge {...wpmProps}>
        Top Speed: {Math.max.apply(Math, Object.values(maxWPM))?.toFixed()}
      </MaxWPMBadge>

      <RefreshButton onClick={onClickRefreshButton} {...progressProps}>
        Clear Progress
      </RefreshButton>
      <div className="feather feather-trash-2 p-0.5 text-gray-600">
        <button
          onClick={() => {
            history.push(ROUTER_PATHS.manager);
          }}
          className="text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        >
          Chord Manager
        </button>
      </div>
    </CardDataRow>
  );
}

export const RefreshButton = styled.button.attrs({
  className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]`,
})``;

export const MaxWPMBadge = styled.span.attrs({
  className: `bg-green-500 text-white rounded p-2 px-4 mb-4 inline-block`,
})``;

export const CardDataRow = styled.div.attrs({
  className: `w-full lg:w-3/4 lg:mx-auto flex flex-row justify-end`,
})``;
