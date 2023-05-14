import React, { useState, useEffect, ReactElement } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";


function Timer() {
  // state to store time
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // state to check stopwatch running or not
  const startAndStop = () => {
    setIsRunning(!startTimer);
  };

  const alltypedText = useStoreState((store) => store.allTypedCharactersStore);
  const startTimer = useStoreState((store) => store.startTimer);
  const trainingIsDone = useStoreState((store) => store.trainingIsDone);
  const textPromptUnFocused = useStoreState((store) => store.textPromptUnFocused);
  const setTimerValue = useStoreActions((store) => store.setTimerValue);
  const currentLineOfTrainingText = useStoreState((store) => store.currentLineOfTrainingText);
  const currentSubindexInTrainingText = useStoreState((store) => store.currentSubindexInTrainingText);


  const userIsTypingFirstChord =
  currentLineOfTrainingText === 0 &&
  currentSubindexInTrainingText === 1;


  if(startTimer == true && alltypedText.length > 0){
   () => setIsRunning(true);
  }

  useEffect(() => {
    let intervalId;

    if (startTimer && (alltypedText.length>=1)) {
        //startAndStop.click();
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    } else if(alltypedText.length == 0){
      //  console.log('sjdfjnf '+(!startTimer && !userIsTypingFirstChord && textPromptUnFocused))
        setTime(0);
  
      }  else if(!startTimer && textPromptUnFocused && !userIsTypingFirstChord){
      setTime(time);
    }

    return () => clearInterval(intervalId);
  }, [startTimer, time, alltypedText, userIsTypingFirstChord]);


  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer

  //console.log('timer '+ hours+':'+minutes.toString().padStart(2, "0")+':'+seconds.toString().padStart(2, "0")) 
  setTimerValue(hours+':'+minutes.toString().padStart(2, "0")+':'+seconds.toString().padStart(2, "0"));

  console.log('Textprompt value1 '+ textPromptUnFocused + startTimer)



  return (
    <div className="rotate-180 text-l text-neutral-400 font-medium">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
      </div>
   </div>
  );
};

export default Timer;