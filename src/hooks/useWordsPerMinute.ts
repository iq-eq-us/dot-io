import { useStoreState, useStoreActions } from '../store/store';
import { getCumulativeAverageChordTypeTime } from '../helpers/aggregation';
import { storeAverageData, storeData, storeMasteredData, storeCharactersPerMinute } from '../pages/manager/components/chordGraphs';


export const useWordsPerMinute = (): number => {
  const timeAtTrainingStart = useStoreState(
    (store) => store.timeAtTrainingStart,
  );
  
 

  const trainingSceneario = useStoreState((store) => store.currentTrainingScenario);
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const currentTrainingSetting = useStoreState((store : any) => store.trainingSettings);
  const isTrainingTestDone = currentTrainingSetting.isTestDone;
  const testTeirHighestWPM = useStoreState((store) => store.testTeirHighestWPM); 

  const fastestRecordedWPM = useStoreState(
    (store) => store.fastestRecordedWordsPerMinute,
  );
 
  
  const testNumber = useStoreState((store) => store.wordTestNumber);

  const setFastestWPM = useStoreActions(
    (store) => store.setFastestRecordedWordsPerMinute,
  );

  const wordTestNumber = useStoreState((store) => store.wordTestNumber);
  const storedTestTextData = useStoreState((store) => store.storedTestTextData);
  const alltypedText= useStoreState((store) => store.allTypedCharactersStore);
  const numberOfWordsChorded = useStoreState((state  : any) => state.numberOfWordsChorded);


  let totalNumberOfCharactersTyped = 0;
  let wpm =0;
  
  const timeAtTrainingStartInSeconds = timeAtTrainingStart * 0.001;
  
  let wordsCorrectCount = 0;
  for(let i=0; i<storedTestTextData.length; i++){
    if(storedTestTextData[i] == alltypedText[i]?.slice(0, -1)){
      wordsCorrectCount++;
    }
  }
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


  const chordLength = totalNumberOfCharactersTyped/5;

  // According to Riley, the equation for WPM is equal to (characters per minute typed correctly / 5)
  // I believe the constant 5 is chosen to represent average word length
  const charactersTypedCorrectly = totalNumberOfCharactersTyped;
  const charactersTypedCorrectlyPerMinute =
    charactersTypedCorrectly / timeDifferenceInMinutes;



  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario);

  if (trainingSettings.isAutoWrite) {
 
 if (typeof trainingScenario === 'string') {

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
          millisecondsPerCharacter = avgSpeedMilliseconds/5;//In the future 5.23 needs to be dynamic based on the practice set
          averageCharacterPerMin = 60000/millisecondsPerCharacter;
          currentChordSpeed = averageCharacterPerMin/5;

          averageSpeed =averageSpeed + wpm;
          averageSpeedCount++;
  
          const currentDate = new Date();

          if(currentChordSpeed>=100 && (currentChordSpeed != 6276)){//This checks if the WPM is equal to 100 wpm of higher
           // storeMasteredData(currentDate, currentChordSpeed);
            }

      }
  
    } else{
      if(totalNumberOfCharactersTyped == 0) {
  
        wpm =0;
      } else {

          let avgSpeedMilliseconds = average * 10;
          let millisecondsPerCharacter = avgSpeedMilliseconds/5;//In the future 5.23 needs to be dynamic based on the practice set
          let averageCharacterPerMin = 60000/millisecondsPerCharacter;
          wpm = averageCharacterPerMin/5;
  
          avgSpeedMilliseconds = currentChordSpeed * 10;
          millisecondsPerCharacter = avgSpeedMilliseconds/5;//In the future 5.23 needs to be dynamic based on the practice set
          averageCharacterPerMin = 60000/millisecondsPerCharacter;
          currentChordSpeed = averageCharacterPerMin/5;
        

          averageSpeed += wpm;
          averageSpeedCount++; 
          const currentDate = new Date();

          if(currentChordSpeed>=100 && (currentChordSpeed != 6276)){
          //storeMasteredData(currentDate, currentChordSpeed);
          
          }
          if(trainingScenario == ('LEXICAL'||'TRIGRAM')){
          //  storeCharactersPerMinute(currentDate, averageCharacterPerMin, averageDailyCount);
          }

        }

  
    }
    if(isTrainingTestDone){
      //((wordsCorrectCount/parseInt(testNumber))*100)
      const testNum = parseInt(testNumber);
      if (6>(((numberOfWordsChorded).toFixed(0)/25)*100)  && ((wordsCorrectCount/testNum)*100) >=95 && testTeirHighestWPM > fastestRecordedWPM[trainingScenario] ){
        const currentDate = new Date();

        console.log('New WPM did fire inside the conditional and it was teuew ')
  
        wordTestNumber != null || undefined ? storeData(testTeirHighestWPM, currentDate) : '';//This checks to make sure we are in a testing teir

          setFastestWPM({
          ...fastestRecordedWPM,
          [trainingScenario]: testTeirHighestWPM,
        });
      

      }
      wordTestNumber != null || undefined ? storeAverageData( testTeirHighestWPM, currentDate, currentChordSpeed, averageDailyCount) : '';//This checks to make sure we are in a testing teir
    }
    }
  }

  console.log('Test is done '+ wpm)
  return wpm;

};