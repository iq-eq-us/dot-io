import { useStoreState } from '../store/store';

export const useSessionWordsPerMinute = (): number => {
  const timeAtTrainingStart = useStoreState(
    (store) => store.timeAtTrainingStart,
  );

  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const trainingSessionAggregatedTime = useStoreState(
    (store) => store.trainingSessionAggregatedTime,
  );

  let totalNumberOfCharactersTyped = 0;
  let wpm = 0;

  const timeAtTrainingStartInSeconds = timeAtTrainingStart * 0.001;

  const timeNowInSeconds = performance.now() * 0.001;
  const timeNowInMilli = timeNowInSeconds * 1000;
  const timeDifferenceInSeconds =
    timeNowInSeconds - timeAtTrainingStartInSeconds;

  const allTypedCharactersStore = useStoreState(
    (store) => store.allTypedCharactersStore,
  );

  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  const trainingStatistics = useStoreState((store) => store.trainingStatistics);
  trainingStatistics.statistics.forEach((stat) => {
    const charactersTyped = stat.displayTitle.length * stat.numberOfOccurrences;
    totalNumberOfCharactersTyped += charactersTyped;
  });
  const y = trainingStatistics.statistics.filter((s) => s.averageSpeed);
  const currentChordSpeed = y[y?.length - 1]?.lastSpeed;
  const average =
    trainingSessionAggregatedTime / (allTypedCharactersStore.length - 1); //This field gets the speed of the current typed word

  // According to Riley, the equation for WPM is equal to (characters per minute typed correctly / 5)
  // I believe the constant 5 is chosen to represent average word length
  const charactersTypedCorrectly = totalNumberOfCharactersTyped;
  const charactersTypedCorrectlyPerMinute =
    charactersTypedCorrectly / timeDifferenceInMinutes;

  if (trainingSettings.isAutoWrite) {
    if (typeof trainingScenario === 'string') {
      const averageSpeed = 0;
      const averageSpeedCount = 0;

      if (trainingScenario == 'ALPHABET') {
        if (totalNumberOfCharactersTyped == 0) {
          wpm = 0;
        } else {
          const avgSpeedMilliseconds = average * 10;
          const millisecondsPerCharacter = avgSpeedMilliseconds;
          const averageCharacterPerMin = 60000 / millisecondsPerCharacter;
          wpm = averageCharacterPerMin / 5;

          if (currentChordSpeed >= 100 && currentChordSpeed != 6276) {
            //This checks if the WPM is equal to 100 wpm of higher
            // storeMasteredData(currentDate, currentChordSpeed);
          }
        }
      } else {
        if (totalNumberOfCharactersTyped == 0) {
          wpm = 0;
        } else {
          const avgSpeedMilliseconds = average * 10;
          const millisecondsPerCharacter = avgSpeedMilliseconds / 5; //In the future 5.23 needs to be dynamic based on the practice set
          const averageCharacterPerMin = 60000 / millisecondsPerCharacter;
          wpm = averageCharacterPerMin / 5;

          if (currentChordSpeed >= 100 && currentChordSpeed != 6276) {
            //storeMasteredData(currentDate, currentChordSpeed);
          }
          if (trainingScenario == ('LEXICAL' || 'TRIGRAM')) {
            //  storeCharactersPerMinute(currentDate, averageCharacterPerMin, averageDailyCount);
          }
        }
      }
    }
  }

  return wpm;
};
