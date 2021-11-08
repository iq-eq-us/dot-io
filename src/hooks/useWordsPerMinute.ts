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
  const numberOfSpaces = (y.length); 
  const average = parseInt(getCumulativeAverageChordTypeTime(y));


  let averageSpeed = 0;
  let averageSpeedCount= 0;
 
  

  const chordLength = totalNumberOfCharactersTyped/5.23;



if(trainingSceneario == 'ALPHABET'){
    if(totalNumberOfCharactersTyped == 0) {



      wpm =0;
    } else {
        const avgSpeedMilliseconds = average * 10;
        const millisecondsPerCharacter = avgSpeedMilliseconds/5.23
        const averageCharacterPerMin = 60000/millisecondsPerCharacter;
        wpm = (averageCharacterPerMin/5.23)/5;

        averageSpeed =averageSpeed + wpm;
        averageSpeedCount++;

        
        console.log("avgS" + averageSpeed);
        const currentDate = new Date();

        storeAverageData( wpm, currentDate );
    }

  } else{
    if(totalNumberOfCharactersTyped == 0) {

      wpm =0;
    } else {
      
        const avgSpeedMilliseconds = (average + numberOfSpaces) * 10;
        const millisecondsPerCharacter = avgSpeedMilliseconds/5.23
        const averageCharacterPerMin = 60000/millisecondsPerCharacter;
        wpm = (averageCharacterPerMin/5.23);

        averageSpeed += wpm;
        averageSpeedCount++; 
        const currentDate = new Date();
        
        storeAverageData( averageSpeed, currentDate );

      }

  }


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
