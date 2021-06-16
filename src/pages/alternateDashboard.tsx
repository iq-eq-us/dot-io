import React from 'react';

export default function Test() {
  return (
    <div>
      {/* <header className="shadow" style={{ backgroundColor: "#333" }}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>
        </div>
      </header> */}

      <section className="text-gray-600 body-font min-h-screen" style={{ backgroundColor: "#2a2a2a" }}>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">LaunchPad Learn</h1>
              <div className="h-1 w-20 bg-green-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-300">Welcome to the LaunchPad Learn! Here you can view tutorials to get to know your Charachorder and practice your typing to level up your abilities! We're excited to see how far you will go!</p>
          </div>


          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/720x400" alt="content" />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Tier</h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Alphabetic</h2>
                <p className="leading-relaxed text-base">Learn the basic key positions to begin your Charachorder journey.</p>
                <div className="flex flex-row">
                  <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Orientation
                  </button>
                  <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Alphabet Training
                  </button>
                </div>
              </div>
            </div>

            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/720x400" alt="content" />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Tier</h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Amalgamate</h2>
                <p className="leading-relaxed text-base">Start to learn the most common trigram patterns you'll be typing.</p>
                <div className="flex flex-row">
                  <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Trigram Tutorial
                  </button>
                  <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Trigram Training
                  </button>
                </div>
              </div>
            </div>

            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/720x400" alt="content" />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Tier</h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Lexical</h2>
                <p className="leading-relaxed text-base">Begin learning how to type short letter groups at your own pace.</p>
                <div className="flex flex-row">
                  <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Lexical Tutorial
                  </button>
                  <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Lexical Training
                  </button>
                </div>
              </div>
            </div>

            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/720x400" alt="content" />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Tier</h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chordal</h2>
                <p className="leading-relaxed text-base">Start writing the most common full word chords to create full sentences.</p>
                <div className="flex flex-row">
                  <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Trigram Tutorial
                  </button>
                  <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Trigram Training
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mx-16 border-gray-600 mb-16" />

        <div className="flex flex-col text-center w-full pb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">Coming Soon...</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-gray-50">Charachoder is working daily to add and improve these training courses. Be sure to check back again soon to take your Charachorder skills to the next level!</p>
        </div>
      </section>
    </div>
  );
}
