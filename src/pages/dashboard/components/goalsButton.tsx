import React, { Component } from "react";
import { getAverageWPM, getHighestWPM, getChordsMastered, getChordsPerMinute } from '../../manager/components/chordGraphs';

const triggerResize = () => {
  // This is done to make sure that the popover elements are in the correct position
  // The only time their position is recalculated is on scroll or resize
  // So this needs to be triggered manually
  window.dispatchEvent(new Event('resize'));
};

export class PopUp extends Component {

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

    const currenttWPM = getHighestWPM();
    const currentaWPM = getAverageWPM();
    const currentChM = getChordsMastered();
    const currentACPM = getChordsPerMinute();

   

    localStorage.setItem("storedGoalWPM", JSON.stringify(goalWPMArray));
    localStorage.setItem("storedGoalAWPM", JSON.stringify(goalAWPMArray));
    localStorage.setItem("storedGoalChM", JSON.stringify(goalChMArray));
    localStorage.setItem("storedGoalCPM", JSON.stringify(goalACPMArray));

    goalWPMSet(goaltWPM.value);
    goalAWPMSet(goalaWPM.value);
    goalACPMSet(goalaCPM.value);
    goalChMSet(goalChM.value);

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
          <table>
        <tr>
          <th> </th>
          <th>Current</th>
          <th>Goal</th>
          <th>Weekly Goal</th>
        </tr>
        <tr>
          <td>tWPM</td>
          <td>{getHighestWPM()}</td>
          <td><input type="string" style={goalIndex} id = "goalWPM" required/></td>
          <td>3.5</td>

        </tr>
        <tr>
          <td>aWPM</td>
          <td>{getAverageWPM()}</td>
          <td><input type="string" style={goalIndex} id = "goalAWPM" required/></td>
          <td>2.3</td>

        </tr>
        <tr>
          <td>ChM</td>
          <td>{getChordsMastered()}</td>
          <td><input type="string" style={goalIndex} id = "goalCHM" required/></td>
          <td>1.4</td>
        </tr>
        <tr>
          <td>aCPM</td>
          <td>{getChordsPerMinute()}</td>
          <td ><input type="string" style={goalIndex} id = "goalACPM" required/></td>
          <td>3.3</td>
        </tr>

      </table>
      <button type="submit" className="text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]" onClick={this.handleGoalClick}>Calibrate Goals</button>

      </form>

        </div>
      </div>
      
      </React.Fragment>

    );
  }
}

export default class GoalsButton extends React.Component {
  state = {
    seen: false
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };
 
  render() {
    return (
      <div>
        <div className="btn" onClick={this.togglePop}>
          <button className="text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]">Set Goals</button>
        </div>
        {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
      </div>
    );
  }
}

export class ResetGoalsButton extends React.Component {
  state = {
    seen: false
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };
 
  render() {
    return (
      <div>
        <div className="btn" onClick={this.togglePop}>
          <button className="text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500 hover:bg-[#3b3b3b] active:bg-[#222]">Reset Your Goals</button>
        </div>
        {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
      </div>
    );
  }
}
 function dates(current:any) {
  const week= []; 
  // Starting Monday not Sunday
  current.setDate((current.getDate()));
  for (let i = 0; i < 12; i++) {
      week.push(
        convertDate(current)
      ); 
      current.setDate(current.getDate() +7);
  }
  localStorage.setItem("storedGoalDate", JSON.stringify(week));
  return week; 

}

function convertDate(date : Date){
  const month = date.getUTCMonth() + 1; //months from 1-12
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  
  const newdate = month + "/" + day + "/" + year;
  return newdate;
}

function goalWPMSet(goalV : any){

  const tempStoredGoalWPM = JSON.parse(localStorage.getItem("storedGoalWPM"))
  for(let i =1; i<13; i++) {
    tempStoredGoalWPM.push(getHighestWPM() + (i * goalV))
  }
  localStorage.setItem("storedGoalWPM", JSON.stringify(tempStoredGoalWPM));

}
function goalAWPMSet(goalV : any){

  const tempStoredGoalAWPM = JSON.parse(localStorage.getItem("storedGoalAWPM"));
  for(let i =1; i<13; i++) {
    tempStoredGoalAWPM.push(getAverageWPM() + (i * goalV));
  }
  localStorage.setItem("storedGoalAWPM", JSON.stringify(tempStoredGoalAWPM));

}
function goalChMSet(goalV : any){

  const tempStoredGoalChM = JSON.parse(localStorage.getItem("storedGoalChM"));
  for(let i =1; i<13; i++) {
    tempStoredGoalChM.push(getChordsMastered() + (i * goalV));
  }
  localStorage.setItem("storedGoalChM", JSON.stringify(tempStoredGoalChM));

}
function goalACPMSet(goalV : any){

  const tempStoredGoalACPM = JSON.parse(localStorage.getItem("storedGoalCPM"));
  for(let i =1; i<13; i++) {
    tempStoredGoalACPM.push(getChordsPerMinute() + (i * goalV));
  }
  localStorage.setItem("storedGoalCPM", JSON.stringify(tempStoredGoalACPM));

}

function goalValueSetter(current:any) {
  const week= []; 
  

}

const modal = {
    position: "absolute" as const, 
    zIndex: "1" as const, 
    top: "45%" as const,
    left: "22.5%" as const,
    width: "50%" as const,
    textAlign: "center" as const,
    backgroundColor: "rgba(0, 0, 0, 0.25)" as const
};

const modal_content = {
    backgroundColor: "white" as const,
     position: "absolute" as const,
     top: "20%" as const, 
     left: "30%" as const, 
     padding: "20px" as const, 
     borderRadius: "5px" as const, 
     border: "2px solid black" as const
    }
    const goalIndex = {
      borderRadius: "5px", 
      border:"1.5px solid black"
    }
    const gridContainer = {color: "#261f68", display: "flex", padding: "9.6px", marginTop: "20px", textAlign: "center"}
     const gridItem = {
      flexGrow: "0",
      maxWidth: "100%",
      flexBasis: "100%",
      color: "#261f68", 
      display: "table", 
      padding: "9.6px", 
      marginTop: "20px", 
      textAlign: "center", 
      boxSizing: "inherit", 
      float:"left"
      }
      