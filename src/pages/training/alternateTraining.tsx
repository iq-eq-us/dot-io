import React, { ReactElement, useEffect } from 'react';
import { chordLibrary } from '../../data/chordLibrary';
import { useStoreActions, useStoreState } from '../../store/store';
import CharachorderOverlay from '../training/components/charachorderOverlay';

function AlternateTraining(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setTrainingSettings = useStoreActions(
    (store) => store.setTrainingSettings,
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <section
        className="text-gray-600 body-font"
        style={{ backgroundColor: '#151515', minHeight: 'calc(100vh - 64px)' }}
      >
        <div className="flex flex-row" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="hidden xl:flex flex flex-col xl:w-1/4 m-8 mb-0">
            <span className="text-white text-2xl mb-2 font-semibold">
              Settings
            </span>
            <form
              className={`bg-[#222] max-w-[300px] text-gray-100 rounded-lg rounded-md px-8 pt-6 pb-8 w-full relative`}
            >
              <label className="block text-sm font-bold mb-1">
                Highlight Keys
              </label>
              <div className="w-1/2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={trainingSettings.isHighlightingKeys}
                  onChange={() => {
                    setTrainingSettings({
                      ...trainingSettings,
                      isHighlightingKeys: !trainingSettings.isHighlightingKeys,
                    });
                  }}
                />
                <span className="ml-2">Enabled</span>
              </div>

              <label className="block text-sm font-bold mb-1 mt-4">
                Practice Slow Chords
              </label>
              <div className="w-1/2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={trainingSettings.isUsingRecursion}
                  onChange={() => {
                    setTrainingSettings({
                      ...trainingSettings,
                      isUsingRecursion: !trainingSettings.isUsingRecursion,
                    });
                  }}
                />
                <span className="ml-2">Enabled</span>
              </div>

              <label className="block text-sm font-bold mb-1 mt-4">HUD</label>
              <div className="w-1/2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={trainingSettings.isDisplayingHUD}
                  onChange={() => {
                    setTrainingSettings({
                      ...trainingSettings,
                      isDisplayingHUD: !trainingSettings.isDisplayingHUD,
                    });
                  }}
                />
                <span className="ml-2">Enabled</span>
              </div>

              <label className="block text-sm font-bold mb-1 mt-4">
                Settings Mode
              </label>
              <label className="flex flex-row items-center">
                <div className="w-1/2">
                  <input
                    type="radio"
                    name="auto"
                    className="form-checkbox"
                    checked={trainingSettings.autoOrCustom === 'AUTO'}
                    onChange={() => {
                      setTrainingSettings({
                        ...trainingSettings,
                        autoOrCustom: 'AUTO',
                      });
                    }}
                  />
                  <span className="ml-2">Auto</span>
                </div>

                <div className="w-1/2">
                  <input
                    type="radio"
                    name="auto"
                    className="form-checkbox"
                    checked={trainingSettings.autoOrCustom === 'CUSTOM'}
                    onChange={() => {
                      setTrainingSettings({
                        ...trainingSettings,
                        autoOrCustom: 'CUSTOM',
                      });
                    }}
                  />
                  <span className="ml-2">Custom</span>
                </div>
              </label>

              {trainingSettings.autoOrCustom === 'CUSTOM' && (
                <div>
                  <div className="w-full mt-4">
                    <label className="block text-sm font-bold mb-2">
                      Target Chords
                    </label>
                    <input
                      onChange={(e) => {
                        setTrainingSettings({
                          ...trainingSettings,
                          targetChords: parseInt(e.target.value),
                        });
                      }}
                      value={trainingSettings.targetChords}
                      type="text"
                      pattern="[0-9]*"
                      className="mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100"
                    />
                  </div>
                  <div className="w-full mt-4">
                    <label className="block text-sm font-bold mb-2">
                      Speed Goal
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setTrainingSettings({
                          ...trainingSettings,
                          speedGoal: parseInt(e.target.value),
                        });
                      }}
                      value={trainingSettings.speedGoal}
                      pattern="[0-9]*"
                      className="mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100"
                    />
                  </div>
                  <div className="w-full mt-4">
                    <label className="block text-sm font-bold mb-2">
                      Rate (%)
                    </label>
                    <input
                      onChange={(e) => {
                        setTrainingSettings({
                          ...trainingSettings,
                          recursionRate: parseInt(e.target.value),
                        });
                      }}
                      value={trainingSettings.recursionRate}
                      type="text"
                      pattern="[0-9]*"
                      className="mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100"
                    />
                  </div>
                </div>
              )}
              <div className="w-full mt-4">
                <label className="block text-sm font-bold mb-2">Contrast</label>
                <input
                  onChange={(e) => {
                    setTrainingSettings({
                      ...trainingSettings,
                      contrastPercentage: parseInt(e.target.value),
                    });
                  }}
                  value={trainingSettings.contrastPercentage}
                  type="text"
                  pattern="[0-9]*"
                  className="mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100"
                />
              </div>
            </form>
          </div>

          <div className="flex flex-col align-center w-full xl:w-1/2 m-8 lgml-36 relative">
            <div className="xl:hidden flex flex-row justify-between w-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#eee"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-settings"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#eee"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bar-chart-2"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <div className="flex flex-row items-end justify-between mb-2 text-sm sm:text-lg">
              <div className="text-white font-semibold">Complete: 24</div>
              <div className="text-white font-semibold">
                Current Level: 24/200
              </div>
              <div className="text-white font-semibold">Remaining: 2</div>
            </div>
            <div className="rounded bg-[#333] h-12 w-full p-1">
              <div className="rounded bg-red-500 w-full h-full w-full overflow-hidden">
                <div className="relative rounded-r-xl bg-green-500 w-1/3 h-full">
                  <div className="absolute text-white font-semibold -right-8 -bottom-8">
                    WPM: 20
                  </div>
                </div>
              </div>
            </div>

            <div className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-12 xl:mt-24 flex flex-col items-center w-full gap-4 justify-center text-white">
              {/* <div className="flex flex-col">
                <span className="uppercase text-sm font-bold text-gray-50 mb-2 opacity-60">
                  current
                </span>
                <span className="bg-gray-200 text-gray-800 rounded-lg px-4 py-0.5 pb-1">
                  America
                </span>
              </div>

              <div className="flex flex-col">
                <span className="uppercase text-sm font-bold text-gray-50 mb-2 ml-4 opacity-60">
                  next
                </span>
                <span className="text-gray-50 rounded-lg px-4 py-0.5 pb-1">
                  sentence
                </span>
              </div> */}

              <div className="flex flex-row gap-6 justify-center w-full">
                <span className="text-green-500 underline">America</span>
                <span>song</span>
                <span>most</span>
                <span>learn</span>
                <span>world</span>
              </div>
              <div className="flex flex-row gap-6 justify-center w-full">
                <span>light</span>
                <span>water</span>
                <span>have</span>
                <span>time</span>
                <span>big</span>
              </div>
            </div>

            <div className="-ml-0 relative h-full w-full">
              <CharachorderOverlay />
            </div>
          </div>

          <div className="hidden xl:block xl:w-1/4 mr-2 2xl:mr-8 mt-8 mb-4 overflow-y-scroll max-h-full rounded-lg pr-2">
            <div className="flex flex-col items-end">
              <span className="text-white text-2xl mb-2 font-semibold">
                Statistics
              </span>

              <div className="-my-2">
                <div className="py-2 align-middle inline-block ml-0">
                  <div className="shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full">
                      <thead className="bg-[#262626]">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 2xl:px-4 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider font-bold"
                          >
                            Chord
                          </th>
                          <th
                            scope="col"
                            className="px-3 2xl:px-4 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider font-bold"
                          >
                            Speed
                          </th>
                          <th
                            scope="col"
                            className="px-3 2xl:px-4 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider font-bold"
                          >
                            Errors
                          </th>
                          <th
                            scope="col"
                            className="px-3 2xl:px-4 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider font-bold"
                          >
                            Occur
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#222]">
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                        <ExampleTableTow />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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

export default AlternateTraining;
