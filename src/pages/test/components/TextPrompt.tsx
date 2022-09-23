import React, { ReactElement, useState } from 'react';
import { FaBorderStyle } from 'react-icons/fa';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';
import { TrainingStoreModel } from '../../../../src/models/trainingStore';

const r = Math.random;


export function TextPrompt(): ReactElement {
  const indexOfTargetChord = useStoreState(
    (store : any) => store.currentSubindexInTrainingText,
  );
  
  const firstLineOfTargetText = useStoreState(
    (store : any) => store.targetTextLineOne,
  );
  const secondLineOfTargetText = useStoreState(
    (store : any) => store.targetTextLineTwo,
  );
  const isError = useStoreState(
    (store : any) => store.errorOccurredWhileAttemptingToTypeTargetChord,
  );
  const isEnabled = useStoreState((store : any) => store.isUsingChordingEnabledDevice);
  const targetCharacterIndex = useStoreState((store : any) => store.targetCharacterIndex);
  const characterEntryMode = useStoreState((store : any) => store.characterEntryMode);
  const setChordingEnabled = useStoreActions((store : any) => store.setIsUsingChordingEnabledDevice);
  const storeAllTypedText = useStoreActions((store : any) => store.setAllTypedCharactersStore);
  const allTypedText = useStoreState((store : any) => store.allTypedCharactersStore);
  const userIsEditingPreviousWord = useStoreState((store : any) => store.userIsEditingPreviousWord);
  const setTypedTrainingText = useStoreActions((store : any) => store.setTypedTrainingText);
  const storedTestTextData = useStoreState((store : any) => store.storedTestTextData);



  const currentLine = useStoreState(
    (store : any) => store.currentLineOfTrainingText,
  );
  const currentSubIndex = useStoreState(
    (store : any) => store.currentSubindexInTrainingText,
  );

  const userIsTypingFirstChord =
  currentLine == 0 &&
  currentSubIndex == 1;


  const set = useStoreActions((store : any) => store.setCompareText);
  const setS = useStoreState((store : any) => store.compareText);
  const setCurrentSubindexInTrainingText = useStoreActions((store : any) => store.setCurrentSubindexInTrainingText);


  const [bestKeyTime, setBestKeyTime] = useState([]);
  const [letterPressed, setLetterPressed] = useState([]);
  const [keyDownTime, setKeyDownTime] = useState(performance.now());
  const [currentWord, setCurrentWord] = useState(undefined);
  const [targetIndexForWhatErrorTextToShow, setTargetIndexForWhatErrorTextToShow] = useState(0);




  const getCheckAlgo = (chordValue)  => {
    
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
  }

 
  function whatTextToShow(targetTextLineOne : any, targetCharacterIndex: any){

    //target + length
    let displayArray = []
    if(allTypedText.length>0 && storedTestTextData != undefined){
     
      (targetCharacterIndex == 0 && targetIndexForWhatErrorTextToShow != allTypedText.length)? setTargetIndexForWhatErrorTextToShow(allTypedText.length) : "do me baby ";
     if (targetIndexForWhatErrorTextToShow > allTypedText.length)
      setTargetIndexForWhatErrorTextToShow(0);

      let spacesBetweenWords = 0;
      let characterLengthOfTheEntireLine = 0;
    for(let i = targetIndexForWhatErrorTextToShow; i<allTypedText.length; i++){

      const compare = allTypedText[i];
      characterLengthOfTheEntireLine +=storedTestTextData[i].length;;

      if(compare.charAt(compare.length -1) == ' '){ 
        
        if(compare.slice(0, -1) == storedTestTextData[i]){

          spacesBetweenWords += storedTestTextData[i].length;
          let placeholder = '';
          for(let k =0; k<spacesBetweenWords; k++){
            placeholder += "+";
          }
          placeholder += " ";
          displayArray.push(<div className ="text-white">{placeholder}</div>)

          spacesBetweenWords = 0;

       }
        else {
          console.log(allTypedText.length)
          if(allTypedText[i].length-1 > storedTestTextData[i].length){

            let periodsIfLengthOfTypedErrorIsLongerThanChordsLength ='';
            for(let y= 0; y<storedTestTextData[i].length; y++) { 
              periodsIfLengthOfTypedErrorIsLongerThanChordsLength += "."
            }
            displayArray.push(<div className ="text-red-500">{periodsIfLengthOfTypedErrorIsLongerThanChordsLength}</div>)

          } else {
          displayArray.push(<div className ="text-red-500">{allTypedText[i]}</div>)
          }

        
      }
      }
      if((allTypedText.length - i) == 1){
        let ms = storedTestTextData.length - allTypedText;
        let y  = allTypedText.length;
        for(let d = y ; d < (targetTextLineOne.length + targetIndexForWhatErrorTextToShow); d++ ){
          let sd = ''
          for(let r =0; r<storedTestTextData[d].length; r++){
          sd += "+";
          }
          sd += ' ';

          displayArray.push(<div className ="text-white">{sd}</div>);
         // displayArray.push(" ");

        }
      }
      console.log('jk '+ allTypedText[i] + ' ' + storedTestTextData[i] + ' typed text index= '+ allTypedText.length + " "+ allTypedText+" "+ storedTestTextData.length + " Target Line length= "+ targetTextLineOne.length+ 'displayArray ='+ displayArray.length + " Content of display array "+ displayArray + " spaces value "+ spacesBetweenWords )

    }
  }
 // const compare = allTypedText[indexOfTargetChord-1];
 //compare.slice(0, -1)
 // if(compare.charAt(compare.length -1) 
      
  let input = document.getElementById('txt_Name') as unknown as HTMLInputElement;
  if(input!= null){

  input.onkeydown = (e) => {
    if ( !e.metaKey ) {
        e.stopPropagation();
    }
    let key = e.keyCode || e.charCode;
    let sub = indexOfTargetChord -1;

    if(( key == 8 || key == 46 ) && (targetCharacterIndex + targetIndexForWhatErrorTextToShow == allTypedText.length) && (input.value.length == 0)){
      if(allTypedText[indexOfTargetChord-1] != undefined){
        //if(allTypedText[indexOfTargetChord-1].slice(0, -1) != storedTestTextData[indexOfTargetChord-1]){

          input.innerHTML = allTypedText[indexOfTargetChord-1];
        let tt = allTypedText[allTypedText.length-1];
        //input.value = tt;
        allTypedText.pop();
        
        setCurrentSubindexInTrainingText(sub);
        input.value = tt;

       // }


      //input.setSelectionRange(allTypedText[indexOfTargetChord-1].length,allTypedText[indexOfTargetChord-1].length) as unknown as HTMLInputElement;
    }
  }

  }  


}
  return displayArray;
  }

   function letsFix(word, index, targetIndex, setS, userIsTypingFirstChord){
    let arr = [];
    if(word == null || word == undefined || setS == undefined || targetIndex == undefined || index ==undefined)
    return;
  
    let t = true;
    const conditionalValue = allTypedText.length-targetIndex;
    

    if(setS[setS.length-1] == " " && targetIndex != allTypedText.length && conditionalValue < 1){
      storeAllTypedText(setS);
      setTypedTrainingText('');
      arr = [];
      return;
   }
   console.log('Tough '+ targetIndex + "Length of alltypedArry "+ allTypedText.length+ " "+ allTypedText + ' '+ setS)
  
  //Add if the target index of the second array that houses content .length is greater than 1 we read that in
    const wordSplit = word[targetIndex];
    if(wordSplit[index] != setS && setS != undefined){
      if(wordSplit[index-1] != setS[index]){
        for(let counter = index; counter < setS.length; counter++){
          arr.push(setS[counter])
        }       
      }
    }
    if(setS[setS.length-1] == " "){
      arr =[];
    }
    return arr;
  }

  return (
<React.Fragment>
  <div className ="text-red-500">
    {letsFix(firstLineOfTargetText, targetCharacterIndex, indexOfTargetChord, setS,userIsTypingFirstChord )}
    </div>
    <TextPromptContainer>
      <ChordRow >
        {(firstLineOfTargetText || [])?.map((chord : any, i : any) => {
          if (characterEntryMode === "CHORD" || i !== indexOfTargetChord){
            return <Chord
              key={r()}
              active={i === indexOfTargetChord}
              error={isError && i === indexOfTargetChord}
            >
            {chord}
            </Chord>
            }
          else{
           //{getCheckAlgo(chord)} //This call checks to see if the a chorded device was used

            return <CharacterEntryChord word={chord} index={targetCharacterIndex} />
          }
          
        })}
      </ChordRow>
      <ChordRow>
      {whatTextToShow(firstLineOfTargetText, indexOfTargetChord)}
      
      </ChordRow>



      <ChordRow>
        {(secondLineOfTargetText || [])?.map((chord : any) => (
          <Chord key={r()}>{chord}</Chord>
        ))
        }
      </ChordRow>

    </TextPromptContainer>
    </React.Fragment>
  );
}

export default function CharacterEntryChord({ word, index }: { word: string, index: number | undefined }): ReactElement {
  if (index === undefined || index === null)
    return <span className="text-green-500" key={Math.random()}>{word}</span>

  const wordSplit = word.split("");  
  {          console.log('Baby im always here')}

  return (
    <div style={{ display: 'flex', flexDirection: 'row', color: "gray" }}>
      {wordSplit.slice(0, index).map((char) =>
        <span className="text-green-500" key={Math.random()}>{char}</span>
      )}
      <span className="text-blue-500 animate-pulse">{wordSplit[index]}</span>
      {wordSplit.slice(index + 1).map((char) =>
        <span className="text-grey" key={Math.random()}>{char}</span>
      )}
    </div>
    
  )
}



interface ChordProps {
  active?: boolean;
  error?: boolean;
}

const Chord = styled.span.attrs<ChordProps>((props) => ({
  className: `${props.active ? 'text-blue-500 underline' : ''} ${props.error ? 'text-red-500' : ''
    }`,
})) <ChordProps>``;

const ChordRow = styled.div.attrs({
  className: `flex flex-row gap-[1vw] justify-center w-full`,
})``;

const TextPromptContainer = styled.div.attrs({
  className: `
    flex text-md font-bold mt-6 flex flex-col items-center w-full	 justify-center text-gray-400
    sm:text-xl md:text-2xl xl:mt-29 bg-[#FFF] rounded-3xl p-10 h-40	m-auto font-mono
  `,
})``;
