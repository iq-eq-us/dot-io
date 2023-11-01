import ApexCharts from 'apexcharts';
import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import usePopover from '../../../hooks/usePopover';
import { HorizontalRule } from '../manager.styled';

export function storeData(data: any, dateData: any) {
  //console.log("hererererererer")
  const wpmGraphWPM = [];
  const wpmGraphDate = [];

  const checkExistWPMD = localStorage.getItem('wpmGraphDate');
  const checkExistWPM = localStorage.getItem('wpmGraphWPM');
  const checkExistWPMDc = JSON.parse(checkExistWPMD);
  const checkExistWPMc = JSON.parse(checkExistWPM);
  //console.log(checkExistWPMDc);
  //console.log(checkExistWPMc);
  const currentDate = new Date();
  const date = currentDate.getDate();

  if (localStorage.getItem('topWPMDate') == null) {
    localStorage.setItem('topWPMDate', JSON.stringify(date));

    wpmGraphWPM.push(Math.round(data));
    wpmGraphDate.push(dateData);
    localStorage.setItem('wpmGraphWPM', JSON.stringify(wpmGraphWPM));
    localStorage.setItem('wpmGraphDate', JSON.stringify(wpmGraphDate));
  } else if (data > parseInt(checkExistWPMc[checkExistWPMc.length - 1])) {
    if (parseInt(localStorage.getItem('topWPMDate')) - date == 0) {
      const ge2 = localStorage.getItem('wpmGraphDate');
      const ge = localStorage.getItem('wpmGraphWPM');

      const wpmData = JSON.parse(ge);
      const dateD = JSON.parse(ge2);

      wpmData.splice(wpmData.length - 1, 1, Math.round(data));
      dateD.splice(dateD.length - 1, 1, dateData);

      localStorage.setItem('wpmGraphWPM', JSON.stringify(wpmData));
      localStorage.setItem('wpmGraphDate', JSON.stringify(dateD));
    } else {
      localStorage.setItem('topWPMDate', JSON.stringify(date));

      const ge2 = localStorage.getItem('wpmGraphDate');
      const ge = localStorage.getItem('wpmGraphWPM');

      const wpmData = JSON.parse(ge);
      const dateD = JSON.parse(ge2);

      wpmData.push(Math.round(data));
      dateD.push(dateData);

      localStorage.setItem('wpmGraphWPM', JSON.stringify(wpmData));
      localStorage.setItem('wpmGraphDate', JSON.stringify(dateD));
    }
  }
  if (
    JSON.parse(localStorage.getItem('topWPMDate') != null) &&
    parseInt(JSON.parse(localStorage.getItem('theDate'))) !=
      parseInt(JSON.parse(localStorage.getItem('topWPMDate')))
  ) {
    // This pushes the previous wpm for the new date to ensure the graph flows
    //console.log('Entered the last else statement');

    const ge2 = localStorage.getItem('wpmGraphDate');
    const ge = localStorage.getItem('wpmGraphWPM');
    localStorage.setItem('topWPMDate', JSON.stringify(date));

    const wpmData = JSON.parse(ge);
    const dateD = JSON.parse(ge2);

    wpmData.push(parseInt(wpmData[wpmData.length - 1]));
    dateD.push(dateData);

    localStorage.setItem('wpmGraphWPM', JSON.stringify(wpmData));
    localStorage.setItem('wpmGraphDate', JSON.stringify(dateD));
  }
}

export function storeAverageData(
  avgData: number,
  dateD: Date,
  inChordMasteredValue: number,
  inAvgChordCount: string | number | null | undefined,
) {
  const avgGraphWPM = [];
  const avgGraphDate = [];
  const masteredCounterArray: unknown = [];

  const currentDate = new Date();
  const date = currentDate.getDate();

  const checkInDate = localStorage.getItem('theDate');
  const ifCheckInDate = JSON.parse(checkInDate);

  //Checks to see if there is not theDate object in local storage or is he date is more that -2 daa
  if (localStorage.getItem('theDate') == null) {
    //These two if statements work on the avg counter
    if (localStorage.getItem('averageChordCounter') == null) {
      localStorage.setItem(
        'averageChordCounter',
        JSON.stringify(masteredCounterArray),
      );
      localStorage.setItem('prevAverageChordCounter', JSON.stringify(0));
    }
    if (inAvgChordCount != localStorage.getItem('prevAverageChordCounter')) {
      let avgCount = JSON.parse(localStorage.getItem('averageChordCounter'));
      avgCount = +inAvgChordCount;
      let prevAvgCount = JSON.parse(
        localStorage.getItem('prevAverageChordCounter'),
      );
      prevAvgCount = inAvgChordCount;

      localStorage.setItem('averageChordCounter', JSON.stringify(avgCount));
      localStorage.setItem(
        'prevAverageChordCounter',
        JSON.stringify(prevAvgCount),
      );
    }

    localStorage.setItem('count', JSON.stringify(0));
    localStorage.setItem('dailyWPMAVG', JSON.stringify(0));

    const getCounterFromLocal = localStorage.getItem('count');
    const getDailyWPM = localStorage.getItem('dailyWPMAVG');

    let parsedCounterFromLocal = JSON.parse(getCounterFromLocal);
    let dailyWPM = JSON.parse(getDailyWPM);

    parsedCounterFromLocal++;
    localStorage.setItem('count', JSON.stringify(parsedCounterFromLocal));

    const streak = 0; //Set the daily streak to 0 if a day has been missed
    storeData(avgData, dateD); //Call the StoreData method to add StoreData value to graph
    localStorage.setItem('streak', JSON.stringify(streak));

    dailyWPM = +avgData;
    avgGraphWPM.push(avgData);
    avgGraphDate.push(dateD);
    localStorage.setItem('theDate', JSON.stringify(date));
    localStorage.setItem('avgGraphWPM', JSON.stringify(avgGraphWPM));
    localStorage.setItem('avgGraphDate', JSON.stringify(avgGraphDate));
    localStorage.setItem('dailyWPMAVG', JSON.stringify(dailyWPM));
  } else {
    if (date - ifCheckInDate >= 2 || date - ifCheckInDate <= -2) {
      if (localStorage.getItem('averageCount') == null) {
        //Avg count number
        localStorage.setItem('averageCount', JSON.stringify(0));
      } else {
        localStorage.setItem('averageCount', JSON.stringify(0));
      }

      localStorage.setItem('averageChordCounter', JSON.stringify(0));
      localStorage.setItem('prevAverageChordCounter', JSON.stringify(6));

      localStorage.setItem('count', JSON.stringify(0));
      localStorage.setItem('dailyWPMAVG', JSON.stringify(0));

      const getCounterFromLocal = localStorage.getItem('count');
      const getDailyWPM = localStorage.getItem('dailyWPMAVG');

      const avgGetGD = localStorage.getItem('avgGraphDate');
      const avgGetGW = localStorage.getItem('avgGraphWPM');

      const avgDData = JSON.parse(avgGetGD);
      const avgWData = JSON.parse(avgGetGW);

      let parsedCounterFromLocal = JSON.parse(getCounterFromLocal);
      let dailyWPM = JSON.parse(getDailyWPM);

      parsedCounterFromLocal++;
      localStorage.setItem('count', JSON.stringify(parsedCounterFromLocal));

      const streak = 0; //Set the daily streak to 0 if a day has been missed
      storeData(avgData, dateD); //Call the StoreData method to add StoreData value to graph
      localStorage.setItem('streak', JSON.stringify(streak));

      dailyWPM = +avgData;
      avgWData.push(avgData);
      avgDData.push(dateD);
      localStorage.setItem('theDate', JSON.stringify(date));
      localStorage.setItem('avgGraphWPM', JSON.stringify(avgWData));
      localStorage.setItem('avgGraphDate', JSON.stringify(avgDData));
      localStorage.setItem('dailyWPMAVG', JSON.stringify(dailyWPM));
    } else if (date - parseInt(localStorage.getItem('theDate')) == 1) {
      //Checks if the wpm is over 100, if the current value is not equal to the previous to prevent double counting and ensures this wasn't completed in 1 decisecond
      if (inAvgChordCount != localStorage.getItem('prevAverageChordCounter')) {
        let avgCount = JSON.parse(localStorage.getItem('averageChordCounter'));
        let prevAvgCount = JSON.parse(
          localStorage.getItem('prevAverageChordCounter'),
        );

        const inValtoAdd = inAvgChordCount == 6 ? 6 : 1; //This is to offset the calibrating number
        avgCount = avgCount + inValtoAdd;
        prevAvgCount = inAvgChordCount;

        localStorage.setItem('averageChordCounter', JSON.stringify(avgCount));
        localStorage.setItem(
          'prevAverageChordCounter',
          JSON.stringify(prevAvgCount),
        );
      }

      localStorage.setItem('averageChordCounter', JSON.stringify(0));
      localStorage.setItem('prevAverageChordCounter', JSON.stringify(6));

      localStorage.setItem('count', JSON.stringify(0)); //Set AVG counter to 0
      localStorage.setItem('dailyWPMAVG', JSON.stringify(0));

      const getCounterFromLocal = localStorage.getItem('count');
      const getDailyWPM = localStorage.getItem('dailyWPMAVG');

      let parsedCounterFromLocal = JSON.parse(getCounterFromLocal);

      parsedCounterFromLocal++;
      localStorage.setItem('count', JSON.stringify(parsedCounterFromLocal));

      storeData(avgData, dateD); //Call the StoreData method to add StoreData value to graph if it is a different day

      const avgGetGD = localStorage.getItem('avgGraphDate');
      const avgGetGW = localStorage.getItem('avgGraphWPM');

      const avgDData = JSON.parse(avgGetGD);
      const avgWData = JSON.parse(avgGetGW);

      localStorage.setItem('theDate', JSON.stringify(date));
      const val = (avgData + parseInt(avgWData[avgWData.length - 1])) / 2;

      avgWData.push(Math.round(val));
      avgDData.push(dateD);

      localStorage.setItem('avgGraphWPM', JSON.stringify(avgWData));
      localStorage.setItem('avgGraphDate', JSON.stringify(avgDData));

      const streak = localStorage.getItem('streak');
      const streakVal = JSON.parse(streak);

      localStorage.setItem('streak', JSON.stringify(parseInt(streakVal) + 1));
    } else if (parseInt(localStorage.getItem('theDate')) - date == 0) {
      //If it is the same day
      //storeData(avgData, dateD);

      //These two if statements work on the avg counter
      if (localStorage.getItem('averageChordCounter') == null) {
        localStorage.setItem('averageChordCounter', JSON.stringify(0));
        localStorage.setItem('prevAverageChordCounter', JSON.stringify(0));
      }
      if (inAvgChordCount != localStorage.getItem('prevAverageChordCounter')) {
        let avgCount = JSON.parse(localStorage.getItem('averageChordCounter'));
        let prevAvgCount = JSON.parse(
          localStorage.getItem('prevAverageChordCounter'),
        );

        const inValtoAdd = inAvgChordCount == 6 ? 6 : 1; //This is to offset the calibrating number
        avgCount = avgCount + inValtoAdd;
        prevAvgCount = inAvgChordCount;

        localStorage.setItem('averageChordCounter', JSON.stringify(avgCount));
        localStorage.setItem(
          'prevAverageChordCounter',
          JSON.stringify(prevAvgCount),
        );
      }
      const avgCount = JSON.parse(localStorage.getItem('averageChordCounter'));

      const avgGetGD = localStorage.getItem('avgGraphDate');
      const avgGetGW = localStorage.getItem('avgGraphWPM');

      const avgWData = JSON.parse(avgGetGW);
      const avgDData = JSON.parse(avgGetGD);
      let countCalc = 0;
      Number(parseInt(avgWData[avgWData.length - 1])) >= 1
        ? (countCalc = 1)
        : '';
      const val =
        (Number(avgData) + Number(avgWData[avgWData.length - 1])) /
        (1 + countCalc);

      console.log(
        'THis is the stats ' +
          avgCount +
          ' ' +
          avgWData[avgWData.length - 1] +
          ' ' +
          avgData +
          ' ' +
          val,
      );

      avgWData.pop();
      avgWData.push(val.toFixed(0));
      //avgWData.splice((avgWData.length-1),1,val);
      avgDData.splice(avgDData.length - 1, 1, dateD);

      localStorage.setItem('avgGraphWPM', JSON.stringify(avgWData));
      localStorage.setItem('avgGraphDate', JSON.stringify(avgDData));
    } else {
      //Nothing
    }
  }
}

export function storeMasteredData(dateD: Date, inChordMasteredValue: number) {
  const storeMasteredData = [];
  const storeMasteredDate = [];
  const masteredCounterArray: any = [];
  // console.log(inChordMasteredValue)

  const currentDate = new Date();
  const date = currentDate.getDate();

  const checkInDate = localStorage.getItem('MasteredTheDate');
  const ifCheckInDate = JSON.parse(checkInDate);

  const storedMasterData = JSON.parse(localStorage.getItem('storedMasterData'));
  const storedMasterDate = JSON.parse(localStorage.getItem('storedMasterDate'));
  //We get this information to check if users already have this data to make the graph flush, This is only necessary because we introduced this later
  const prevStoredAVGWPM = JSON.parse(localStorage.getItem('avgGraphWPM'));
  const prevStoredAVGDate = JSON.parse(localStorage.getItem('avgGraphDate'));
  const prevStoredWPMWPM = JSON.parse(localStorage.getItem('wpmGraphWPM'));
  if (
    inChordMasteredValue >= 100 &&
    inChordMasteredValue !=
      JSON.parse(localStorage.getItem('prevMasteredChordVal')) &&
    inChordMasteredValue != 6276
  ) {
    if (
      (prevStoredWPMWPM != null || prevStoredAVGWPM != null) &&
      storedMasterData == null
    ) {
      storeMasteredData.push(0);
      //console.log('here');
      //console.log(inChordMasteredValue);
      storeMasteredDate.push(prevStoredAVGDate[0]);

      localStorage.setItem(
        'storedMasterData',
        JSON.stringify(storeMasteredData),
      ); //Stringify and store DataArray in localStorage
      localStorage.setItem(
        'storedMasterDate',
        JSON.stringify(storeMasteredDate),
      ); //Stringify and store dateArray in localStorage
      localStorage.setItem('prevMasteredChordVal', JSON.stringify(0)); //Set previously mastered chord to 0 since we have not mastered any Chords yet
      localStorage.setItem('masteredCount', JSON.stringify(0)); //This sets the chords mastered count to 0
      localStorage.setItem('MasteredTheDate', JSON.stringify(date)); //This sets the chords mastered count to 0
    } else if (storedMasterData == null) {
      //console.log('herherereree');
      storeMasteredData.push(0); //Since this is the first time this is happening push 0 onto the array
      storeMasteredDate.push(dateD); //Since this is the first time this is happening push the current date as the first date
      localStorage.setItem(
        'storedMasterData',
        JSON.stringify(storeMasteredData),
      ); //Stringify and store DataArray in localStorage
      localStorage.setItem(
        'storedMasterDate',
        JSON.stringify(storeMasteredDate),
      ); //Stringify and store dateArray in localStorage
      localStorage.setItem('prevMasteredChordVal', JSON.stringify(0)); //Set previously mastered chord to 0 since we have not mastered any Chords yet
      localStorage.setItem('masteredCount', JSON.stringify(0)); //This sets the chords mastered count to 0
      localStorage.setItem('MasteredTheDate', JSON.stringify(date)); //This sets the chords mastered count to 0
    }
    //console.log((JSON.parse(localStorage.getItem("storedMasterData"))));
    //console.log((JSON.parse(localStorage.getItem("storedMasterDate"))));
    if (parseInt(localStorage.getItem('MasteredTheDate')) - date == 0) {
      //console.log('I am in the nested if statement ');
      const storedMD = localStorage.getItem('storedMasterData');
      const storedMDa = localStorage.getItem('storedMasterDate');
      const storedPVal = localStorage.getItem('prevMasteredChordVal');
      const storedMC = localStorage.getItem('masteredCount');

      const storedMData = JSON.parse(storedMD);
      const storedMDate = JSON.parse(storedMDa);
      let storedPValue = JSON.parse(storedPVal);
      let storedMCount = JSON.parse(storedMC);

      //console.log(storedMData);
      //console.log(storedMDate);
      storedPValue = inChordMasteredValue;
      storedMCount = storedMCount + 1;

      storedMData.splice(storedMData.length - 1, 1, storedMCount);
      storedMDate.splice(storedMDate.length - 1, 1, dateD);

      //console.log("after " +  storedMData);
      //console.log("after " + storedMDate);

      localStorage.setItem('storedMasterData', JSON.stringify(storedMData));
      localStorage.setItem('storedMasterDate', JSON.stringify(storedMDate));
      localStorage.setItem(
        'prevMasteredChordVal',
        JSON.stringify(storedPValue),
      );
      localStorage.setItem('masteredCount', JSON.stringify(storedMCount));
      localStorage.setItem('MasteredTheDate', JSON.stringify(date)); //This sets the chords mastered count to 0
    } else {
      //console.log('I am in the else statement ');

      const storedMD = localStorage.getItem('storedMasterData');
      const storedMDa = localStorage.getItem('storedMasterDate');
      const storedPVal = localStorage.getItem('prevMasteredChordVal');
      const storedMC = localStorage.getItem('masteredCount');

      const storedMData = JSON.parse(storedMD);
      const storedMDate = JSON.parse(storedMDa);
      let storedPValue = JSON.parse(storedPVal);
      let storedMCount = JSON.parse(storedMC);

      storedMCount = storedMCount + 1;
      storedMData.push(storedMCount);
      storedMDate.push(dateD);
      storedPValue = inChordMasteredValue;
      storedMCount = storedMCount + 1;

      localStorage.setItem('storedMasterData', JSON.stringify(storedMData));
      localStorage.setItem('storedMasterDate', JSON.stringify(storedMDate));
      localStorage.setItem(
        'prevMasteredChordVal',
        JSON.stringify(storedPValue),
      );
      localStorage.setItem('masteredCount', JSON.stringify(storedMCount));
      localStorage.setItem('MasteredTheDate', JSON.stringify(date)); //This sets the most recent Date count to 0
    }
  }
}

export function storeCharactersPerMinute(
  dateD: Date,
  inCharPerMinute: number,
  inAvgChordCount: string | number | null | undefined,
) {
  const storeCharactersPerMinuteData = [];
  const storeCharactersPerMinuteDate = [];
  const cpmCounterArray: any = [];
  console.log('In value for CharPerMin ' + inCharPerMinute);
  const currentDate = new Date();
  const date = currentDate.getDate();

  const checkInDate = localStorage.getItem('CPMTheDate');
  const ifCheckInDate = JSON.parse(checkInDate);

  const storedCharactersPerMinuteData = JSON.parse(
    localStorage.getItem('storedCharactersPerMinuteData'),
  );
  const storedCharactersPerMinuteDate = JSON.parse(
    localStorage.getItem('storedCharactersPerMinuteDate'),
  );
  //console.log(storedCharactersPerMinuteData);
  //console.log(storedCharactersPerMinuteDate);

  //We get this information to check if users already have this data to make the graph flush, This is only necessary because we introduced this later
  const prevStoredW = JSON.parse(localStorage.getItem('wpmGraphDate'));
  const prevStoredAVGDate = JSON.parse(localStorage.getItem('avgGraphDate'));
  const prevStoredWPMWPM = JSON.parse(localStorage.getItem('wpmGraphWPM'));
  if (
    (prevStoredWPMWPM != null || prevStoredAVGWPM != null) &&
    storedCharactersPerMinuteData == null
  ) {
    storeCharactersPerMinuteData.push(0);

    storeCharactersPerMinuteDate.push(prevStoredW[0]);
    //console.log(storeCharactersPerMinuteDate)

    localStorage.setItem(
      'storedCharactersPerMinuteData',
      JSON.stringify(storeCharactersPerMinuteData),
    ); //Stringify and store DataArray in localStorage
    localStorage.setItem(
      'storedCharactersPerMinuteDate',
      JSON.stringify(storeCharactersPerMinuteDate),
    ); //Stringify and store dateArray in localStorage
    localStorage.setItem('prevCPMVal', JSON.stringify(0)); //Set previously mastered chord to 0 since we have not mastered any Chords yet
    localStorage.setItem('CPMCount', JSON.stringify(0)); //This sets the chords mastered count to 0
    localStorage.setItem('CPMTheDate', JSON.stringify(date)); //This sets the chords mastered count to 0
    //console.log(storeCharactersPerMinuteDate)
  }
  if (storedCharactersPerMinuteData == null) {
    storeCharactersPerMinuteData.push(0); //Since this is the first time this is happening push 0 onto the array
    storeCharactersPerMinuteDate.push(dateD); //Since this is the first time this is happening push the current date as the first date
    localStorage.setItem(
      'storedCharactersPerMinuteData',
      JSON.stringify(storeCharactersPerMinuteData),
    ); //Stringify and store DataArray in localStorage
    localStorage.setItem(
      'storedCharactersPerMinuteDate',
      JSON.stringify(storeCharactersPerMinuteDate),
    ); //Stringify and store dateArray in localStorage
    localStorage.setItem('prevCPMVal', JSON.stringify(0)); //Set previously mastered chord to 0 since we have not mastered any Chords yet
    localStorage.setItem('CPMCount', JSON.stringify(0)); //This sets the chords mastered count to 0
    localStorage.setItem('CPMTheDate', JSON.stringify(date)); //This sets the chords mastered count to 0
    //console.log(storeCharactersPerMinuteDate)
  }

  if (parseInt(localStorage.getItem('CPMTheDate')) - date == 0) {
    const storedMD = localStorage.getItem('storedCharactersPerMinuteData');
    const storedMDa = localStorage.getItem('storedCharactersPerMinuteDate');
    const storedPVal = localStorage.getItem('prevCPMVal');
    const storedMC = localStorage.getItem('CPMCount');
    //console.log('sae dadsadyasdashdanskdnakjsdansjkdnasdasjndasjnjknjk')

    const storedCData = JSON.parse(storedMD);
    const storedCDate = JSON.parse(storedMDa);
    let storedPCValue = JSON.parse(storedPVal);
    const storedCCount = JSON.parse(storedMC);

    if (inAvgChordCount != localStorage.getItem('prevCPMVal')) {
      let avgCount = JSON.parse(localStorage.getItem('CPMCount'));
      let prevCPerMinCount = JSON.parse(localStorage.getItem('prevCPMVal'));

      const inValtoAdd = inAvgChordCount == 6 ? 6 : 1; //This is to offset the calibrating number
      avgCount = avgCount + inValtoAdd;
      prevCPerMinCount = inAvgChordCount;

      localStorage.setItem('CPMCount', JSON.stringify(avgCount));
      localStorage.setItem('prevCPMVal', JSON.stringify(prevCPerMinCount));
    }
    const avgCount = JSON.parse(localStorage.getItem('CPMCount'));

    storedPCValue = inCharPerMinute;

    //console.log(storedPCValue);
    //console.log(storedCCount);
    //console.log('Chords per min' + storedCData )
    //console.log('Chords per min' + storedCDate )
    const val =
      (inCharPerMinute +
        parseInt(storedCData[storedCData.length - 1]) * (avgCount - 1)) /
      avgCount;

    storedCData.splice(storedCData.length - 1, 1, val);
    storedCDate.splice(storedCDate.length - 1, 1, dateD);
    localStorage.setItem(
      'storedCharactersPerMinuteData',
      JSON.stringify(storedCData),
    ); //Stringify and store DataArray in localStorage
    localStorage.setItem(
      'storedCharactersPerMinuteDate',
      JSON.stringify(storedCDate),
    ); //Stringify and store dateArray in localStorage
    //localStorage.setItem("prevCPMVal", JSON.stringify(0));//Set previously mastered chord to 0 since we have not mastered any Chords yet
    //localStorage.setItem("CPMCount", JSON.stringify(storedCCount));//This sets the chords mastered count to 0
    localStorage.setItem('CPMTheDate', JSON.stringify(date)); //This sets the chords mastered count to 0
    localStorage.setItem('CPMCount', JSON.stringify(avgCount));

    console.log(storedCData);
    console.log(storedCDate);
    console.log(date);
    console.log(avgCount);
  } else {
    const storedMD = localStorage.getItem('storedCharactersPerMinuteData');
    const storedMDa = localStorage.getItem('storedCharactersPerMinuteDate');
    const storedPVal = localStorage.getItem('prevCPMVal');
    const storedMC = localStorage.getItem('CPMCount');

    const storedCData = JSON.parse(storedMD);
    const storedCDate = JSON.parse(storedMDa);
    let storedPValue = JSON.parse(storedPVal);
    let storedMCount = JSON.parse(storedMC);

    storedMCount = 1;
    storedCData.push(storedMCount);
    storedCDate.push(dateD);
    storedPValue = inCharPerMinute;
    storedMCount = storedMCount + 1;
    const avgCount = JSON.parse(localStorage.getItem('CPMCount'));

    const val =
      (inCharPerMinute +
        parseInt(storedCData[storedCData.length - 1]) * (avgCount - 1)) /
      avgCount;

    storedCData.splice(storedCData.length - 1, 1, val);
    storedCDate.splice(storedCDate.length - 1, 1, dateD);

    localStorage.setItem(
      'storedCharactersPerMinuteData',
      JSON.stringify(storedMData),
    );
    localStorage.setItem(
      'storedCharactersPerMinuteDate',
      JSON.stringify(storedMDate),
    );
    localStorage.setItem('prevCPMVal', JSON.stringify(storedPValue));
    localStorage.setItem('CPMCount', JSON.stringify(storedMCount));
    localStorage.setItem('CPMTheDate', JSON.stringify(date)); //This sets the most recent Date count to 0
  }
}

export function getHighestWPM() {
  const checkWPMArray = localStorage.getItem('wpmGraphWPM');
  const checkIt = JSON.parse(checkWPMArray);

  if (checkIt == null) {
    return 0;
  } else {
    return parseInt(
      JSON.parse(localStorage.getItem('wpmGraphWPM'))[
        JSON.parse(localStorage.getItem('wpmGraphWPM')).length - 1
      ],
    );
  }
}

export function getAverageWPM() {
  const checkWPMArray = localStorage.getItem('avgGraphWPM');
  const checkIt = JSON.parse(checkWPMArray);

  if (checkIt == null) {
    return 0;
  } else {
    return parseInt(
      JSON.parse(localStorage.getItem('avgGraphWPM'))[
        JSON.parse(localStorage.getItem('avgGraphWPM')).length - 1
      ],
    );
  }
}

export function getChordsMastered() {
  const masteredArray = localStorage.getItem('storedMasterData');

  const checkIt = JSON.parse(masteredArray);

  if (checkIt == null) {
    return 0;
  } else {
    return parseInt(
      JSON.parse(localStorage.getItem('storedMasterData'))[
        JSON.parse(localStorage.getItem('storedMasterData')).length - 1
      ],
    );
  }
}

export function getChordsPerMinute() {
  const chordsPerMinArray = localStorage.getItem(
    'storedCharactersPerMinuteData',
  );

  const checkIt = JSON.parse(chordsPerMinArray);

  if (checkIt == null) {
    return 0;
  } else {
    //console.log(chordsPerMinArray);
    return parseInt(
      JSON.parse(localStorage.getItem('storedCharactersPerMinuteData'))[
        JSON.parse(localStorage.getItem('storedCharactersPerMinuteData'))
          .length - 1
      ],
    );
  }
}

export function myGraph() {
  const optionsEmpty = {
    chart: {
      type: 'area',
      height: 350,
      foreColor: '#FFFFFF',
      stacked: false,
      dropShadow: {
        enabled: false,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 1,
      },
    },
    colors: ['#22C55E', '#0090FF', 'pink', 'yellow'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45,
      },
    },
    series: [
      {
        name: '',
        data: '',
      },
      {
        name: '',
        data: '',
      },
    ],
    markers: {
      size: 0,
      colors: ['#000524'],
      strokeColor: '#00BAEC',
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      onClick: undefined,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: 0,
        offsetY: -5,
      },
      tooltip: {
        theme: 'dark',
      },
    },
    grid: {
      padding: {
        left: -5,
        right: 5,
      },
    },
    tooltip: {
      x: {
        format: 'dd MM yyyy',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    fill: {
      type: 'solid',
      fillOpacity: 0.7,
    },
  };

  const options = {
    chart: {
      type: 'area',
      height: 350,
      foreColor: '#FFFFFF',
      stacked: false,
      dropShadow: {
        enabled: false,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 1,
      },
    },
    colors: ['#22C55E', '#0090FF', 'pink', 'yellow'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45,
      },
    },
    series: [
      {
        name: 'Best WPM',
        data: generateDayWiseTimeSeries1(),
      },
      {
        name: 'Average Speed',
        data: generateDayWiseTimeSeries2(),
      },
      //{
      //name: 'Chords Mastered',
      //data: generateDayWiseTimeSeries3()
      //},
      //{
      //  name: 'Average Characters Per Minute',
      //  data: generateDayWiseTimeSeries4()
      // }
    ],
    markers: {
      size: 0,
      colors: ['#000524'],
      strokeColor: '#00BAEC',
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      onClick: undefined,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: 0,
        offsetY: -5,
      },
      tooltip: {
        theme: 'dark',
      },
    },
    grid: {
      padding: {
        left: -5,
        right: 5,
      },
    },
    tooltip: {
      x: {
        format: 'dd MM yyyy',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    fill: {
      type: 'solid',
      fillOpacity: 0.7,
    },
  };

  const chart = new ApexCharts(
    document.getElementById('timeline-chart'),
    options,
  );
  const chart2 = new ApexCharts(
    document.getElementById('timeline-chart2'),
    optionsEmpty,
  );
  const chart3 = new ApexCharts(
    document.getElementById('timeline-chart3'),
    optionsEmpty,
  );
  const chart4 = new ApexCharts(
    document.getElementById('timeline-chart4'),
    optionsEmpty,
  );
  const chart5 = new ApexCharts(
    document.getElementById('timeline-chart5'),
    optionsEmpty,
  );
  const chart6 = new ApexCharts(
    document.getElementById('timeline-chart6'),
    optionsEmpty,
  );

  chart.render();
  chart2.render();
  chart3.render();
  chart4.render();
  chart5.render();
  chart6.render();
}

function generateDayWiseTimeSeries1() {
  const ge2 = localStorage.getItem('wpmGraphDate');
  const ge = localStorage.getItem('wpmGraphWPM');

  const wpmData = JSON.parse(ge);
  const dateD = JSON.parse(ge2);

  //console.log(ge);
  //console.log(ge2);

  const currentDate = new Date();

  if (parseInt(localStorage.getItem('theDate')) == null) {
    //If a date doesn't exist
    storeData(0, currentDate);
  }

  let i = 0;
  const series = [];
  if (wpmData != null) {
    while (i < wpmData.length) {
      series.push([dateD[i], wpmData[i]]);

      i++;
    }
  } else {
    const todaysDate = new Date();
    series.push([todaysDate, 0]);
  }
  //console.log(series);

  return series;
}

function generateDayWiseTimeSeries2() {
  const ge3 = localStorage.getItem('avgGraphWPM');
  const ge4 = localStorage.getItem('avgGraphDate');

  const avgWpmData = JSON.parse(ge3);
  const avgDateD = JSON.parse(ge4);
  //console.log(avgWpmData);
  //console.log(avgDateD);

  let i = 0;
  const series = [];

  const currentDate = new Date();
  //If this is called and the expression is true this means the user has not attempted a training session. So we add the previously stored data to make the graph flush
  if (parseInt(localStorage.getItem('theDate')) == null) {
    storeAverageData(0, currentDate, 0, 0);
  }

  if (avgWpmData != null) {
    while (i < avgWpmData.length) {
      series.push([avgDateD[i], avgWpmData[i]]);

      i++;
    }
  } else {
    const todaysDate = new Date();
    series.push([todaysDate, 0]);
  }
  //console.log(series);

  return series;
}

function generateDayWiseTimeSeries3() {
  const ge2 = localStorage.getItem('storedMasterDate');
  const ge = localStorage.getItem('storedMasterData');

  const wpmData = JSON.parse(ge);
  const dateD = JSON.parse(ge2);

  //console.log(ge);
  //console.log(ge2);

  const currentDate = new Date();

  if (parseInt(localStorage.getItem('theDate')) == null) {
    //If a date doesn't exist
    storeMasteredData(currentDate, 0);
  }

  let i = 0;
  const series = [];
  if (wpmData != null) {
    while (i < wpmData.length) {
      series.push([dateD[i], wpmData[i]]);
      //console.log("first Loop")
      i++;
    }
  } else {
    //console.log("second Loop")

    const todaysDate = new Date();
    series.push([todaysDate, 0]);
  }
  //console.log(series);

  return series;
}

function generateDayWiseTimeSeries4() {
  const ge2 = localStorage.getItem('storedCharactersPerMinuteDate');
  const ge = localStorage.getItem('storedCharactersPerMinuteData');

  const wpmData = JSON.parse(ge);
  const dateD = JSON.parse(ge2);

  //.log(ge);
  // console.log(ge2);

  const currentDate = new Date();

  if (parseInt(localStorage.getItem('theDate')) == null) {
    //If a date doesn't exist
    storeMasteredData(currentDate, 0);
  }

  let i = 0;
  const series = [];
  if (wpmData != null) {
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
    myGraph();
  }, []);

  return (
    <React.Fragment>
      {practicePopper}
      {chordsPopper}
      {avgPopper}
      {SpeedPopper}

      <div className="text-2xl font-bold text-white text-center">
        Your Progress
      </div>
      <HorizontalRule />
      <div className="flow-root ml-2">
        <div className="float-left w-5/12">
          <div className="text-center text-white font-mono">CPM</div>
          <div
            style={{
              backgroundColor: '#333',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            id="timeline-chart"
          />
        </div>
        <div className="float-right w-5/12">
          <p className="text-center text-white font-mono">ChM</p>
          <div
            style={{
              backgroundColor: '#333',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            id="timeline-chart2"
          />
        </div>
        <div className="float-left w-5/12">
          <p className="text-center text-white font-mono">CM</p>
          <div
            style={{
              backgroundColor: '#333',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            id="timeline-chart3"
          />
        </div>
        <div className="float-right w-5/12">
          <p className="text-center text-white font-mono">StM</p>
          <div
            style={{
              backgroundColor: '#333',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            id="timeline-chart4"
          />
        </div>
        <div className="float-left w-5/12">
          <p className="text-center text-white font-mono">aWPM</p>
          <div
            style={{
              backgroundColor: '#333',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            id="timeline-chart5"
          />
        </div>
        <div className="float-right w-5/12">
          <p className="text-center text-white font-mono">tWPM</p>
          <div
            style={{
              backgroundColor: '#333',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            id="timeline-chart6"
          />
        </div>
        <div className="float-left w-5/12">
          <div
            style={{
              backgroundColor: '#333',
              border: '1px solid #000',
              borderRadius: '5px',
            }}
            id="timeline-chart"
          />
        </div>
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

const gridContainer = {
  display: 'flex',
  padding: '9.6px',
  marginTop: '20px',
  textAlign: 'center',
};
const gridItem = {
  flexGrow: '0',
  color: 'white',
};

const tableText = {
  textAlign: 'center',
};
