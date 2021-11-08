import  ApexCharts from 'apexcharts';
import React, { ReactElement } from 'react';



export function isThereWPMData(){

  if(localStorage.getItem('wpmGraphData') == 'string') {

    return true;
  }
return false;
}


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
 

if(((localStorage.getItem('topWPMDate'))==null)||(parseInt(localStorage.getItem('topWPMDate'))==0)){
    localStorage.setItem("topWPMDate", JSON.stringify(date));

  wpmGraphWPM.push(Math.round(data));
  wpmGraphDate.push(dateData);
  localStorage.setItem("wpmGraphWPM", JSON.stringify(wpmGraphWPM));
  localStorage.setItem("wpmGraphDate", JSON.stringify(wpmGraphDate));

}
 else if((parseInt(localStorage.getItem("topWPMDate")) - date) == 0){
  //console.log('It does exist still checking');
  const ge2 = localStorage.getItem("wpmGraphDate");
  const ge = localStorage.getItem("wpmGraphWPM");
  
  const wpmData = JSON.parse(ge);
  const dateD = JSON.parse(ge2);

  wpmData.splice((wpmData.length-1),1,Math.round(data));
  dateD.splice((dateD.length-1),1,dateData);

  localStorage.setItem("wpmGraphWPM", JSON.stringify(wpmData));
  localStorage.setItem("wpmGraphDate", JSON.stringify(dateD));
 } else{
  //console.log('Entering the last else statement but why am I doing this?');
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
}
  

export function storeAverageData(avgData ,dateD){

  const avgGraphWPM = [];
  const avgGraphDate = [];

  const avgD = localStorage.getItem("avgGraphWPM");
 const avgDD = localStorage.getItem("avgGraphDate");

  const avgDParse = JSON.parse(avgD);
  const avgDDParse = JSON.parse(avgDD);

  const currentDate = new Date();
  const date = currentDate.getDate();


  const checkInDate = localStorage.getItem("theDate");
  const ifCheckInDate = JSON.parse(checkInDate);
  //localStorage.setItem("theDate", JSON.stringify(monthDateYear));
  //console.log(ifCheckInDate)

  //console.log(date + ifCheckInDate)
 // console.log("Subchecker " + (date- parseInt(ifCheckInDate)))

  //Checks to see if there is not theDate object in local storage or is he date is more that -2 daa
  if((localStorage.getItem("theDate")==null)|| ((date-ifCheckInDate)>=2)||((date-ifCheckInDate)<=-2)){
    const streak = 0;
    localStorage.setItem("streak", JSON.stringify(streak));
  
    avgGraphWPM.push(avgData);
    avgGraphDate.push(dateD);
    localStorage.setItem("theDate", JSON.stringify(date));


    localStorage.setItem("avgGraphWPM", JSON.stringify(avgGraphWPM));
    localStorage.setItem("avgGraphDate", JSON.stringify(avgGraphDate));
  

  }else {
    if(date-(parseInt(localStorage.getItem("theDate"))) == 1){
    
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
  
    
        //console.log(avgWData);
        //console.log(avgDData)

        const streak = localStorage.getItem("streak");
        const streakVal = JSON.parse(streak);

        localStorage.setItem("streak", JSON.stringify(parseInt(streakVal)+1));

      } 
      else if((parseInt(localStorage.getItem("theDate")) - date) == 0){
  
    const avgGetGD = localStorage.getItem("avgGraphDate");
    const avgGetGW = localStorage.getItem("avgGraphWPM");
    
    const avgWData = JSON.parse(avgGetGW);
    const avgDData = JSON.parse(avgGetGD);
    //console.log(dateD)

    //console.log("This is avg " + avgWData)
    //console.log("This is avg " + avgDData)

 

    const val = (avgData+parseInt(avgDParse[((avgDParse.length)-1)]))/2;
     // console.log('value '+ val);
     // console.log(avgData);
    //  console.log(parseInt(avgDParse[((avgDParse.length)-1)]));
      
      avgWData.splice((avgWData.length-1),1,Math.round(val));
      avgDData.splice((avgDData.length-1),1,dateD);
     // console.log(avgDData.length);
      localStorage.setItem("avgGraphWPM", JSON.stringify(avgWData));
      localStorage.setItem("avgGraphDate", JSON.stringify(avgDData));

  
      //console.log(avgWData);
      //console.log(avgDData)
    } else{
      //Nothing

    }
  
  }

}

export function myGraph(){
 // console.log(generateDayWiseTimeSeries1());

  const checkExistWPMD = localStorage.getItem("wpmGraphDate");
  const checkExistWPM = localStorage.getItem("wpmGraphWPM");
  const checkExistWPMDc = JSON.parse(checkExistWPMD);
  const checkExistWPMc = JSON.parse(checkExistWPM);
//console.log(checkExistWPMDc);
//console.log(checkExistWPMc);

 // console.log(generateDayWiseTimeSeries2());

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
    name: 'Average Speed',
    data: generateDayWiseTimeSeries2()
  },{
    name: 'Best WPM',
    data: generateDayWiseTimeSeries1()
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
  
  const currentDate = new Date();
  const date = currentDate.getDate();

 if((parseInt(localStorage.getItem("theDate"))) == null){
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
  //console.log(ge2);
  //console.log(ge);

  let i = 0;
  const series = [];

  const currentDate = new Date();
  const date = currentDate.getDate();
//If this is called and the ecpressiton is true this means the user has not attempted a game. So we add the previously stored data to make the graph flush
 if((parseInt(localStorage.getItem("theDate"))) == null){
  storeAverageData(0, currentDate);

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
  React.useEffect(() => {
    myGraph()
  }, []);
  return (
    
    <React.Fragment>


      <h1>Day Streak: {localStorage.getItem("streak")}</h1>
      <div id="chart">
     <div id="timeline-chart"/>
      </div>
   
    </React.Fragment>
  );
}