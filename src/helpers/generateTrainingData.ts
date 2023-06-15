import type { ChordLibraryRecord } from '../data/chordLibrary';
import type {
  ChordStatistics,
  ChordStatisticsFromDevice,
} from '../models/trainingStatistics';
import type { WordTrainingValues } from 'src/models/wordTrainingValues';
import { useEffect, useRef, useState } from 'react';
import type { TrainingScenario } from '../models/trainingScenario';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { wpmMethodCalculatorForStoredChords } from './aggregation';

let checkIt = 0;

const getRandomElementFromArray = <T>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)];

interface ChordGenerationParameters {
  stats: ChordStatistics[];
  recursionRate: number;
  numberOfTargetChords: number;
  lineLength: number;
  chordsToChooseFrom: ChordLibraryRecord;
  recursionIsEnabledGlobally: boolean;
  speedGoal: number;
  wordTestNumberValue?: WordTrainingValues;
  scenario?: TrainingScenario;
  storedTestData?: any[];
  storedChordsFromDevice?: ChordStatisticsFromDevice[];
  lexicalSentenceToChoose: any;
  indexOfTrainingText: number;
  allTypedText: string[];
  subIndexOfTrainingText: number;
  timeOfLastChordStarted: any;
  trainingLevel: any;
  continueSentenceFlow: boolean;
}

//const [internalWordCountState, setinternalWordCountState] = useState<number | null>(null);

/**
 * Generates a list of training chords, based off of the users existing stats, coming from the supplied `chords` parameter
 * If the recursion rate is high enough, this will provide chords that have been typed slowly
 * Otherwise, it will provide chords at random
 *
 * @param parameters
 * @see {@link ChordGenerationParameters}
 */

//This checks if the page has been reloaded this will be used to refresh the session variable
let pageAccessedByReload =
  (window.performance.navigation && window.performance.navigation.type === 1) ||
  window.performance
    .getEntriesByType('navigation')
    .map((nav) => nav.type)
    .includes('reload');
//Method to remove session value and set refresh constant back to false
function removeSessionValueAndSettoFalse() {
  sessionStorage.removeItem('tempTestDeIncrement');

  pageAccessedByReload = false;
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

export const generateChords = (
  parameters: ChordGenerationParameters,
): string[] => {
  if (
    parameters.scenario == 'LEXICAL' &&
    parameters.wordTestNumberValue != undefined
  ) {
    const wordTestValue = parseInt(parameters.wordTestNumberValue);
    pageAccessedByReload ? removeSessionValueAndSettoFalse() : ''; // Call this incase user refreshed the page mid test to reset the session Variable

    const chordLibraryCharacters1 = Object.keys(parameters.chordsToChooseFrom);

    const fullTestData = [];
    for (let i = 0; i < wordTestValue; i++) {
      fullTestData.push(getRandomElementFromArray(chordLibraryCharacters1));
    }
    sessionStorage.getItem('tempTestDeIncrement') == undefined
      ? sessionStorage.setItem(
          'tempTestDeIncrement',
          JSON.stringify(wordTestValue),
        )
      : '';

    let tempDeIncrementValue = parseInt(
      sessionStorage.getItem('tempTestDeIncrement'),
    );

    const newString: string[] = [];

    while (newString.join('').length < parameters.lineLength) {
      if (tempDeIncrementValue == 0) {
        const valToEvaluate = newString.length - 1 + wordTestValue;
        const loopValue = valToEvaluate - wordTestValue;
        if (loopValue! < 0) {
          for (let i = 0; i <= loopValue; i++) {
            newString.pop();
          }
        }
        break;
      } else {
        newString.push(
          parameters?.storedTestData[
            parameters?.storedTestData.length - tempDeIncrementValue
          ],
        );
        tempDeIncrementValue = tempDeIncrementValue - 1;
      }
      sessionStorage.setItem(
        'tempTestDeIncrement',
        JSON.stringify(tempDeIncrementValue),
      );
    }

    return newString;
  } else if (
    parameters.scenario == 'CUSTOMTIER' &&
    parameters.wordTestNumberValue == undefined
  ) {
    // * Uncomment the next two lines to use just the alphabet to test with
    // const IS_TESTING = true;
    // if (IS_TESTING) return [...'abcdefghijklmnopqrstuvwxyz'.split('')];

    const chordToFeed = '';

    const allCharacters: string[] = [chordToFeed].filter((a) => !!a);

    const chordLibraryCharacters = Object.keys(parameters.chordsToChooseFrom);

    const wordTestValue = chordLibraryCharacters.length;
    pageAccessedByReload ? removeSessionValueAndSettoFalse() : ''; // Call this incase user refreshed the page mid test to reset the session Variable
    const checkVal = sessionStorage.getItem('tempTestDeIncrement');
    if (
      sessionStorage.getItem('tempTestDeIncrement') == undefined ||
      isNaN(parseInt(sessionStorage.getItem('tempTestDeIncrement')))
    ) {
      sessionStorage.setItem(
        'tempTestDeIncrement',
        JSON.stringify(wordTestValue),
      );
      localStorage.setItem(
        'chordsToChooseFrom',
        JSON.stringify(chordLibraryCharacters),
      );
    }
    sessionStorage.setItem('CutomTierTestValue', JSON.stringify(wordTestValue));
    let tempDeIncrementValue = parseInt(
      sessionStorage.getItem('tempTestDeIncrement'),
    );

    while (allCharacters.join('').length < parameters.lineLength) {
      if (
        allCharacters[0] == 'sample' &&
        allCharacters[1] == 'words' &&
        tempDeIncrementValue == 0
      ) {
        sessionStorage.removeItem('tempTestDeIncrement');
      }

      if (0 == tempDeIncrementValue) {
        const valToEvaluate = allCharacters.length - 1 + wordTestValue;
        const loopValue = valToEvaluate - wordTestValue;
        if (loopValue! < 0) {
          for (let i = 0; i <= loopValue; i++) {
            allCharacters.pop();
          }
        }
        break;
      } else {
        allCharacters.push(
          chordLibraryCharacters[
            chordLibraryCharacters.length - tempDeIncrementValue
          ],
        );
        tempDeIncrementValue = tempDeIncrementValue - 1;
        sessionStorage.setItem(
          'tempTestDeIncrement',
          JSON.stringify(tempDeIncrementValue),
        );
      }
    }
    return allCharacters;
  } else if (parameters.scenario == 'ALLCHORDS') {
    // * Uncomment the next two lines to use just the alphabet to test with
    // const IS_TESTING = true;
    // if (IS_TESTING) return [...'abcdefghijklmnopqrstuvwxyz'.split('')];

    const chordToFeed = '';

    const allCharacters: string[] = [chordToFeed].filter((a) => !!a);

    const chordLibraryCharacters = Object.keys(parameters.chordsToChooseFrom);
    //console.log(chordLibraryCharacters)

    const numberOfChordsNotMastered = parameters.storedChordsFromDevice.filter(
      (s) =>
        (wpmMethodCalculatorForStoredChords(s.chordsMastered).toFixed(0) /
          100 >=
          1 &&
          s.chordsMastered.length >= 10) ||
        s.chordsMastered === undefined,
    ).length;

    const chordsSortedByMastered = parameters.storedChordsFromDevice.sort(
      (a, b) =>
        wpmMethodCalculatorForStoredChords(a.chordsMastered) -
        wpmMethodCalculatorForStoredChords(b.chordsMastered),
    );
    //The follow code removes any duplicate words from the data set
    const seen = new Set();
    const newSet = chordsSortedByMastered.filter((item) => {
      const duplicate = seen.has(item.id);
      seen.add(item.id);
      return !duplicate;
    });

    //chordsSortedByMastered = (chordsSortedByMastered.filter((item,index) => chordsSortedByMastered[index].id === item.id));
    const finalChordsToUse = newSet
      .slice(
        0 + numberOfChordsNotMastered,
        parameters.numberOfTargetChords + numberOfChordsNotMastered,
      )
      .map((s) => s.id);
    //In here I need to add a break in phrases if the're are phrases
    //for(let i=0;i<finalChordsToUse.length-1; i++){
    //  let tempVariable;
    //  if(hasWhiteSpace(finalChordsToUse[i])){
    //    tempVariable = finalChordsToUse[i].replace(/\s/g, '_');
    //    finalChordsToUse[i] = tempVariable;

    //  }
    // }
    while (allCharacters.join('').length < parameters.lineLength) {
      const shouldChooseBasedOnSpeed =
        parameters.recursionRate > Math.random() * 100;
      if (
        shouldChooseBasedOnSpeed &&
        parameters.numberOfTargetChords > 0 &&
        parameters.recursionIsEnabledGlobally
      ) {
        allCharacters.push(getRandomElementFromArray(finalChordsToUse));
      } else
        allCharacters.push(getRandomElementFromArray(chordLibraryCharacters));
    }
    for (let i = 0; i < allCharacters.length; i++) {
      parameters.storedTestData?.push(allCharacters[i]);
    }
    return allCharacters;
  } else if (parameters.trainingLevel == 'StM') {
    // * Uncomment the next two lines to use just the alphabet to test with
    // const IS_TESTING = true;
    // if (IS_TESTING) return [...'abcdefghijklmnopqrstuvwxyz'.split('')];
    const allCharacters: string[] = [];

    if (!parameters.continueSentenceFlow) {
      const tempChords: string[] = Object.keys(
        parameters.chordsToChooseFrom[parameters.lexicalSentenceToChoose],
      );

      let i = 0;
      let increment = 0;

      // console.log('Stored Characters length '+ parameters.numberOfTargetChords + ' ' + parameters.indexOfTrainingText + ' ' + checkIt + ' ' + tempChords.length + ' ' + parameters.allTypedText.length + ' AllCharacters '+ allCharacters.length + ' '+ parameters.subIndexOfTrainingText + ' '+ increment + ' ' + i);
      // (checkIt != 0 && parameters.allTypedText.length == 0 && parameters.subIndexOfTrainingText == 0)  ? checkIt = 0: '';

      //This ensures the typed text does not generate more even after the first sentence is created
      if (
        parameters.allTypedText.length > 0 &&
        checkIt == 0 &&
        !parameters.continueSentenceFlow
      ) {
        return allCharacters;
      }

      while (allCharacters.join('').length < parameters.lineLength) {
        if (checkIt <= tempChords.length - 1) {
          allCharacters.push(tempChords[checkIt]);
          checkIt++;
          increment++;
        } else {
          break;
        }
        i++;
      }
      //This sets the count to zero once the entire sentence has been generated
      if (checkIt >= tempChords.length) {
        checkIt = 0;
      }
    } else {
      const chordsSortedByTypingSpeed = parameters.stats.sort(
        (a, b) => b.averageSpeed - a.averageSpeed,
      );

      let chordToFeed = '';
      const numberOfChordsNotConquered = parameters.stats.filter(
        (s) => s.averageSpeed > parameters.speedGoal || s.averageSpeed === 0,
      ).length;
      if (numberOfChordsNotConquered > 0) {
        // Check for one remaining chord with zero speed
        // This happens on the first pass through the chord library
        const chordsWithZeroSpeed = parameters.stats.filter(
          (stat) => stat.averageSpeed === 0,
        );
        if (chordsWithZeroSpeed.length > 0)
          chordToFeed =
            getRandomElementFromArray(chordsWithZeroSpeed).displayTitle;
        // If there is no chord with zero speed, then we move onto the highest
        else chordToFeed = chordsSortedByTypingSpeed[0].displayTitle;
      }

      allCharacters = [chordToFeed].filter((a) => !!a);

      const slowestTypedChordsAccountingForDepth = chordsSortedByTypingSpeed
        .slice(0, parameters.numberOfTargetChords)
        .map((s) => s.id);
      const chordLibraryCharacters = Object.keys(
        parameters.chordsToChooseFrom[parameters.lexicalSentenceToChoose],
      );

      while (allCharacters.join('').length < parameters.lineLength) {
        const shouldChooseBasedOnSpeed =
          parameters.recursionRate > Math.random() * 100;
        if (
          shouldChooseBasedOnSpeed &&
          parameters.numberOfTargetChords > 0 &&
          parameters.recursionIsEnabledGlobally
        )
          allCharacters.push(
            getRandomElementFromArray(slowestTypedChordsAccountingForDepth),
          );
        else
          allCharacters.push(getRandomElementFromArray(chordLibraryCharacters));
      }
    }

    return allCharacters;
  } else {
    // * Uncomment the next two lines to use just the alphabet to test with
    // const IS_TESTING = true;
    // if (IS_TESTING) return [...'abcdefghijklmnopqrstuvwxyz'.split('')];

    const chordsSortedByTypingSpeed = parameters.stats.sort(
      (a, b) => b.averageSpeed - a.averageSpeed,
    );

    let chordToFeed = '';
    const numberOfChordsNotConquered = parameters.stats.filter(
      (s) =>
        (parameters.speedGoal > s.averageSpeed && 10 >= 10) ||
        s.averageSpeed === 0,
    ).length;

    const numberOfChordsConquered = parameters.stats.filter(
      (s) =>
        s.averageSpeed > parameters.speedGoal && s.numberOfOccurrences >= 10,
    ).length;

    if (numberOfChordsNotConquered > 0) {
      // Check for one remaining chord with zero speed
      // This happens on the first pass through the chord library
      const chordsWithZeroSpeed = parameters.stats.filter(
        (stat) => stat.averageSpeed === 0,
      );
      if (chordsWithZeroSpeed.length > 0)
        chordToFeed =
          getRandomElementFromArray(chordsWithZeroSpeed).displayTitle;
      // If there is no chord with zero speed, then we move onto the highest
      else chordToFeed = chordsSortedByTypingSpeed[0].displayTitle;
    }
    let theCondensedChordStat = parameters.stats.sort(
      (a, b) => b.averageSpeed - a.averageSpeed,
    );
    const allCharacters: string[] = [chordToFeed].filter((a) => !!a);
    allCharacters.shift(); // This removes the first letter in the array so that in the alphabetic tier we only show the first 8 letters on the intial data set load
    for (let i = 0; i < theCondensedChordStat.length; i++) {
      if (
        theCondensedChordStat[i].averageSpeed > parameters.speedGoal &&
        theCondensedChordStat[i].numberOfOccurrences >= 10
      ) {
        theCondensedChordStat.push(
          theCondensedChordStat.splice(
            theCondensedChordStat.indexOf(theCondensedChordStat[i]),
            1,
          )[0],
        );
      }
    }

    theCondensedChordStat = theCondensedChordStat.sort(
      (a, b) => b.numberOfOccurrences - a.numberOfOccurrences,
    );
    const slowestTypedChordsAccountingForDepth = theCondensedChordStat
      .slice(0, parameters.numberOfTargetChords)
      .map((s) => s.id);
    const chordLibraryCharacters = Object.keys(parameters.chordsToChooseFrom);

    //console.log(chordLibraryCharacters)

    let sel = [];
    let i = 0;
    while (
      sel.length < parameters.numberOfTargetChords &&
      i < parameters.stats.length &&
      numberOfChordsConquered < parameters.stats.length
    ) {
      if (
        theCondensedChordStat[i].averageSpeed > parameters.speedGoal &&
        theCondensedChordStat[i].numberOfOccurrences >= 10
      ) {
        //This is an empty block statement
      } else {
        sel.push(theCondensedChordStat[i].displayTitle);
      }
      i++;
    }
    if (numberOfChordsConquered > parameters.stats.length - 1) {
      chordsSortedByTypingSpeed.sort((a, b) => b.averageSpeed - a.averageSpeed);
      sel = chordsSortedByTypingSpeed
        .slice(0, parameters.numberOfTargetChords)
        .map((s) => s.id);
    }

    while (allCharacters.join('').length < parameters.lineLength) {
      const shouldChooseBasedOnSpeed =
        parameters.recursionRate > Math.random() * 100;
      if (
        shouldChooseBasedOnSpeed &&
        parameters.numberOfTargetChords > 0 &&
        parameters.recursionIsEnabledGlobally
      ) {
        allCharacters.push(getRandomElementFromArray(sel));
      } else
        allCharacters.push(getRandomElementFromArray(chordLibraryCharacters));
    }
    for (let i = 0; i < allCharacters.length; i++) {
      parameters.storedTestData?.push(allCharacters[i]);
    }
    return allCharacters;
  }
};
