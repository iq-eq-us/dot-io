import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { chordLibrary } from '../../../data/chordLibrary';
import {
  createEmptyChordStatistics,
  TrainingStatistics,
} from '../../../models/trainingStatistics';
import { useStoreActions, useStoreState } from '../../../store/store';
import {
  getCumulativeAverageChordTypeTime,
  getCumulativeValueByPropertyName,
} from '../../training/components/statisticColumn';

function DashboardStatisticsTable(): ReactElement {
  const savedCharacterChordStats = useStoreState(
    (store) => store.totalSavedCharacterChordStats,
  );
  const clearAllStatisticsWithoutPromptingUser = useStoreActions(
    (store) => store.clearAllStorage,
  );

  const savedChordStats = useStoreState((store) => store.totalSavedChordStats);

  return (
    // Character Table
    <div
      className="flex flex-row ml-4 bg-white relative"
      style={{ maxHeight: '90%' }}
    >
      <button
        className="absolute bg-white p-1 px-2 rounded-sm right-0 -top-10"
        onClick={() => clearAllStatisticsWithoutPromptingUser()}
      >
        Clear All Progress
      </button>
      <div className="w-1/2 max-h-full overflow-y-scroll">
        <div className="flex flex-row">
          <TableCell className="w-1/4">Character</TableCell>
          <TableCell className="w-1/4">Avg. Speed</TableCell>
          <TableCell className="w-1/4">Errors</TableCell>
          <TableCell className="w-1/4">Times Typed</TableCell>
        </div>

        {CumulativeChordRow(savedCharacterChordStats)}

        <div className="flex flex-col">
          {Object.keys(chordLibrary.letters).map((id: string) => {
            const chordStat =
              savedCharacterChordStats.statistics.find((s) => s.id === id) ||
              createEmptyChordStatistics(id);

            return (
              <div key={chordStat.id} className="flex flex-row">
                <TableCell className="w-1/4">
                  {chordStat.displayTitle}
                </TableCell>
                <TableCell className="w-1/4">
                  {chordStat.averageSpeed.toFixed(0)}
                </TableCell>
                <TableCell className="w-1/4">
                  {chordStat.numberOfErrors}
                </TableCell>
                <TableCell className="w-1/4">
                  {chordStat.numberOfOccurrences}
                </TableCell>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chord Table */}
      <div className="w-1/2 max-h-full overflow-y-scroll">
        <div className="flex flex-row">
          <TableCell className="w-1/4">Character</TableCell>
          <TableCell className="w-1/4">Avg. Speed</TableCell>
          <TableCell className="w-1/4">Errors</TableCell>
          <TableCell className="w-1/4">Times Typed</TableCell>
        </div>

        {CumulativeChordRow(savedChordStats)}

        <div className="flex flex-col">
          {Object.keys(chordLibrary.chords).map((id: string) => {
            const chordStat =
              savedChordStats.statistics.find((s) => s.id === id) ||
              createEmptyChordStatistics(id);

            return (
              <div key={chordStat.id} className="flex flex-row">
                <TableCell className="w-1/4">
                  {chordStat.displayTitle}
                </TableCell>
                <TableCell className="w-1/4">
                  {chordStat.averageSpeed.toFixed(0)}
                </TableCell>
                <TableCell className="w-1/4">
                  {chordStat.numberOfErrors}
                </TableCell>
                <TableCell className="w-1/4">
                  {chordStat.numberOfOccurrences}
                </TableCell>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const TableCell = styled.p`
  box-shadow: 2px 0 0 0 #000, 0 2px 0 0 #000, 2px 2px 0 0 #000,
    2px 0 0 0 #000 inset, 0 2px 0 0 #000 inset;
  padding: 0.1rem 0.5rem;
  font-family: Arial, Helvetica, sans-serif;
`;

export default DashboardStatisticsTable;

function CumulativeChordRow(savedCharacterChordStats: TrainingStatistics) {
  return (
    <div className="flex flex-row">
      <TableCell className="w-1/4 text-[12px] leading-6">CUMULATIVE:</TableCell>
      <TableCell className="w-1/4">
        {getCumulativeAverageChordTypeTime(savedCharacterChordStats.statistics)}
      </TableCell>
      <TableCell className="w-1/4">
        {getCumulativeValueByPropertyName(
          savedCharacterChordStats.statistics,
          'numberOfErrors',
        )}
      </TableCell>
      <TableCell className="w-1/4">
        {getCumulativeValueByPropertyName(
          savedCharacterChordStats.statistics,
          'numberOfOccurrences',
        )}
      </TableCell>
    </div>
  );
}
