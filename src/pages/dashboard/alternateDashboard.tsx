import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = (): ReactElement => {
  const history = useHistory();

  return (
    <div>
      <section
        className="text-gray-600 body-font min-h-screen"
        style={{ backgroundColor: '#151515' }}
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                LaunchPad Learn
              </h1>
              <div className="h-1 w-20 bg-green-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-300 font-semibold">
              Welcome to the LaunchPad Learn! Here you can view tutorials to get
              to know your Charachorder and practice your typing to level up
              your abilities. We&apos;re excited to see how far you will go!
            </p>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex flex-wrap flex-col md:w-1/4">
              <div className="p-4">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    Tier
                  </h3>
                  <h2 className="text-lg text-gray-900 font-bold title-font mb-4">
                    Alphabetic
                  </h2>

                  <p className="leading-relaxed text-base">
                    The average writing speed is 13 words per minute.
                  </p>
                  <div className="flex flex-row">
                    <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Orientation
                    </button>
                    <button
                      onClick={() => history.push('/training')}
                      className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Training
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    Tier
                  </h3>
                  <h2 className="text-lg text-gray-900 font-bold title-font mb-4">
                    Trigram
                  </h2>

                  <p className="leading-relaxed text-base">
                    The average speed of a &quot;Hunt & Peck&quot; typist is 27
                    wpm.
                  </p>
                  <div className="flex flex-row">
                    <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Orientation
                    </button>
                    <button
                      onClick={() => history.push('/training')}
                      className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Training
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    Tier
                  </h3>
                  <h2 className="text-lg text-gray-900 font-bold title-font mb-4">
                    Lexical
                  </h2>

                  <p className="leading-relaxed text-base">
                    The average speed of a keyboard user is 40 words per minute.
                  </p>
                  <div className="flex flex-row">
                    <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Orientation
                    </button>
                    <button
                      onClick={() => history.push('/training')}
                      className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Training
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    Tier
                  </h3>
                  <h2 className="text-lg text-gray-900 font-bold title-font mb-4">
                    Chording
                  </h2>

                  <p className="leading-relaxed text-base">
                    The average speed of a professional typist is 75 words per
                    minute.
                  </p>
                  <div className="flex flex-row">
                    <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Orientation
                    </button>
                    <button
                      onClick={() => history.push('/training')}
                      className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Training
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-3/4 mt-4">
              <div className="flex flex-col sm:m-4 md:m-0 md:ml-36 lg:ml-20">
                <span className="text-3xl text-white mb-4">Alphabet</span>
                <div className="-my-2 overflow-x-auto -mx-5 sm:mx-0">
                  <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">{renderHeader()}</thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {renderFakeRow(1)}
                          {renderFakeRow(2)}
                          {renderFakeRow(3)}
                          {renderFakeRow(4)}
                          {renderFakeRow(5)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:m-4 md:m-0 md:ml-36 lg:ml-20 mt-12 md:mt-8">
                <span className="text-3xl text-white mb-4">Chords</span>
                <div className="-my-2 overflow-x-auto -mx-5 sm:mx-0">
                  <div className="py-2 align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">{renderHeader()}</thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {renderFakeRow(1)}
                          {renderFakeRow(2)}
                          {renderFakeRow(3)}
                          {renderFakeRow(4)}
                          {renderFakeRow(5)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mx-16 border-gray-600 mb-16" />

        <div className="flex flex-col text-center w-full pb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">
            Coming Soon...
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-gray-50 px-4">
            Charachorder is working daily to add and improve these training
            courses. Be sure to check back again soon to take your Charachorder
            skills to the next level!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

function renderHeader() {
  return (
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Chord
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Average Speed
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Total Errors
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Total Times Typed
      </th>
    </tr>
  );
}

function renderFakeRow(i: number) {
  return (
    <tr className={`${i % 2 === 0 ? 'bg-gray-100' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-900">America</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">127</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">2</div>
      </td>
      <div className="px-6 py-4 whitespace-nowrap">20</div>
    </tr>
  );
}
