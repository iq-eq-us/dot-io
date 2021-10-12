import { useStoreState, useStoreActions } from '../store/store';
import type { ChordStatistics } from '../models/trainingStatistics';
import { getCumulativeAverageChordTypeTime } from '../helpers/aggregation';

export const useWordsPerMinute = (): number => {
  const timeAtTrainingStart = useStoreState(
    (store) => store.timeAtTrainingStart,
  );
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const fastestRecordedWPM = useStoreState(
    (store) => store.fastestRecordedWordsPerMinute,
  );
  const setFastestWPM = useStoreActions(
    (store) => store.setFastestRecordedWordsPerMinute,
  );
 

  let totalNumberOfCharactersTyped = 0;
  let wpm =0;
  
  const timeAtTrainingStartInSeconds = timeAtTrainingStart * 0.001;
  
  
  const timeNowInSeconds = performance.now() * 0.001;
  const timeNowInMilli = timeNowInSeconds * 1000;
  const timeDifferenceInSeconds =
    timeNowInSeconds - timeAtTrainingStartInSeconds;
    //console.log(timeNowInSeconds);
    //console.log(timeAtTrainingStartInSeconds);
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  const trainingStatistics = useStoreState((store) => store.trainingStatistics);
  
  trainingStatistics.statistics.forEach((stat) => {
    const charactersTyped = stat.displayTitle.length * stat.numberOfOccurrences;
    totalNumberOfCharactersTyped += charactersTyped;
  });
  const y = trainingStatistics.statistics.filter((s) => s.averageSpeed);
  const average = parseInt(getCumulativeAverageChordTypeTime(y));
  console.log(average)
 


  const chordLength = totalNumberOfCharactersTyped/5.23;


  

    if(totalNumberOfCharactersTyped == 0) {

      wpm =0;
    } else {
          
       

        const avgSpeedMilliseconds = average * 10;
        const millisecondsPerCharacter = avgSpeedMilliseconds/5.23
        const averageCharacterPerMin = 60000/millisecondsPerCharacter;
        wpm = averageCharacterPerMin/5;
        console.log(wpm);
      

        //This is to prevent the WPM from displaying
        if(wpm < 1 || wpm > 1000000000000000000000000000000000000000000000000){
          wpm = 0;
        } else {
          wpm = averageCharacterPerMin/5;
        }

    }

    


  // According to Riley, the equation for WPM is equal to (characters per minute typed correctly / 5)
  // I believe the constant 5 is chosen to represent average word length
  const charactersTypedCorrectly = totalNumberOfCharactersTyped;
  const charactersTypedCorrectlyPerMinute =
    charactersTypedCorrectly / timeDifferenceInMinutes;
  //const wpm = charactersTypedCorrectlyPerMinute / 5;
  //const wpm = ((totalNumberOfCharactersTyped/5)/timeDifferenceInMinutes);


  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );

  

  if (trainingSettings.isAutoWrite) {
    if(chordLength <= 5) {

      wpm = Number.parseInt("calibrating...");

    }
    else if (typeof trainingScenario === 'string') {
      if (wpm > fastestRecordedWPM[trainingScenario]) {
        setFastestWPM({
          ...fastestRecordedWPM,
          [trainingScenario]: wpm,
        });
      }
    }
  }

  
  return wpm;


};
