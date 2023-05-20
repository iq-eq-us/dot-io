import React, { Component } from 'react';
import {
  getAverageWPM,
  getHighestWPM,
  getChordsMastered,
  getChordsPerMinute,
} from '../../manager/components/chordGraphs';
import PropTypes from 'prop-types';

const triggerResize = () => {
  // This is done to make sure that the popover elements are in the correct position
  // The only time their position is recalculated is on scroll or resize
  // So this needs to be triggered manually
  window.dispatchEvent(new Event('resize'));
};

export class PopUp extends Component {
  static propTypes = {
    toggle: PropTypes.any,
  };

  handleClick = () => {
    this.props.toggle();
  };

  handleGoalClick = () => {
    const goalWPMArray = [];
    const goalAWPMArray = [];
    const goalChMArray = [];
    const goalACPMArray = [];

    const goaltWPM = document.getElementById('goalWPM');
    const goalaWPM = document.getElementById('goalAWPM');
    const goalChM = document.getElementById('goalCHM');
    const goalaCPM = document.getElementById('goalACPM');

    const currenttWPM = goaltWPM.value - getHighestWPM();
    const currentaWPM = goalaWPM.value - getAverageWPM();
    const currentChM = goalChM.value - getChordsMastered();
    const currentACPM = goalaCPM.value - getChordsPerMinute();

    localStorage.setItem('storedGoalWPM', JSON.stringify(goalWPMArray));
    localStorage.setItem('storedGoalAWPM', JSON.stringify(goalAWPMArray));
    localStorage.setItem('storedGoalChM', JSON.stringify(goalChMArray));
    localStorage.setItem('storedGoalCPM', JSON.stringify(goalACPMArray));

    goalWPMSet(currenttWPM / 12);
    goalAWPMSet(currentaWPM / 12);
    goalACPMSet(currentACPM / 12);
    goalChMSet(currentChM / 12);

    dates(new Date());
    this.props.toggle();
  };

  render() {
    return (
      <React.Fragment>
        <div style={modal}>
          <div style={modal_content}>
            <span className="close" onClick={this.handleClick}>
              &times;
            </span>
            <form>
              <div style={{ color: 'rgb(75 85 99)', fontWeight: 'bold' }}>
                Set Your Typing Goals
              </div>
              <div>
                Enter your goal number for each given category{' '}
                <div>(ex. current: 35, Goal: 50)</div>
              </div>

              <table>
                <tr>
                  <th />
                  <th>Current</th>
                  <th>Goal</th>
                  <th> </th>
                </tr>
                <tr>
                  <td>tWPM</td>
                  <td>{getHighestWPM()}</td>
                  <td>
                    <input
                      type="number"
                      style={goalIndex}
                      id="goalWPM"
                      required
                    />
                  </td>
                  <td id="realTimeWeeklyValWPM" />
                </tr>
                <tr>
                  <td>aWPM</td>
                  <td>{getAverageWPM()}</td>
                  <td>
                    <input
                      type="number"
                      style={goalIndex}
                      id="goalAWPM"
                      required
                    />
                  </td>
                  <td />
                </tr>
                <tr>
                  <td>ChM</td>
                  <td>{getChordsMastered()}</td>
                  <td>
                    <input
                      type="number"
                      style={goalIndex}
                      id="goalCHM"
                      required
                    />
                  </td>
                  <td />
                </tr>
                <tr>
                  <td>aCPM</td>
                  <td>{getChordsPerMinute()}</td>
                  <td>
                    <input
                      type="number"
                      style={goalIndex}
                      id="goalACPM"
                      required
                    />
                  </td>
                  <td />
                </tr>
              </table>
              <button
                type="submit"
                className="text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
                onClick={this.handleGoalClick}
              >
                Calibrate Goals
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default class GoalsButton extends React.Component {
  state = {
    seen: false,
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  render() {
    return (
      <div>
        <div className="btn" onClick={this.togglePop}>
          <button className="text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]">
            {JSON.parse(localStorage.getItem('storedGoalAWPM')) == null
              ? 'Set Goals'
              : 'Reset Goals'}
          </button>
        </div>
        {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
      </div>
    );
  }
}

function dates(current: any) {
  const week = [];
  // Starting Monday not Sunday
  current.setDate(current.getDate());
  for (let i = 0; i < 12; i++) {
    week.push(convertDate(current));
    current.setDate(current.getDate() + 7);
  }
  localStorage.setItem('storedGoalDate', JSON.stringify(week));
  return week;
}

function convertDate(date: Date) {
  const month = date.getMonth() + 1; //months from 1-12
  const day = date.getDate();
  const year = date.getFullYear();

  const newdate = month + '/' + day + '/' + year;
  return newdate;
}

function goalWPMSet(goalV: any) {
  const tempStoredGoalWPM = JSON.parse(localStorage.getItem('storedGoalWPM'));
  let number = 0;
  for (let i = 1; i < 13; i++) {
    number = getHighestWPM() + i * goalV;
    number = Math.round(number * 10) / 10;
    tempStoredGoalWPM.push(number);
  }
  localStorage.setItem('storedGoalWPM', JSON.stringify(tempStoredGoalWPM));
}
function goalAWPMSet(goalV: any) {
  const tempStoredGoalAWPM = JSON.parse(localStorage.getItem('storedGoalAWPM'));
  let number = 0;
  for (let i = 1; i < 13; i++) {
    number = getAverageWPM() + i * goalV;
    number = Math.round(number * 10) / 10;
    tempStoredGoalAWPM.push(number);
  }
  localStorage.setItem('storedGoalAWPM', JSON.stringify(tempStoredGoalAWPM));
}
function goalChMSet(goalV: any) {
  const tempStoredGoalChM = JSON.parse(localStorage.getItem('storedGoalChM'));
  let number = 0;
  for (let i = 1; i < 13; i++) {
    number = getChordsMastered() + i * goalV;
    number = Math.round(number * 10) / 10;
    tempStoredGoalChM.push(number);
  }
  localStorage.setItem('storedGoalChM', JSON.stringify(tempStoredGoalChM));
}
function goalACPMSet(goalV: any) {
  const tempStoredGoalACPM = JSON.parse(localStorage.getItem('storedGoalCPM'));
  let number = 0;
  for (let i = 1; i < 13; i++) {
    number = getChordsPerMinute() + i * goalV;
    number = Math.round(number * 10) / 10;
    tempStoredGoalACPM.push(number);
  }
  localStorage.setItem('storedGoalCPM', JSON.stringify(tempStoredGoalACPM));
}

const modal = {
  position: 'absolute' as const,
  zIndex: '1' as const,
  top: '45%' as const,
  left: '22.5%' as const,
  width: '50%' as const,
  textAlign: 'center' as const,
  backgroundColor: 'rgba(0, 0, 0, 0.25)' as const,
};

const modal_content = {
  backgroundColor: 'white' as const,
  position: 'absolute' as const,
  top: '20%' as const,
  left: '30%' as const,
  padding: '20px' as const,
  borderRadius: '5px' as const,
  border: '2px solid black' as const,
};
const goalIndex = {
  borderRadius: '5px',
  border: '1.5px solid black',
};
