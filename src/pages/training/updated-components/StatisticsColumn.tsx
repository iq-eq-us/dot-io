import React, { ReactElement } from 'react';
import { chordLibrary } from '../../../data/chordLibrary';

export function StatisticsColumn(): ReactElement {
  return (
    <div className="hidden xl:block xl:w-1/4 mr-2 2xl:mr-8 mt-8 mb-4 overflow-y-scroll max-h-full rounded-lg pr-2">
      <div className="flex flex-col items-end">
        <StatisticsTableTitle />

        <StatisticsTable />
      </div>
    </div>
  );
}

function TableHeader({ title }: { title: string }) {
  return (
    <th
      scope="col"
      className="px-3 2xl:px-4 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider font-bold"
    >
      {title}
    </th>
  );
}

function StatisticsTableTitle() {
  return (
    <span className="text-white text-2xl mb-2 font-semibold">Statistics</span>
  );
}

const StatisticsTable = () => {
  return (
    <div className="-my-2">
      <div className="py-2 align-middle inline-block ml-0">
        <div className="shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full">
            <thead className="bg-[#262626]">
              <tr>
                <TableHeader title="Chord" />
                <TableHeader title="Speed" />
                <TableHeader title="Errors" />
                <TableHeader title="Times" />
              </tr>
            </thead>
            <tbody className="bg-[#222]">
              {[...Array(15)].map(() => (
                <ExampleTableTow key={Math.random()} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ExampleTableTow = () => {
  return (
    <tr>
      <td className="px-3 2xl:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {
          Object.keys(chordLibrary.chords)[
            Math.floor(Math.random() * Object.keys(chordLibrary.chords).length)
          ]
        }
      </td>
      <td className="px-3 2xl:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {Math.floor(Math.random() * 150)}
      </td>
      <td className="px-3 2xl:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {Math.floor(Math.random() * 2)}
      </td>
      <td className="px-3 2xl:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {Math.floor(Math.random() * 20)}
      </td>
    </tr>
  );
};
