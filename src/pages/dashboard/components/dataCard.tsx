import React, { Component } from 'react';
import {
  getAverageWPM,
  getHighestWPM,
  getChordsMastered,
  getChordsPerMinute,
} from '../../manager/components/chordGraphs';
import styled from 'styled-components';

const triggerResize = () => {
  // This is done to make sure that the popover elements are in the correct position
  // The only time their position is recalculated is on scroll or resize
  // So this needs to be triggered manually
  window.dispatchEvent(new Event('resize'));
};

function getCurrentDate() {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const newdate = month + '/' + day + '/' + year;
  return newdate;
}

function convertDate(date: Date) {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const newdate = month + '/' + day + '/' + year;
  return newdate;
}

function convertDateForMonth(date: Date) {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1; //months from 1-12

  return month;
}

function convertDateForDay(date: Date) {
  const dateObj = new Date(date);
  const day = dateObj.getUTCDate();

  return day;
}

function dateRangeCheck(from: string, to: string, check: string) {
  const fDate = Date.parse(from);
  const lDate = Date.parse(to);
  const cDate = Date.parse(check);

  if (cDate <= lDate && cDate >= fDate) {
    return true;
  }
  return false;
}

export default class CardData extends React.Component {
  state = {
    seenGoalTable: false,
  };

  togglePop = () => {
    this.setState({
      seenGoalTable: !this.state.seenGoalTable,
    });
  };
  render() {
    return (
      <React.Fragment>
        <table
          style={{
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            backgroundColor: '#333',
            color: 'white',
            height: '60px',
          }}
        >
          <colgroup span={2} />
          <colgroup span={2} />
          <tr style={sd}>
            <td rowSpan={2} />
            <th colSpan={2} scope="colgroup">
              tWPM<div>{getHighestWPM()}</div>
            </th>
            <th colSpan={2} scope="colgroup">
              aWPM<div>{getAverageWPM()}</div>
            </th>
            <th colSpan={2} scope="colgroup">
              ChM<div>{getChordsMastered()}</div>
            </th>
            <th colSpan={2} scope="colgroup">
              aCPM<div>{getChordsPerMinute()}</div>
            </th>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="col">Goal</th>
            <th scope="col">Actual</th>
            <th scope="col">Goal</th>
            <th scope="col">Actual</th>
            <th scope="col">Goal</th>
            <th scope="col">Actual</th>
            <th scope="col">Goal</th>
            <th scope="col">Actual</th>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[11]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[11]}
            </td>
            <td style={tableText}>{calculateActualValue(83, 11, 12)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[11]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(83, 11, 12)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[11]}
            </td>
            <td style={tableText}>{calculateActualValueChM(83, 11, 12)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[11]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(83, 11, 12)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[10]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[10]}
            </td>
            <td style={tableText}>{calculateActualValue(76, 10, 11)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[10]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(76, 10, 11)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[10]}
            </td>
            <td style={tableText}>{calculateActualValueChM(76, 10, 11)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[10]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(76, 10, 11)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[9]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[9]}
            </td>
            <td style={tableText}>{calculateActualValue(69, 9, 10)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[9]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(69, 9, 10)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[9]}
            </td>
            <td style={tableText}>{calculateActualValueChM(69, 9, 10)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[9]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(69, 9, 10)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[8]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[8]}
            </td>
            <td style={tableText}>{calculateActualValue(62, 8, 9)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[8]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(62, 8, 9)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[8]}
            </td>
            <td style={tableText}>{calculateActualValueChM(62, 8, 9)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[8]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(62, 8, 9)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[7]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[7]}
            </td>
            <td style={tableText}>{calculateActualValue(55, 7, 8)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[7]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(55, 7, 8)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[7]}
            </td>
            <td style={tableText}>{calculateActualValueChM(55, 7, 8)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[7]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(55, 7, 8)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[6]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[6]}
            </td>
            <td style={tableText}>{calculateActualValue(48, 6, 7)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[6]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(48, 6, 7)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[6]}
            </td>
            <td style={tableText}>{calculateActualValueChM(48, 6, 7)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[6]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(48, 6, 7)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[5]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[5]}
            </td>
            <td style={tableText}>{calculateActualValue(41, 5, 6)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[5]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(41, 5, 6)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[5]}
            </td>
            <td style={tableText}>{calculateActualValueChM(41, 5, 6)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[5]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(41, 5, 6)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[4]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[4]}
            </td>
            <td style={tableText}>{calculateActualValue(34, 4, 5)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[4]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(34, 4, 5)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[4]}
            </td>
            <td style={tableText}>{calculateActualValueChM(34, 4, 5)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[4]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(34, 4, 5)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[3]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[3]}
            </td>
            <td style={tableText}>{calculateActualValue(27, 3, 4)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[3]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(27, 3, 4)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[3]}
            </td>
            <td style={tableText}>{calculateActualValueChM(27, 3, 4)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[3]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(27, 3, 4)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[2]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[2]}
            </td>
            <td style={tableText}>{calculateActualValue(20, 2, 3)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[2]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(20, 2, 3)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[2]}
            </td>
            <td style={tableText}>{calculateActualValueChM(20, 2, 3)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[2]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(20, 2, 3)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? 'TBD'
                : JSON.parse(localStorage.getItem('storedGoalDate'))[1]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[1]}
            </td>
            <td style={tableText}>{calculateActualValue(13, 1, 2)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[1]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(13, 1, 2)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[1]}
            </td>
            <td style={tableText}>{calculateActualValueChM(13, 1, 2)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[1]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(13, 1, 2)}</td>
          </tr>
          <tr
            style={
              this.state.seenGoalTable ? { display: '' } : { display: 'none' }
            }
          >
            <th scope="row">
              {localStorage.getItem('storedGoalDate') == null
                ? getCurrentDate()
                : JSON.parse(localStorage.getItem('storedGoalDate'))[0]}
            </th>
            <td style={tableText}>
              {localStorage.getItem('storedGoalWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalWPM'))[0]}
            </td>
            <td style={tableText}>{calculateActualValue(6, 0, 1)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalAWPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalAWPM'))[0]}
            </td>
            <td style={tableText}>{calculateActualValueAWPM(6, 0, 1)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalChM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalChM'))[0]}
            </td>
            <td style={tableText}>{calculateActualValueChM(6, 0, 1)}</td>
            <td style={tableText}>
              {localStorage.getItem('storedGoalCPM') == null
                ? '-'
                : JSON.parse(localStorage.getItem('storedGoalCPM'))[0]}
            </td>
            <td style={tableText}>{calculateActualValueCPM(6, 0, 1)}</td>
          </tr>
        </table>

        <button
          onClick={this.togglePop}
          className="text-white inline-block bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
          style={{
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            marginBottom: '15px',
          }}
        >
          View your goals
        </button>
      </React.Fragment>
    );
  }
}
function calculateActualValue(
  inDaysNumber: number,
  firstArrayNum: number,
  secondArrayNum: number,
) {
  let firstVal = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (firstVal != null) {
    firstVal = firstVal[0];
  }
  let firstNum = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (firstNum != null) {
    firstNum = firstNum[firstArrayNum];
  }
  let secondNum = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (secondNum != null) {
    secondNum = secondNum[secondArrayNum];
  }
  let ifStatementGoalValue = JSON.parse(localStorage.getItem('storedGoalWPM'));
  if (ifStatementGoalValue != null) {
    ifStatementGoalValue = ifStatementGoalValue[11];
  }
  let ifStatementSecondGoalValue = JSON.parse(
    localStorage.getItem('storedGoalWPM'),
  );
  if (ifStatementSecondGoalValue != null) {
    ifStatementSecondGoalValue = ifStatementSecondGoalValue[firstArrayNum];
  }

  //console.log(firstVal);
  //console.log(secondNum);
  const currentDate = new Date();
  const date1 = new Date(firstVal);
  const date2 = new Date(currentDate);
  let tempHighestReturnVal = 0;

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  const Difference_In_Days = Math.round(
    Difference_In_Time / (1000 * 3600 * 24),
  );
  //console.log(Difference_In_Days)

  if (Difference_In_Days >= inDaysNumber) {
    //console.log("DId I enter the first one")
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[secondArrayNum]);
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[firstArrayNum]);
    // console.log(getHighestWPM());
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[secondArrayNum])
    if (ifStatementGoalValue >= ifStatementSecondGoalValue) {
      // console.log("DId I enter the second one")
      // console.log(parseInt(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1))
      //console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1);
      const inV = parseInt(
        JSON.parse(localStorage.getItem('wpmGraphDate'))?.length - 1,
      );
      for (let i = 0; i < inV; i++) {
        //console.log(i);
        // console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1);
        // console.log("DId I enter the third one")
        const tempConvertedDate = convertDate(
          JSON.parse(localStorage.getItem('wpmGraphDate'))[i],
        );
        //console.log(tempConvertedDate)
        //console.log('temp'+tempConvertedDate)
        //console.log(secondNum);
        //console.log(dateRangeCheck(firstNum, secondNum, tempConvertedDate));
        if (dateRangeCheck(firstNum, secondNum, tempConvertedDate)) {
          //console.log('I made it to the if');
          //  console.log(JSON.parse(localStorage.getItem("wpmGraphWPM"))[i]);
          //  console.log('I returned this value' + JSON.parse(localStorage.getItem("wpmGraphWPM"))[i+1]);
          // console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteData"))[i])
          const tempInHighestVal = JSON.parse(
            localStorage.getItem('wpmGraphWPM'),
          )[i];
          //console.log('In if '+ tempInHighestVal);
          tempHighestReturnVal =
            tempHighestReturnVal == null ||
            tempInHighestVal > tempHighestReturnVal
              ? tempInHighestVal
              : tempHighestReturnVal;
          //return tempHighestReturnVal;
          //console.log(tempHighestReturnVal);
          //console.log('Idk if i made it here or not isl')
        }

        // return tempHighestReturnVal;
      }
      //console.log((tempHighestReturnVal == 'undefined') ? tempHighestReturnVal:'-' );
      //console.log('I think I made it to the return');
      //console.log(tempHighestReturnVal);
      return tempHighestReturnVal == 'undefined' ? '-' : tempHighestReturnVal;
    } else if (
      getHighestWPM() <
      JSON.parse(localStorage.getItem('storedGoalWPM'))[secondArrayNum]
    ) {
      for (
        let i = 0;
        i <
        parseInt(
          JSON.parse(localStorage.getItem('wpmGraphDate'))[
            JSON.parse(localStorage.getItem('wpmGraphDate')).length - 1
          ],
        );
        i++
      ) {
        //console.log("DId I enter the third one")
        //  console.log(JSON.parse(localStorage.getItem("wpmGraphDate"))[i]);
        const tempConvertedDate = convertDate(
          JSON.parse(localStorage.getItem('wpmGraphDate'))[i],
        );
        if (tempConvertedDate == secondNum) {
          // console.log(JSON.parse(localStorage.getItem("wpmGraphWPM"))[i]);
          return JSON.parse(localStorage.getItem('wpmGraphWPM'))[i];
        }
      }
    }
  } else {
    //console.log('-')
    //  console.log('left out with0');

    return '-';
  }
}

function calculateActualValueChM(
  inDaysNumber: number,
  firstArrayNum: number,
  secondArrayNum: number,
) {
  let firstVal = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (firstVal != null) {
    firstVal = firstVal[0];
  }
  let firstNum = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (firstNum != null) {
    firstNum = firstNum[firstArrayNum];
  }
  let secondNum = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (secondNum != null) {
    secondNum = secondNum[secondArrayNum];
  }
  let ifStatementGoalValue = JSON.parse(localStorage.getItem('storedGoalChM'));
  if (ifStatementGoalValue != null) {
    ifStatementGoalValue = ifStatementGoalValue[11];
  }
  let ifStatementSecondGoalValue = JSON.parse(
    localStorage.getItem('storedGoalChM'),
  );
  if (ifStatementSecondGoalValue != null) {
    ifStatementSecondGoalValue = ifStatementSecondGoalValue[firstArrayNum];
  }
  //console.log(firstVal);
  //console.log(secondNum);
  const currentDate = new Date();
  const date1 = new Date(firstVal);
  const date2 = new Date(currentDate);
  let tempHighestReturnVal = 0;

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  const Difference_In_Days = Math.round(
    Difference_In_Time / (1000 * 3600 * 24),
  );
  //console.log(Difference_In_Days)

  if (Difference_In_Days >= inDaysNumber) {
    //console.log("DId I enter the first one")
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[secondArrayNum]);
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[firstArrayNum]);
    // console.log(getHighestWPM());
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[secondArrayNum])
    if (ifStatementGoalValue >= ifStatementSecondGoalValue) {
      // console.log("DId I enter the second one")
      // console.log(parseInt(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1))
      //console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1);
      const inV = parseInt(
        JSON.parse(localStorage.getItem('storedMasterDate'))?.length - 1,
      );
      for (let i = 0; i < inV; i++) {
        //console.log(i);
        // console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1);
        // console.log("DId I enter the third one")
        const tempConvertedDate = convertDate(
          JSON.parse(localStorage.getItem('storedMasterDate'))[i],
        );
        //console.log(tempConvertedDate)
        //console.log('temp'+tempConvertedDate)
        //console.log(secondNum);
        //console.log(dateRangeCheck(firstNum, secondNum, tempConvertedDate));
        if (dateRangeCheck(firstNum, secondNum, tempConvertedDate)) {
          //console.log('I made it to the if');
          //  console.log(JSON.parse(localStorage.getItem("wpmGraphWPM"))[i]);
          //  console.log('I returned this value' + JSON.parse(localStorage.getItem("wpmGraphWPM"))[i+1]);
          // console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteData"))[i])
          const tempInHighestVal = JSON.parse(
            localStorage.getItem('storedMasterData'),
          )[i];
          //console.log('In if '+ tempInHighestVal);
          tempHighestReturnVal =
            tempHighestReturnVal == null ||
            tempInHighestVal > tempHighestReturnVal
              ? tempInHighestVal
              : tempHighestReturnVal;
          //return tempHighestReturnVal;
          //console.log(tempHighestReturnVal);
          //console.log('Idk if i made it here or not isl')
        }

        // return tempHighestReturnVal;
      }
      //console.log((tempHighestReturnVal == 'undefined') ? tempHighestReturnVal:'-' );
      //console.log('I think I made it to the return');
      //console.log(tempHighestReturnVal);
      return tempHighestReturnVal == 'undefined' ? '-' : tempHighestReturnVal;
    } else if (
      getHighestWPM() <
      JSON.parse(localStorage.getItem('storedGoalChM'))[secondArrayNum]
    ) {
      for (
        let i = 0;
        i <
        parseInt(
          JSON.parse(localStorage.getItem('storedMasterDate'))[
            JSON.parse(localStorage.getItem('storedMasterDate')).length - 1
          ],
        );
        i++
      ) {
        //console.log("DId I enter the third one")
        //  console.log(JSON.parse(localStorage.getItem("wpmGraphDate"))[i]);
        const tempConvertedDate = convertDate(
          JSON.parse(localStorage.getItem('storedMasterDate'))[i],
        );
        if (tempConvertedDate == secondNum) {
          // console.log(JSON.parse(localStorage.getItem("wpmGraphWPM"))[i]);
          return JSON.parse(localStorage.getItem('storedMasterData'))[i];
        }
      }
    }
  } else {
    //console.log('-')
    //  console.log('left out with0');

    return '-';
  }
}

function calculateActualValueCPM(
  inDaysNumber: number,
  firstArrayNum: number,
  secondArrayNum: number,
) {
  let firstVal = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (firstVal != null) {
    firstVal = firstVal[0];
  }
  let firstNum = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (firstNum != null) {
    firstNum = firstNum[firstArrayNum];
  }
  let secondNum = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (secondNum != null) {
    secondNum = secondNum[secondArrayNum];
  }
  let ifStatementGoalValue = JSON.parse(localStorage.getItem('storedGoalCPM'));
  if (ifStatementGoalValue != null) {
    ifStatementGoalValue = ifStatementGoalValue[11];
  }
  let ifStatementSecondGoalValue = JSON.parse(
    localStorage.getItem('storedGoalCPM'),
  );
  if (ifStatementSecondGoalValue != null) {
    ifStatementSecondGoalValue = ifStatementSecondGoalValue[firstArrayNum];
  }
  //console.log(firstVal);
  //console.log(secondNum);
  const currentDate = new Date();
  const date1 = new Date(firstVal);
  const date2 = new Date(currentDate);
  let tempHighestReturnVal = 0;

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  const Difference_In_Days = Math.round(
    Difference_In_Time / (1000 * 3600 * 24),
  );
  //console.log(Difference_In_Days)
  if (Difference_In_Days >= inDaysNumber) {
    //console.log("DId I enter the first one")
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[secondArrayNum]);
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[firstArrayNum]);
    // console.log(getHighestWPM());
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[secondArrayNum])
    if (ifStatementGoalValue >= ifStatementSecondGoalValue) {
      // console.log("DId I enter the second one")
      // console.log(parseInt(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1))
      //console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1);
      const inV = parseInt(
        JSON.parse(localStorage.getItem('storedCharactersPerMinuteDate'))
          ?.length - 1,
      );
      for (let i = 0; i < inV; i++) {
        //console.log(i);
        // console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1);
        // console.log("DId I enter the third one")
        const tempConvertedDate = convertDate(
          JSON.parse(localStorage.getItem('storedCharactersPerMinuteDate'))[i],
        );
        //console.log(tempConvertedDate)
        //console.log('temp'+tempConvertedDate)
        //console.log(secondNum);
        //console.log(dateRangeCheck(firstNum, secondNum, tempConvertedDate));
        if (dateRangeCheck(firstNum, secondNum, tempConvertedDate)) {
          //console.log('I made it to the if');
          //  console.log(JSON.parse(localStorage.getItem("wpmGraphWPM"))[i]);
          //  console.log('I returned this value' + JSON.parse(localStorage.getItem("wpmGraphWPM"))[i+1]);
          // console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteData"))[i])
          const tempInHighestVal = JSON.parse(
            localStorage.getItem('storedCharactersPerMinuteData'),
          )[i];
          //console.log('In if '+ tempInHighestVal);
          tempHighestReturnVal =
            tempHighestReturnVal == null ||
            tempInHighestVal > tempHighestReturnVal
              ? tempInHighestVal
              : tempHighestReturnVal;
          //return tempHighestReturnVal;
          //console.log(tempHighestReturnVal);
          //console.log('Idk if i made it here or not isl')
        }

        // return tempHighestReturnVal;
      }
      // console.log((tempHighestReturnVal == 'undefined') ? tempHighestReturnVal:'-' );
      //console.log('I think I made it to the return');
      return tempHighestReturnVal == 'undefined' ? '-' : tempHighestReturnVal;
    } else if (
      getHighestWPM() <
      JSON.parse(localStorage.getItem('storedGoalWPM'))[secondArrayNum]
    ) {
      for (
        let i = 0;
        i <
        parseInt(
          JSON.parse(localStorage.getItem('wpmGraphDate'))[
            JSON.parse(localStorage.getItem('wpmGraphDate')).length - 1
          ],
        );
        i++
      ) {
        //console.log("DId I enter the third one")
        //  console.log(JSON.parse(localStorage.getItem("wpmGraphDate"))[i]);
        const tempConvertedDate = convertDate(
          JSON.parse(localStorage.getItem('wpmGraphDate'))[i],
        );
        if (tempConvertedDate == secondNum) {
          // console.log(JSON.parse(localStorage.getItem("wpmGraphWPM"))[i]);
          return JSON.parse(localStorage.getItem('wpmGraphWPM'))[i];
        }
      }
    }
  } else {
    //console.log('-')
    return '-';
  }
}

function calculateActualValueAWPM(
  inDaysNumber: number,
  firstArrayNum: number,
  secondArrayNum: number,
) {
  let firstVal = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (firstVal != null) {
    firstVal = firstVal[0];
  }
  let firstNum = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (firstNum != null) {
    firstNum = firstNum[firstArrayNum];
  }
  let secondNum = JSON?.parse(localStorage?.getItem('storedGoalDate'));
  if (secondNum != null) {
    secondNum = secondNum[secondArrayNum];
  }
  let ifStatementGoalValue = JSON.parse(localStorage.getItem('storedGoalAWPM'));
  if (ifStatementGoalValue != null) {
    ifStatementGoalValue = ifStatementGoalValue[11];
  }
  let ifStatementSecondGoalValue = JSON.parse(
    localStorage.getItem('storedGoalAWPM'),
  );
  if (ifStatementSecondGoalValue != null) {
    ifStatementSecondGoalValue = ifStatementSecondGoalValue[firstArrayNum];
  }

  //console.log(firstVal);
  //console.log(secondNum);
  const currentDate = new Date();
  const date1 = new Date(firstVal);
  const date2 = new Date(currentDate);
  let tempHighestReturnVal = 0;

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  const Difference_In_Days = Math.round(
    Difference_In_Time / (1000 * 3600 * 24),
  );
  //console.log(Difference_In_Days)
  if (Difference_In_Days >= inDaysNumber) {
    //console.log("DId I enter the first one")
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[secondArrayNum]);
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[firstArrayNum]);
    // console.log(getHighestWPM());
    // console.log(JSON.parse(localStorage.getItem("storedGoalWPM"))[secondArrayNum])
    if (ifStatementGoalValue >= ifStatementSecondGoalValue) {
      // console.log("DId I enter the second one")
      // console.log(parseInt(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1))
      //console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1);
      const inV = parseInt(
        JSON.parse(localStorage.getItem('avgGraphDate'))?.length - 1,
      );
      for (let i = 0; i < inV; i++) {
        //console.log(i);
        // console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteDate")).length-1);
        // console.log("DId I enter the third one")
        const tempConvertedDate = convertDate(
          JSON.parse(localStorage.getItem('avgGraphDate'))[i],
        );
        //console.log(tempConvertedDate)
        //console.log('temp'+tempConvertedDate)
        //console.log(secondNum);
        //console.log(dateRangeCheck(firstNum, secondNum, tempConvertedDate));
        if (dateRangeCheck(firstNum, secondNum, tempConvertedDate)) {
          //console.log('I made it to the if');
          //  console.log(JSON.parse(localStorage.getItem("wpmGraphWPM"))[i]);
          //  console.log('I returned this value' + JSON.parse(localStorage.getItem("wpmGraphWPM"))[i+1]);
          // console.log(JSON.parse(localStorage.getItem("storedCharactersPerMinuteData"))[i])
          const tempInHighestVal = JSON.parse(
            localStorage.getItem('avgGraphWPM'),
          )[i];
          //console.log('In if '+ tempInHighestVal);
          tempHighestReturnVal =
            tempHighestReturnVal == null ||
            tempInHighestVal > tempHighestReturnVal
              ? tempInHighestVal
              : tempHighestReturnVal;
          //return tempHighestReturnVal;
          //console.log(tempHighestReturnVal);
          //console.log('Idk if i made it here or not isl')
        }

        // return tempHighestReturnVal;
      }
      //console.log((tempHighestReturnVal == 'undefined') ? tempHighestReturnVal:'-' );
      //console.log('I think I made it to the return');
      return tempHighestReturnVal == 'undefined' ? '-' : tempHighestReturnVal;
    } else if (
      getHighestWPM() <
      JSON.parse(localStorage.getItem('storedGoalAWPM'))[secondArrayNum]
    ) {
      for (
        let i = 0;
        i <
        parseInt(
          JSON.parse(localStorage.getItem('avgGraphDate'))[
            JSON.parse(localStorage.getItem('avgGraphDate')).length - 1
          ],
        );
        i++
      ) {
        //console.log("DId I enter the third one")
        //  console.log(JSON.parse(localStorage.getItem("wpmGraphDate"))[i]);
        const tempConvertedDate = convertDate(
          JSON.parse(localStorage.getItem('avgGraphDate'))[i],
        );
        if (tempConvertedDate == secondNum) {
          // console.log(JSON.parse(localStorage.getItem("wpmGraphWPM"))[i]);
          return JSON.parse(localStorage.getItem('avgGraphWPM'))[i];
        }
      }
    }
  } else {
    //console.log('-')
    return '-';
  }
}

function testFunc(
  inDaysNumber: number,
  firstArrayNum: number,
  secondArrayNum: number,
) {
  const firstNum = JSON.parse(localStorage.getItem('storedGoalDate'))[
    firstArrayNum
  ];
  const secondNum = JSON.parse(localStorage.getItem('storedGoalDate'))[
    secondArrayNum
  ];
  const date1 = new Date(firstNum);
  const date2 = new Date(secondNum);
  const currentDate = new Date();

  // To calculate the time difference of two dates
  const Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  //console.log(Difference_In_Days)

  // console.log(new Date(firstNum));
  const g = localStorage.getItem('wpmGraphDate');
  // console.log(firstNum)
  //console.log(new Date(firstNum));
  //console.log(convertDateForDay(new Date(firstNum)));
}
export const PracticeStreak = styled.button.attrs({
  className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
})``;

const tableText = {
  textAlign: 'center' as const,
};
const sd = {
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont',
};
const resetGoalButtonStyleActive = {
  position: 'absolute' as const,
  marginLeft: '50px' as const,
  marginTop: '15px' as const,
  display: '' as const,
};
const resetGoalButtonStyleInactive = {
  position: 'absolute' as const,
  marginLeft: '50px' as const,
  marginTop: '15px' as const,
  display: 'none' as const,
};

const here = {
  position: 'absolute' as const,
  zIndex: '1' as const,
  top: '45%' as const,
  left: '22.5%' as const,
  width: '50%' as const,
  textAlign: 'center' as const,
  backgroundColor: 'rgba(0, 0, 0, 0.25)' as const,
};
