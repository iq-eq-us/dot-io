import React, { ReactElement } from 'react';
import { chordLibrary } from '../../../data/chordLibrary';
import useScreenSizeBoundary from '../../../hooks/useScreenSizeBoundary';
import useWindowSize from '../../../hooks/useWindowSize';
import { useStoreActions, useStoreState } from '../../../store/store';
import { StatisticsColumnContainer } from './StatisticsColumnContainer';
import { StatisticsTableContainer } from './StatisticsTableContainer';
import { StatisticsTableTitle } from './StatisticsTableTitle';

const HIDDEN_BREAKPOINT = 1024;

export function StatisticsColumn(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setIsDisplaying = useStoreActions(
    (store) => store.setIsDisplayingStatisticsModal,
  );

  useScreenSizeBoundary({
    boundary: HIDDEN_BREAKPOINT,
    callback: (direction) => {
      setIsDisplaying(direction === 'ABOVE');
    },
  });

  const transitionTransform = `transform translate-x-full transition-transform ${
    trainingSettings.isDisplayingStatisticsModal && 'translate-x-0'
  }`;

  const windowSize = useWindowSize();
  const onClickOutside = () => {
    if (windowSize.width < HIDDEN_BREAKPOINT) setIsDisplaying(false);
  };

  return (
    <StatisticsColumnContainer
      onClick={onClickOutside}
      isDisplayingModal={trainingSettings.isDisplayingStatisticsModal}
    >
      <StatisticsTableContainer transitionTransform={transitionTransform}>
        <StatisticsTableTitle />
        <StatisticsTable />
      </StatisticsTableContainer>
    </StatisticsColumnContainer>
  );
}

const StatisticsTable = () => {
  return (
    <div className="-my-2">
      <div className="py-0 align-middle inline-block ml-0">
        <div className="shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full">
            <thead className="bg-[#262626]">
              <tr>
                <StatisticsTableHeader title="Chord" />
                <StatisticsTableHeader title="Speed" />
                <StatisticsTableHeader title="Errors" />
                <StatisticsTableHeader title="Times" />
              </tr>
            </thead>
            <tbody className="bg-[#222]">
              {[...Array(30)].map((_, i) => (
                <ExampleTableTow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function StatisticsTableHeader({ title }: { title: string }) {
  return (
    <th
      scope="col"
      className="px-3 2xl:px-4 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider font-bold"
    >
      {title}
    </th>
  );
}

const ExampleTableTow = () => {
  return (
    <tr>
      <td className="px-3 2xl:px-6 py-2 whitespace-nowrap text-sm text-gray-300">
        {
          Object.keys(chordLibrary.chords)[
            Math.floor(Math.random() * Object.keys(chordLibrary.chords).length)
          ]
        }
      </td>
      <td className="px-3 2xl:px-6 py-2 whitespace-nowrap text-sm text-gray-300">
        {Math.floor(Math.random() * 150)}
      </td>
      <td className="px-3 2xl:px-6 py-2 whitespace-nowrap text-sm text-gray-300">
        {Math.floor(Math.random() * 2)}
      </td>
      <td className="px-3 2xl:px-6 py-2 whitespace-nowrap text-sm text-gray-300">
        {Math.floor(Math.random() * 20)}
      </td>
    </tr>
  );
};
