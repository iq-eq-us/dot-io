import React, { ReactElement, useState } from 'react';
import { FaBorderStyle } from 'react-icons/fa';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';
import { TrainingStoreModel } from '../../../../src/models/trainingStore';
import { indexOf } from 'lodash';

const r = Math.random;

export function TextBluredScreen(){

  const setTextPromptUnFocused = useStoreActions(
    (store) => store.setTextPromptUnFocused,
  );

  return <div className="wi from-green-800	 bg-zinc-300 absolute w-full h-40 rounded-3xl pt-16 text-black" onClick= {()=> [document.getElementById('txt_Name')?.focus(), setTextPromptUnFocused(false)]}>Press Prompt to Re-Focus</div>
}

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

  const textPromptUnFocused = useStoreState(
    (store) => store.textPromptUnFocused,
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
  const setEditingPreviousWord = useStoreActions((store) => store.setUserIsEditingPreviousWord,);
  const isEditingPreviousWord = useStoreState((store : any) => store.userIsEditingPreviousWord,);


  const [bestKeyTime, setBestKeyTime] = useState([]);
  const [letterPressed, setLetterPressed] = useState([]);
  const [keyDownTime, setKeyDownTime] = useState(performance.now());
  const [currentWord, setCurrentWord] = useState(undefined);
  const [targetIndexForWhatErrorTextToShow, setTargetIndexForWhatErrorTextToShow] = useState(0);



  //return whatTextToShow(firstLineOfTargetText, indexOfTargetChord,indexOfCharacterInTargetChord, arr)

  function whatTextToShow(targetTextLineOne : any, targetChordIndex: any, indexOfCharacterInTargetChord: any, arr: any){
//     && indexOfTargetChord == 0 


    let displayArray = [];
    //console.log('Target character index '+targetCharacterIndex + " alltyped "+ allTypedText.length);
    if(allTypedText.length>=0 && storedTestTextData != undefined){
      //console.log('Target character index '+targetCharacterIndex + " alltyped "+ allTypedText.length);

      ((indexOfTargetChord-1 == 0 ) && targetIndexForWhatErrorTextToShow != allTypedText.length-1)? setTargetIndexForWhatErrorTextToShow(allTypedText.length-1) : "do me baby ";
     if (targetIndexForWhatErrorTextToShow > allTypedText.length){
      setTargetIndexForWhatErrorTextToShow(0);
     }

      let spacesBetweenWords = 0;
      let characterLengthOfTheEntireLine = 0;
      if(targetChordIndex ==0 && targetTextLineOne!=undefined && targetCharacterIndex == 0 && allTypedText.length >=0){
        
        const tempArray =[];
        let tempValue = '';
        tempArray.push(<div className='text-red-500'>{arr}</div>);
        for(let f =1; f<targetTextLineOne.length;f++){
          tempValue = targetTextLineOne[f]+" ";
        
          tempArray.push(<div className='text-white'>{tempValue}</div>);
        }
        displayArray = tempArray;
        console.log('asjdnjsnfsf '+tempValue +targetTextLineOne+ arr);
        return displayArray;
      } 

     

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
          //Here we're checking if the typed word is greater than the stored value we are subtracting by 1 to account for the space bar
          if(allTypedText[i].length-1 > storedTestTextData[i].length){

            let periodsIfLengthOfTypedErrorIsLongerThanChordsLength ='';
            //Here we are looping through to get the length of the word thats being tested so that we can return '...' that are the length of the word
            for(let y= 0; y<storedTestTextData[i].length; y++) { 
              periodsIfLengthOfTypedErrorIsLongerThanChordsLength += "."
            }
            displayArray.push(<div className ="text-red-500">{periodsIfLengthOfTypedErrorIsLongerThanChordsLength}</div>)

          } else if(targetChordIndex !=0) {
            const tempValue = storedTestTextData[i].length - allTypedText[i].length;
            let tempBufferValues = '';
            
            for(let y= 0; y<tempValue; y++) { 
              tempBufferValues += "."
            }
            
            displayArray.push(<React.Fragment><div className ="text-red-500" style={{ display: 'flex', flexDirection: 'row'}}>{allTypedText[i].slice(0, -1)}</div>{tempBufferValues.indexOf('.') != -1 ? <div className ="text-white">{tempBufferValues}</div> : ''}</React.Fragment>)
            
          }

        
      }
      }
      if((allTypedText.length - i) == 1){
        const y  = allTypedText.length;
        for(let d = y ; d < (targetTextLineOne.length + targetIndexForWhatErrorTextToShow); d++ ){

          let sd = ''
          for(let r =0; r<storedTestTextData[d]?.length; r++){

          sd += "+";
          }
          sd += ' ';
           d == y ? sd == sd.slice(1) : sd; 
          displayArray.push(<div className ="text-white">{sd}</div>);
         // displayArray.push(" ");
        }
        //This peice of code handles the experience while your typing in real time
        if(arr.length != 0 ){
          const tempVal = storedTestTextData[indexOfTargetChord + targetIndexForWhatErrorTextToShow].length - arr.length;
          let tempBufferValues = '';
          let frontBufferValues = '';

          let y=  0;
            for(y; y<(tempVal- targetCharacterIndex); y++) { 
              tempBufferValues += "."
            }
            for(let g = 0; g<targetCharacterIndex; g++) { 
              frontBufferValues += "."
            }
         displayArray[indexOfTargetChord]=(<div style={{ display: 'flex', flexDirection: 'row'}}>{frontBufferValues.indexOf('.') != -1 ? <span className="text-white m-0 flex">{frontBufferValues}</span>: ''}<span className ="text-red-500 flex m-0">{arr}</span>{tempBufferValues.indexOf('.') != -1 ? <span className="text-white m-0 flex" >{tempBufferValues}</span>: ''}</div>)
       }
        
      }


    }
  }
 // const compare = allTypedText[indexOfTargetChord-1];
 //compare.slice(0, -1)
 // if(compare.charAt(compare.length -1) 
      

 //This  code here handles the logic in the case the user back spaces to edit an errored word
  const input = document.getElementById('txt_Name') as unknown as HTMLInputElement;
  if(input!= null){

  input.onkeydown = (e) => {
    if ( !e.metaKey ) {
        e.stopPropagation();
    }
    const key = e.keyCode || e.charCode;
    const sub = indexOfTargetChord -1;

    if(( key == 8 || key == 46 ) && (indexOfTargetChord + targetIndexForWhatErrorTextToShow == allTypedText.length) && (input.value.length == 0)){
      if(allTypedText[indexOfTargetChord-1] != undefined){
        //if(allTypedText[indexOfTargetChord-1].slice(0, -1) != storedTestTextData[indexOfTargetChord-1]){

          input.innerHTML = allTypedText[indexOfTargetChord-1];
        const tt = allTypedText[allTypedText.length-1];
        //input.value = tt;
        const compare = storeAllTypedText[indexOfTargetChord-1+targetIndexForWhatErrorTextToShow];
        //compare.slice(0, -1) == storedTestTextData[indexOfTargetChord+targetIndexForWhatErrorTextToShow]
        //console.log('porn +='+ allTypedText[(indexOfTargetChord-1)+targetIndexForWhatErrorTextToShow].slice(0, -1) +" storedTestData"+ storedTestTextData[(indexOfTargetChord-1)+targetIndexForWhatErrorTextToShow])
       if(allTypedText[(indexOfTargetChord-1)+targetIndexForWhatErrorTextToShow].slice(0, -1) != storedTestTextData[(indexOfTargetChord-1)+targetIndexForWhatErrorTextToShow] && (indexOfTargetChord !=0)){
        setEditingPreviousWord(true);
        setCurrentSubindexInTrainingText(sub);
        input.value = tt;
        allTypedText.pop();

      }
       // }


      //input.setSelectionRange(allTypedText[indexOfTargetChord-1].length,allTypedText[indexOfTargetChord-1].length) as unknown as HTMLInputElement;
    }
  }

  }  


   displayArray = displayArray.length == 0 ? <div className='text-white'>[</div>: displayArray;

}  return displayArray;
  }

  


   function letsFix(word, indexOfCharacterInTargetChord, indexOfTargetChord, setS){
    let arr : string [] = [] ;
    
  
    const conditionalValue = allTypedText.length-indexOfTargetChord;
    
    if(allTypedText.length == 0 && setS.length !=0){
      return  whatTextToShow(firstLineOfTargetText, indexOfTargetChord,indexOfCharacterInTargetChord, arr)

    }
    console.log('Checking to fix rthe refresh issue '+ allTypedText.length + " yer = "+ setS)

    if(setS[setS.length-1] == " " && indexOfTargetChord != allTypedText.length && conditionalValue < 1){
      storeAllTypedText(setS);
      setTypedTrainingText('');
      arr = [];
      return;
   }
   console.log('Tough '+ indexOfTargetChord + "Length of alltypedArry "+ allTypedText.length+ " "+ allTypedText + ' '+ setS)
  
  //Add if the target index of the second array that houses content .length is greater than 1 we read that in
    const wordSplit = word != undefined && indexOfTargetChord != undefined && indexOfCharacterInTargetChord != undefined ? word[indexOfTargetChord]: '';
    if(wordSplit[indexOfCharacterInTargetChord] != setS && setS != undefined){
      if(wordSplit[indexOfCharacterInTargetChord-1] != setS[indexOfCharacterInTargetChord]){
        for(let counter = indexOfCharacterInTargetChord; counter < setS.length; counter++){
          arr.push(setS[counter])
        }       
      }
    }
    if(setS[setS.length-1] == " "){
      arr =[];
    }
   return  whatTextToShow(firstLineOfTargetText, indexOfTargetChord,indexOfCharacterInTargetChord, arr)
    //return arr;
  }

  function colorTargetLine(firstLineValue : any[]){

    const newTargetLine = firstLineValue;

    for(let i =0; i<indexOfTargetChord; i++){
      let you;

      you = firstLineOfTargetText[i]
      newTargetLine.splice(i, 1, <div className="text-black">{you}</div>)
    }

    return newTargetLine;
  }

  return (
<React.Fragment>
  <div className ="text-red-500">
    </div>

    <TextPromptContainer>
    {textPromptUnFocused ? TextBluredScreen(): ''}
      <ChordRow >
        {(colorTargetLine(firstLineOfTargetText) || [])?.map((chord : any, i : any) => {
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
            return <CharacterEntryChord word={chord} index={targetCharacterIndex} wordArray={firstLineOfTargetText} indexOfWord={indexOfTargetChord} allTypedTextInput={allTypedText}/>
          }
          
        })}
      </ChordRow>
      <ChordRow>        
        {letsFix(firstLineOfTargetText, targetCharacterIndex, indexOfTargetChord, setS )}
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

export default function CharacterEntryChord({ word, index, wordArray, indexOfWord, allTypedTextInput }: { word: string, index: number | undefined, wordArray : string[], indexOfWord : number | undefined, allTypedTextInput : string[] }): ReactElement {
  if (index === undefined || index === null)
    return <span className="text-green-500" key={Math.random()}>{word}</span>

  const wordSplit = word.split("");  
  const typedTextSplit = allTypedTextInput[0]?.split("");
  console.log("Split typed tect "+ typedTextSplit + " and the target characer index is "+ index)
  const newWordArray = wordArray;
  let increment;
  indexOfWord == undefined ? increment = 0 : increment =(wordArray.length - indexOfWord);
  console.log('Im not undefined im incrememnting' + increment + wordArray.length)


  return (
    <div style={{ display: 'flex', flexDirection: 'row', color: "gray" }}>
      {wordSplit.slice(0, index).map((char) =>
        <span className="text-green-500" key={Math.random()}>{char}</span>
      )}
      {//for each 
      }
      <span className="text-blue-500 animate-pulse">{wordSplit[index]}</span>
      {wordSplit.slice(index + 1).map((char) =>
        <span className="text-grey" key={Math.random()}>{char}</span>
      )}
      {//newWordArray.slice(0, indexOfWord).map((char) =>
        //<span className="text-black" key={Math.random()}>{char}</span>
     // )
    }
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
