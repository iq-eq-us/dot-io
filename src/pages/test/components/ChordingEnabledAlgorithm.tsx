import React, { ReactElement, useState } from 'react';
import { FaBorderStyle } from 'react-icons/fa';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';
import { TrainingStoreModel } from '../../../../src/models/trainingStore';
import { indexOf } from 'lodash';
  
  
const [bestKeyTime, setBestKeyTime] = useState([]);
const [letterPressed, setLetterPressed] = useState([]);
const [keyDownTime, setKeyDownTime] = useState(performance.now());
const [currentWord, setCurrentWord] = useState(undefined);

const setChordingEnabled = useStoreActions((store : any) => store.setIsUsingChordingEnabledDevice);
const isEnabled = useStoreState((store : any) => store.isUsingChordingEnabledDevice);

  export const ChordingEnabledAlgorithm = (chordValue)  => {
    
    window.performance = window.performance || {};
    performance.now = 
    performance.now       ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    Date.now * 1.0; /*none found - fallback to browser default */


  const body = document.getElementById('txt_Name');
  let isKeyDown = false;
  if(sessionStorage.getItem('chordingEnabledDevice') == undefined || sessionStorage.getItem('chordingEnabledDevice') == 'false'){

  if(currentWord != chordValue && currentWord != undefined) {
    let numberOfBestTimesUnderTen = 0;
      if(letterPressed.includes('Backspace') && bestKeyTime.length>2){
          for(let i =0; i<bestKeyTime.length-1; i++){
            if(bestKeyTime[i] < 10) {
              numberOfBestTimesUnderTen++;
            }
          }
      }
      if(numberOfBestTimesUnderTen >= 2){
        setChordingEnabled(true);
      }
      setBestKeyTime([]);
      setLetterPressed([]);
   
  }

  currentWord != chordValue ? setCurrentWord(chordValue) : '';//This may need to run to set the value of the chord we're testing


  body.onkeydown = function (e) {
    if ( !e.metaKey ) {
        e.stopPropagation();
    }

    if (!isKeyDown) {
      isKeyDown = true;
      console.log(keyDownTime);
      setKeyDownTime(performance.now());

    }
    console.log(keyDownTime);
  };

  body.onkeyup = function (e) {
    if ( !e.metaKey ) {
      e.stopPropagation();
    }
    isKeyDown = false;
    const upTime = performance.now();
    const heldTime = Math.ceil(upTime - keyDownTime);
    console.log(keyDownTime);
    console.log(keyDownTime);
    console.log('Held time '+ heldTime);
    console.log('Uptime '+ upTime);
    const tempBestTime = Math.min(10000, heldTime);
    bestKeyTime.push(tempBestTime);
    letterPressed.push(e.key);
    //let scanRate = Math.min(1000 / (bestKeyTime), 1000);
    //console.log(keyDownTime.length);
    console.log('Just e '+e.type)
    console.log('Just e 2 '+e.key)

    setBestKeyTime(bestKeyTime => [...bestKeyTime]);
    setLetterPressed(letterPressed => [...letterPressed]);
    console.log('This is the Best Time '+bestKeyTime);
    console.log('This is the associated letter pressed '+ letterPressed);


  };

  }//End of the first if statement 
  //console.log('Baby youre enabled');
  }