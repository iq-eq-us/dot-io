import  ApexCharts from 'apexcharts';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import usePopover from '../../../hooks/usePopover';



export function storeData(data:any, dateData:any){

  //console.log("hererererererer")
  const wpmGraphWPM = [];
  const wpmGraphDate = [];

  const checkExistWPMD = localStorage.getItem("wpmGraphDate");
  const checkExistWPM = localStorage.getItem("wpmGraphWPM");
  const checkExistWPMDc = JSON.parse(checkExistWPMD);
  const checkExistWPMc = JSON.parse(checkExistWPM);
  //console.log(checkExistWPMDc);
  //console.log(checkExistWPMc);
  const currentDate = new Date();
  const date = currentDate.getDate();

 

if(((localStorage.getItem('topWPMDate'))==null)){
    localStorage.setItem("topWPMDate", JSON.stringify(date));

  wpmGraphWPM.push(Math.round(data));
  wpmGraphDate.push(dateData);
  localStorage.setItem("wpmGraphWPM", JSON.stringify(wpmGraphWPM));
  localStorage.setItem("wpmGraphDate", JSON.stringify(wpmGraphDate));

} else if(data > parseInt(checkExistWPMc[checkExistWPMc.length-1])){
 if((parseInt(localStorage.getItem("topWPMDate")) - date) == 0){
  const ge2 = localStorage.getItem("wpmGraphDate");
  const ge = localStorage.getItem("wpmGraphWPM");
  
  const wpmData = JSON.parse(ge);
  const dateD = JSON.parse(ge2);



  wpmData.splice((wpmData.length-1),1,(Math.round(data)));
  dateD.splice((dateD.length-1),1,dateData);

  localStorage.setItem("wpmGraphWPM", JSON.stringify(wpmData));
  localStorage.setItem("wpmGraphDate", JSON.stringify(dateD));
 } else{

  localStorage.setItem("topWPMDate", JSON.stringify(date));

  const ge2 = localStorage.getItem("wpmGraphDate");
  const ge = localStorage.getItem("wpmGraphWPM");
  
  const wpmData = JSON.parse(ge);
  const dateD = JSON.parse(ge2);

  wpmData.push(Math.round(data));
  dateD.push(dateData);

  localStorage.setItem("wpmGraphWPM", JSON.stringify(wpmData));
  localStorage.setItem("wpmGraphDate", JSON.stringify(dateD));

 }
} if((parseInt(localStorage.getItem("topWPMDate")!= null)) &&(parseInt(localStorage.getItem("theDate")) != (parseInt(localStorage.getItem("topWPMDate"))))){ // This pushes the previous wpm for the new date to ensure the graph flows  
  console.log('Entered the last else statement');

  const ge2 = localStorage.getItem("wpmGraphDate");
  const ge = localStorage.getItem("wpmGraphWPM");
  localStorage.setItem("topWPMDate", JSON.stringify(date));


  const wpmData = JSON.parse(ge);
  const dateD = JSON.parse(ge2);

  wpmData.push(parseInt(wpmData[wpmData.length-1]));
  dateD.push(dateData);

  localStorage.setItem("wpmGraphWPM", JSON.stringify(wpmData));
  localStorage.setItem("wpmGraphDate", JSON.stringify(dateD));

}
}
  

export function storeAverageData(avgData ,dateD, inChordMasterdValue, inAvgChordCount){
  const avgGraphWPM = [];
  const avgGraphDate = [];
  const masteredCounterArray: any =  [];

  const currentDate = new Date();
  const date = currentDate.getDate();

  const checkInDate = localStorage.getItem("theDate");
  const ifCheckInDate = JSON.parse(checkInDate);
  
  //Checks to see if there is not theDate object in local storage or is he date is more that -2 daa
  if((localStorage.getItem("theDate")==null)){
    if(localStorage.getItem("masteredChords")==null){//This is here to create these objects incase this is the first time a user is using LaunchPad
      localStorage.setItem("masteredChords",JSON.stringify(masteredCounterArray));
      sessionStorage.setItem("prevMasteredChordVal",JSON.stringify(0));
    }
    //Checks if the wpm is over 100, if the current value is not equal to the previous to prevent double counting and ensures this wasnt completed in 1 decisecond 
    if(inChordMasterdValue>=100 && (inChordMasterdValue != JSON.parse(sessionStorage.getItem("prevMasteredChordVal"))) && (inChordMasterdValue != 6276)){
      const mChords = JSON.parse(localStorage.getItem("masteredChords"));
      mChords.push(0);
      localStorage.setItem("masteredChords",JSON.stringify(mChords));
      sessionStorage.setItem("prevMasteredChordVal",JSON.stringify(inChordMasterdValue));
    }
    //These two if statements work on the avg counter
    if(localStorage.getItem("averageChordCounter")==null){
      localStorage.setItem("averageChordCounter",JSON.stringify(masteredCounterArray));
      sessionStorage.setItem("prevAverageChordCounter",JSON.stringify(0));
    }
    if(inAvgChordCount!= localStorage.getItem("prevAverageChordCounter")){
      let avgCount = JSON.parse(localStorage.getItem("averageChordCounter"));
      avgCount =+ inAvgChordCount
      let prevAvgCount = JSON.parse(localStorage.getItem("prevAverageChordCounter"));
      prevAvgCount = inAvgChordCount;

      localStorage.setItem("averageChordCounter",JSON.stringify(avgCount));
      localStorage.setItem("prevAverageChordCounter",JSON.stringify(prevAvgCount));
    }

    localStorage.setItem("count", JSON.stringify(0));
    localStorage.setItem("dailyWPMAVG", JSON.stringify(0));


    const getCounterFromLocal = localStorage.getItem("count");
    const getDailyWPM = localStorage.getItem("dailyWPMAVG");
    
    let parsedCounterFromLocal = JSON.parse(getCounterFromLocal);
    let dailyWPM = JSON.parse(getDailyWPM);

      parsedCounterFromLocal++;
      localStorage.setItem("count", JSON.stringify(parsedCounterFromLocal));

    const streak = 0;//Set the daily streak to 0 if a day has been missed
    storeData(avgData, dateD); //Call the StoreData method to add StoreData value to graph
    localStorage.setItem("streak", JSON.stringify(streak));

    dailyWPM =+ avgData; 
    avgGraphWPM.push(avgData);
    avgGraphDate.push(dateD);
    localStorage.setItem("theDate", JSON.stringify(date));
    localStorage.setItem("avgGraphWPM", JSON.stringify(avgGraphWPM));
    localStorage.setItem("avgGraphDate", JSON.stringify(avgGraphDate));
    localStorage.setItem("dailyWPMAVG", JSON.stringify(dailyWPM));

  

  }else {
    if(((date-ifCheckInDate)>=2)||((date-ifCheckInDate)<=-2)){
      if(localStorage.getItem('averageCount') == null){//Avg count number
        localStorage.setItem('averageCount', JSON.stringify(0))
      }else{
        localStorage.setItem('averageCount', JSON.stringify(0))
      }
      
      if(localStorage.getItem("masteredChords")==null){//This is here to create these objects incase this is the first time a user is using LaunchPad
        localStorage.setItem("masteredChords",JSON.stringify(masteredCounterArray));
        sessionStorage.setItem("prevMasteredChordVal",JSON.stringify(0));
      }   
        
      //Checks if the wpm is over 100, if the current value is not equal to the previous to prevent double counting and ensures this wasnt completed in 1 decisecond  
      if(inChordMasterdValue>=100 && (inChordMasterdValue != JSON.parse(sessionStorage.getItem("prevMasteredChordVal")))&& (inChordMasterdValue != 6276)){
        const mChords = JSON.parse(localStorage.getItem("masteredChords"));
        mChords.push(0);
        localStorage.setItem("masteredChords",JSON.stringify(mChords));
        sessionStorage.setItem("prevMasteredChordVal",JSON.stringify(inChordMasterdValue));
      }
      localStorage.setItem("averageChordCounter",JSON.stringify(0));
      localStorage.setItem("prevAverageChordCounter",JSON.stringify(6));
      
  
      localStorage.setItem("count", JSON.stringify(0));
      localStorage.setItem("dailyWPMAVG", JSON.stringify(0));
  
  
      const getCounterFromLocal = localStorage.getItem("count");
      const getDailyWPM = localStorage.getItem("dailyWPMAVG");

      const avgGetGD = localStorage.getItem("avgGraphDate");
      const avgGetGW = localStorage.getItem("avgGraphWPM");
      
      const avgDData = JSON.parse(avgGetGD);
      const avgWData = JSON.parse(avgGetGW);
      
      let parsedCounterFromLocal = JSON.parse(getCounterFromLocal);
      let dailyWPM = JSON.parse(getDailyWPM);
  
        parsedCounterFromLocal++;
        localStorage.setItem("count", JSON.stringify(parsedCounterFromLocal));
  
      const streak = 0;//Set the daily streak to 0 if a day has been missed
      storeData(avgData, dateD); //Call the StoreData method to add StoreData value to graph
      localStorage.setItem("streak", JSON.stringify(streak));
  
      dailyWPM =+ avgData; 
      avgWData.push(avgData);
      avgDData.push(dateD);
      localStorage.setItem("theDate", JSON.stringify(date));
      localStorage.setItem("avgGraphWPM", JSON.stringify(avgWData));
      localStorage.setItem("avgGraphDate", JSON.stringify(avgDData));
      localStorage.setItem("dailyWPMAVG", JSON.stringify(dailyWPM));
    }

    else if(date-(parseInt(localStorage.getItem("theDate"))) == 1){
     
      /////
      if(localStorage.getItem("masteredChords")==null){//This is here to create these objects incase this is the first time a user is using LaunchPad
        localStorage.setItem("masteredChords",JSON.stringify(masteredCounterArray));
        sessionStorage.setItem("prevMasteredChordVal",JSON.stringify(0));
      }     
      //Checks if the wpm is over 100, if the current value is not equal to the previous to prevent double counting and ensures this wasnt completed in 1 decisecond  
      if(inAvgChordCount!= localStorage.getItem("prevAverageChordCounter")){
        let avgCount = JSON.parse(localStorage.getItem("averageChordCounter"));
        let prevAvgCount = JSON.parse(localStorage.getItem("prevAverageChordCounter"));

        const inValtoAdd = inAvgChordCount == 6 ? 6: 1;//This is to offset the calibrating number
        avgCount = avgCount + inValtoAdd;
        prevAvgCount = inAvgChordCount;

        localStorage.setItem("averageChordCounter",JSON.stringify(avgCount));
        localStorage.setItem("prevAverageChordCounter",JSON.stringify(prevAvgCount));
      }

      localStorage.setItem("averageChordCounter",JSON.stringify(0));
      localStorage.setItem("prevAverageChordCounter",JSON.stringify(6));
      
     
      localStorage.setItem("count", JSON.stringify(0));//Set AVG counter to 0
      localStorage.setItem("dailyWPMAVG", JSON.stringify(0));

      const getCounterFromLocal = localStorage.getItem("count");
      const getDailyWPM = localStorage.getItem("dailyWPMAVG");

      let parsedCounterFromLocal = JSON.parse(getCounterFromLocal);
      
      parsedCounterFromLocal++;
      localStorage.setItem("count", JSON.stringify(parsedCounterFromLocal));

      storeData(avgData, dateD); //Call the StoreData method to add StoreData value to graph if it is a different day
    
      const avgGetGD = localStorage.getItem("avgGraphDate");
      const avgGetGW = localStorage.getItem("avgGraphWPM");
      
      const avgDData = JSON.parse(avgGetGD);
      const avgWData = JSON.parse(avgGetGW);

      localStorage.setItem("theDate", JSON.stringify(date));
      const val = (avgData+parseInt(avgWData[avgWData.length-1]))/2;

      avgWData.push(Math.round(val));
      avgDData.push(dateD);
  
      localStorage.setItem("avgGraphWPM", JSON.stringify(avgWData));
      localStorage.setItem("avgGraphDate", JSON.stringify(avgDData));

      const streak = localStorage.getItem("streak");
      const streakVal = JSON.parse(streak);

      localStorage.setItem("streak", JSON.stringify(parseInt(streakVal)+1));

      } 
      else if((parseInt(localStorage.getItem("theDate")) - date) == 0){ //If it is the same day
        if(localStorage.getItem("masteredChords")==null){//This is here to create these objects incase this is the first time a user is using LaunchPad
          localStorage.setItem("masteredChords",JSON.stringify(masteredCounterArray));
          sessionStorage.setItem("prevMasteredChordVal",JSON.stringify(0));
        }
        //Checks if the wpm is over 100, if the current value is not equal to the previous to prevent double counting and ensures this wasnt completed in 1 decisecond 
         if(inChordMasterdValue>=100 && (inChordMasterdValue != JSON.parse(sessionStorage.getItem("prevMasteredChordVal"))) && (inChordMasterdValue != 6276)){
          const mChords = JSON.parse(localStorage.getItem("masteredChords"));
          mChords.push(0);
          localStorage.setItem("masteredChords",JSON.stringify(mChords));
          sessionStorage.setItem("prevMasteredChordVal",JSON.stringify(inChordMasterdValue));
        }
         //These two if statements work on the avg counter
          if(localStorage.getItem("averageChordCounter")==null){
            localStorage.setItem("averageChordCounter",JSON.stringify(0));
            sessionStorage.setItem("prevAverageChordCounter",JSON.stringify(0));
          }
          if(inAvgChordCount!= localStorage.getItem("prevAverageChordCounter")){
            let avgCount = JSON.parse(localStorage.getItem("averageChordCounter"));
            let prevAvgCount = JSON.parse(localStorage.getItem("prevAverageChordCounter"));

            const inValtoAdd = inAvgChordCount == 6 ? 6: 1;//This is to offset the calibrating number
            avgCount = avgCount + inValtoAdd;
            prevAvgCount = inAvgChordCount;

            localStorage.setItem("averageChordCounter",JSON.stringify(avgCount));
            localStorage.setItem("prevAverageChordCounter",JSON.stringify(prevAvgCount));
          }
          const avgCount = JSON.parse(localStorage.getItem("averageChordCounter"));
          
      const avgGetGD = localStorage.getItem("avgGraphDate");
      const avgGetGW = localStorage.getItem("avgGraphWPM");

      const avgWData = JSON.parse(avgGetGW);
      const avgDData = JSON.parse(avgGetGD);

      const val = (avgData+(parseInt(avgWData[((avgWData.length)-1)])*(avgCount-1)))/avgCount;
    
      avgWData.splice((avgWData.length-1),1,Math.round(val));
      avgDData.splice((avgDData.length-1),1,dateD);

      localStorage.setItem("avgGraphWPM", JSON.stringify(avgWData));
      localStorage.setItem("avgGraphDate", JSON.stringify(avgDData));


    } else{
      //Nothing

    }
  
  }

}

export function getHighestWPM(){
  const checkWPMArray = localStorage.getItem("wpmGraphWPM");
  const checkIt = JSON.parse(checkWPMArray);

  if(checkIt == null) {
    return 0;
  } else{
    return parseInt(JSON.parse(localStorage.getItem("wpmGraphWPM"))[JSON.parse(localStorage.getItem("wpmGraphWPM")).length-1]);
  }
}

export function getAverageWPM(){
  const checkWPMArray = localStorage.getItem("avgGraphWPM");
  const checkIt = JSON.parse(checkWPMArray);

  if(checkIt == null) {
    return 0;
  } else{
    return parseInt(JSON.parse(localStorage.getItem("avgGraphWPM"))[JSON.parse(localStorage.getItem("avgGraphWPM")).length-1]);
  }
}

export function myGraph(){

 const options = {
  chart: {
    type: "area",
    height: 350,
    foreColor: "#FFFFFF",
    stacked: false,
    dropShadow: {
      enabled: false,
      enabledSeries: [0],
      top: -2,
      left: 2,
      blur: 5,
      opacity: 1
    }
    

  },
  colors: ['#00E396', '#0090FF'],
  stroke: {
    curve: "smooth",
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  series: [ {
    name: 'Best WPM',
    data: generateDayWiseTimeSeries1()
  },
  {
    name: 'Average Speed',
    data: generateDayWiseTimeSeries2()
  }],
  markers: {
    size: 0,
    strokeColor: "#fff",
    strokeWidth: 3,
    strokeOpacity: 1,
    fillOpacity: 1,
    hover: {
      size: 6
    }
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      offsetX: 0,
      offsetY: -5
    },
    tooltip: {
      enabled: true
    }
  },
  grid: {
    padding: {
      left: -5,
      right: 5
    }
  },
  tooltip: {
    x: {
      format: 'dd MM yyyy'
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  },
  fill: {
    type: "solid",
    fillOpacity: 0.7
  },
  
};

const chart = new ApexCharts(document.getElementById("timeline-chart"), options);

chart.render();
}

function generateDayWiseTimeSeries1() {

  const ge2 = localStorage.getItem("wpmGraphDate");
  const ge = localStorage.getItem("wpmGraphWPM");

  const wpmData = JSON.parse(ge);
  const dateD = JSON.parse(ge2);

  console.log(ge);
  console.log(ge2);
  
  const currentDate = new Date();
  const date = currentDate.getDate();

 if((parseInt(localStorage.getItem("theDate"))) == null){//If a date doesn't exist
  storeData(0, currentDate);
 }

  let i = 0;
  const series = [];
  if(wpmData != null){
    while (i < wpmData.length) {
      series.push([dateD[i], wpmData[i]]);
      
      i++;
    }
  } else {
    const todaysDate = new Date();
    series.push([todaysDate, 0]);
}

  return series;
}

function generateDayWiseTimeSeries2() {


  const ge = localStorage.getItem("avgGraphWPM");
  const ge2 = localStorage.getItem("avgGraphDate");
  const todaysDate = new Date();

  const avgWpmData = JSON.parse(ge);
  const avgDateD = JSON.parse(ge2);
  console.log(avgWpmData);
  console.log(avgDateD);

  let i = 0;
  const series = [];

  const currentDate = new Date();
  const date = currentDate.getDate();
//If this is called and the expressiton is true this means the user has not attempted a training session. So we add the previously stored data to make the graph flush
 if((parseInt(localStorage.getItem("theDate"))) == null){
  storeAverageData(0, currentDate, 0);

 }

  if(avgWpmData != null){
    while (i < avgWpmData.length) {

      series.push([avgDateD[i], avgWpmData[i]]);
      const todaysDate = new Date();

      //console.log(todaysDate== avgDateD[0]);
      
      i++;
    }
  } else{
    const todaysDate = new Date();
    series.push([todaysDate, 0]);

  }

  return series;
}



export function Graph(): ReactElement {
  
  const { parentProps: topSpeed, Popper: SpeedPopper } = usePopover(
    'This shows the fastest you have typed in any training module. Get a faster top speed to progress through the training modules',
  );
  const { parentProps: avgSpeed, Popper: avgPopper } = usePopover(
    'This shows the average speed you have typed for the most recent day you have practiced.',
  );
  const { parentProps: chordsMastered, Popper: chordsPopper } = usePopover(
    'This shows the number of words you have Mastered by completing a word at a speed of 100 WPM or higher.',
  );
  const { parentProps: practiceStreak, Popper: practicePopper } = usePopover(
    'This shows how many days in a row you have practiced in any training module.',
  );
 
  React.useEffect(() => {
    myGraph()
  }, []);
  return (
    <React.Fragment>
          {practicePopper}
          {chordsPopper}
          {avgPopper}
          {SpeedPopper}


      <div className='sc-ikJyIC w-full  lg:mx-auto flex flex-row '>
      <PracticeStreak {...practiceStreak}>Practice Streak: {(localStorage.getItem("streak") == null ? 0 : localStorage.getItem("streak")) + ((parseInt(localStorage.getItem("streak")) != 1) ? " days": " day")}</PracticeStreak>
      <TopSpeed {...topSpeed}> Top Speed: {(getHighestWPM() + " WPM")}</TopSpeed>
      <AverageSpeed {...avgSpeed}>Average Speed: {(getAverageWPM() + " WPM")}</AverageSpeed>
      <ChordsMastered {...chordsMastered}>Chords Mastered: {(JSON.parse(localStorage.getItem("masteredChords")) == null ? 0 :  JSON.parse(localStorage.getItem("masteredChords")).length)}</ChordsMastered>


      </div>
      <div id="chart">
     <div id="timeline-chart"/>
      </div>
   
    </React.Fragment>
  );
}
  export const AverageSpeed = styled.button.attrs({
    className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
  })``;
  export const ChordsMastered = styled.button.attrs({
    className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
  })``;
  export const TopSpeed = styled.button.attrs({
    className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
  })``;
  export const PracticeStreak = styled.button.attrs({
    className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
  })``;
