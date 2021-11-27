import { useStoreState, useStoreActions } from '../store/store';
import { getCumulativeAverageChordTypeTime } from '../helpers/aggregation';
import { storeAverageData, storeData } from '../pages/manager/components/chordGraphs'

export const useWordsPerMinute = (): number => {
  const timeAtTrainingStart = useStoreState(
    (store) => store.timeAtTrainingStart,
  );
  
 

  const trainingSceneario = useStoreState((store) => store.currentTrainingScenario);
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const fastestRecordedWPM = useStoreState(
    (store) => store.fastestRecordedWordsPerMinute,
  );
  const fastestCounter = useStoreState(
    (store) => store.fastestRecordedWordsPerMinute,
  );
  
  const fastestRecordedWordsPerMinuteGraph = useStoreState(
    (store) => store.fastestRecordedWordsPerMinuteGraph,
  );
  const setFastestWPM = useStoreActions(
    (store) => store.setFastestRecordedWordsPerMinute,
  );

 const setGraphStats = useStoreActions(
    (store) => store.setfastestRecordedWordsPerMinuteGraph
);



  let totalNumberOfCharactersTyped = 0;
  let wpm =0;
  
  const timeAtTrainingStartInSeconds = timeAtTrainingStart * 0.001;
  
  
  const timeNowInSeconds = performance.now() * 0.001;
  const timeNowInMilli = timeNowInSeconds * 1000;
  const timeDifferenceInSeconds =
    timeNowInSeconds - timeAtTrainingStartInSeconds;
    
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  const trainingStatistics = useStoreState((store) => store.trainingStatistics);
  trainingStatistics.statistics.forEach((stat) => {
     const charactersTyped = stat.displayTitle.length * stat.numberOfOccurrences;
    totalNumberOfCharactersTyped += charactersTyped;
  });
  const y = trainingStatistics.statistics.filter((s) => s.averageSpeed);
  
  let currentChordSpeed = y[y?.length-1]?.lastSpeed;
  const average = parseInt(getCumulativeAverageChordTypeTime(y));//This field gets the speed of the current typed word
  const averageDailyCount = y.length;


  const chordLength = totalNumberOfCharactersTyped/5.23;



  // According to Riley, the equation for WPM is equal to (characters per minute typed correctly / 5)
  // I believe the constant 5 is chosen to represent average word length
  const charactersTypedCorrectly = totalNumberOfCharactersTyped;
  const charactersTypedCorrectlyPerMinute =
    charactersTypedCorrectly / timeDifferenceInMinutes;



  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario);

  if (trainingSettings.isAutoWrite) {
    if(chordLength <= 5) {

      wpm = Number.parseInt("calibrating...");

    }
    else if (typeof trainingScenario === 'string') {

      let averageSpeed = 0;
      let averageSpeedCount= 0;

    if(trainingSceneario == 'ALPHABET'){
      if(totalNumberOfCharactersTyped == 0) {
  
  
  
        wpm =0;
      } else {

          let avgSpeedMilliseconds = average * 10;
          let millisecondsPerCharacter = avgSpeedMilliseconds;
          let averageCharacterPerMin = 60000/millisecondsPerCharacter;
          wpm = averageCharacterPerMin/5;

          //This calculation calculates the current chords speed so that we can check if it is a mastered chord
          avgSpeedMilliseconds = currentChordSpeed * 10;
          millisecondsPerCharacter = avgSpeedMilliseconds/5.23;//In the future 5.23 needs to be dynamic based on the practice set
          averageCharacterPerMin = 60000/millisecondsPerCharacter;
          currentChordSpeed = averageCharacterPerMin/5;

          averageSpeed =averageSpeed + wpm;
          averageSpeedCount++;
  
          const currentDate = new Date();

          storeAverageData( wpm, currentDate, currentChordSpeed, averageDailyCount);
      }
  
    } else{
      if(totalNumberOfCharactersTyped == 0) {
  
        wpm =0;
      } else {

          let avgSpeedMilliseconds = average * 10;
          let millisecondsPerCharacter = avgSpeedMilliseconds/5.23;//In the future 5.23 needs to be dynamic based on the practice set
          let averageCharacterPerMin = 60000/millisecondsPerCharacter;
          wpm = averageCharacterPerMin/5;
  
          avgSpeedMilliseconds = currentChordSpeed * 10;
          millisecondsPerCharacter = avgSpeedMilliseconds/5.23;//In the future 5.23 needs to be dynamic based on the practice set
          averageCharacterPerMin = 60000/millisecondsPerCharacter;
          currentChordSpeed = averageCharacterPerMin/5;
        

          averageSpeed += wpm;
          averageSpeedCount++; 
          const currentDate = new Date();

          storeAverageData( averageSpeed, currentDate, currentChordSpeed, averageDailyCount);
  
        }
  
    }

      if (wpm > fastestRecordedWPM[trainingScenario]) {
        const currentDate = new Date();

  
         storeData(wpm, currentDate);
        setFastestWPM({
          ...fastestRecordedWPM,
          [trainingScenario]: wpm,
        });

      }
    }
  }

  
  return wpm;

};