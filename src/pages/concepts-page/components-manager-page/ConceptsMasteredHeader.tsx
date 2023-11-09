import React, { ReactElement } from 'react';

export function ConceptsMasteredHeader(): ReactElement {
  return (
    <div className="flex flex-wrap w-full mb-20">
      <p className="lg:w-1/2 w-full leading-relaxed text-gray-300 font-semibold font-mono">
        Welcome to the Concepts Mastered Manager. Let's get started, below you
        will find "Import Flashcards", "Save Flashcards", and "Add Flashcards".
        Add/Import your flashcards and press "Save Flashcards" to get started.
      </p>
    </div>
  );
}
