import React, { ReactElement } from 'react';
import { useStoreState } from '../../store/store';
import type { Position } from '../keyHighlightPositionsCharachorderLite';
import type { Row } from '../keyHighlightPositionsCharachorderLite';

import { RowGroupSpecifier } from '../sectorGroupCharachorderLite';



export function Light(): ReactElement {
  let styleValue = false;
  const keysToHighlight = useStoreState(
    (store) => store.currentlyHighlightedKeys,
  );

  const keysToHighlightLite = useStoreState(
    (store) => store.currentlyHighlightedKeysLite,
  );

      const compare2 = (rowGroup: Row, position: Position): boolean => {
        return JSON.stringify(keysToHighlightLite).includes(
          JSON.stringify({ rowGroup ,position }),
        );
      };

    return (
      <React.Fragment>
    <div className="body" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#999", fontFamily: "system-ui, sans-serif", marginTop:"80px"}}>
   <div className ="keyboard" style={keyboardStyle}>
  <div className="row" style={rowStyle}>
    <div style={ styleValue ?  enterButtonStyle : buttonStyle}>esc</div>
    <div style={buttonStyle}>1</div>
    <div style={buttonStyle}>2</div>
    <div style={buttonStyle}>3</div>
    <div style={buttonStyle}>3</div>
    <div style={buttonStyle}>4</div>
    <div style={buttonStyle}>5</div>
    <div style={buttonStyle}>6</div>
    <div style={buttonStyle}>7</div>
    <div style={buttonStyle}>8</div>
    <div style={buttonStyle}>9</div>
    <div style={buttonStyle}>0</div>
    <div style={buttonStyle}>-</div>
    <div style={buttonStyle}>=</div>
    <div style={shiftButtonStyle}>Backspace</div>

  </div>
  <div className="row" style={rowStyle}>
    <div style={tabButtonStyle}>Tab</div>
    <div style={ compare2(2,2) ?  highlightedButtonStyle : buttonStyle}>Q</div>
    <div style={ compare2(2,3) ?  highlightedButtonStyle : buttonStyle}>W</div>
    <div style={ compare2(2,4) ?  highlightedButtonStyle : buttonStyle}>E</div>
    <div style={ compare2(2,5) ?  highlightedButtonStyle : buttonStyle}>R</div>
    <div style={ compare2(2,6) ?  highlightedButtonStyle : buttonStyle}>T</div>
    <div style={ compare2(2,7) ?  highlightedButtonStyle : buttonStyle}>Y</div>
    <div style={ compare2(2,8) ?  highlightedButtonStyle : buttonStyle}>U</div>
    <div style={ compare2(2,9) ?  highlightedButtonStyle : buttonStyle}>I</div>
    <div style={ compare2(2,10) ?  highlightedButtonStyle : buttonStyle}>O</div>
    <div style={ compare2(2,11) ?  highlightedButtonStyle : buttonStyle}>P</div>
    <div style={ compare2(2,12) ?  highlightedButtonStyle : buttonStyle}>[</div>
    <div style={ compare2(2,13) ?  highlightedButtonStyle : buttonStyle}>]</div>
    <div id='backslash' style={buttonStyle}>\</div>
  </div>
  <div className="row" style={rowStyle}>
    <div style={capitalButtonStyle}>Caps</div>
    <div style={ compare2(3,2) ?  highlightedButtonStyle : buttonStyle}>A</div>
    <div style={ compare2(3,3) ?  highlightedButtonStyle : buttonStyle}>S</div>
    <div style={ compare2(3,4) ?  highlightedButtonStyle : buttonStyle}>D</div>
    <div style={ compare2(3,5) ?  highlightedButtonStyle : buttonStyle}>F</div>
    <div style={ compare2(3,6) ?  highlightedButtonStyle : buttonStyle}>G</div>
    <div style={ compare2(3,7) ?  highlightedButtonStyle : buttonStyle}>H</div>
    <div style={ compare2(3,8) ?  highlightedButtonStyle : buttonStyle}>J</div>
    <div style={ compare2(3,9) ?  highlightedButtonStyle : buttonStyle}>K</div>
    <div style={ compare2(3,10) ?  highlightedButtonStyle : buttonStyle}>L</div>
    <div style={ compare2(3,11) ?  highlightedButtonStyle : buttonStyle}>;</div>
    <div style={ compare2(3,12) ?  highlightedButtonStyle : buttonStyle}>'</div>
    <div style={enterButtonStyle}>Enter</div>
  </div>
  <div className="row" style={rowStyle}>
    <div style={shiftButtonStyle}>Shift</div>
    <div style={ compare2(4,2) ?  highlightedButtonStyle : buttonStyle}>Z</div>
    <div style={ compare2(4,3) ?  highlightedButtonStyle : buttonStyle}>X</div>
    <div style={ compare2(4,4) ?  highlightedButtonStyle : buttonStyle}>C</div>
    <div style={ compare2(4,5) ?  highlightedButtonStyle : buttonStyle}>V</div>
    <div style={ compare2(4,6) ?  highlightedButtonStyle : buttonStyle}>B</div>
    <div style={ compare2(4,7) ?  highlightedButtonStyle : buttonStyle}>N</div>
    <div style={ compare2(4,8) ?  highlightedButtonStyle : buttonStyle}>M</div>
    <div style={buttonStyle}>,</div>
    <div style={buttonStyle}>.</div>
    <div style={buttonStyle}>/</div>
    
    <div style={buttonStyle}>↑</div>
    <div style={buttonStyle}>Del</div>
  </div>
  <div className="row" style={rowStyle}>
    <div style={buttonStyle}>⊞</div>
    <div style={buttonStyle}>Ctrl</div>
    <div style={buttonStyle}>alt</div>
    <div style={enterButtonStyle}>Space</div>
    <div style={buttonStyle}>Fn</div>
    <div style={buttonStyle}>alt</div>
    <div style={enterButtonStyle}>Space</div>
    <div style={buttonStyle}>⊞</div>
    <div style={buttonStyle}>Fn</div>
    <div style={buttonStyle}>←</div>
    <div style={buttonStyle}>↓</div>
    <div style={buttonStyle}>→</div>

  </div>  
</div>
</div>

      </React.Fragment>
    );
    
  }

 

  const keyboardStyle = {
    display: "flex", 
    flexDirection: "column",  
    justifyContent: "center", 
    alignItems: "center", 
    fontSize: "0", 
    borderRadius: "4px", 
    border: "13px solid #777", 
    borderTopColor: "#666", 
    borderBottomColor: "#888", 
    outline: "3px solid rgba(0, 0, 0, 0.2)", 
    outlineOffset: "-1px", 
    boxShadow: "inset 0 1rem 1rem rgb(0 0 0 / 50%), 0 2rem 3rem -0.5rem rgb(0 0 0 / 55%)", 
    //backgroundImage: "radial-gradient(#111, #222)", 
    padding: "0.25rem", 
    font: "inherit", 
    verticalAlign: "baseline",
    margin: "0"
  }

  const rowStyle ={ 
    height: "60px", 
    display: "flex", 
    justifyContent: "space-between", 
    width: "900.2px", 
    paddingTop: "1px", 
    marginBottom: "2px"
  }

  const buttonStyle = 
  {
  borderRadius: "3px", 
  //boxSizing: "border-box", 
  color: "white", 
  display: "inline-block", 
  fontFamily: "system-ui, sans-serif", 
  fontSize: "1rem", 
  //fontWeight: "bold", 
  lineHeight: "1.125", 
  padding: "0.33em 0.66em", 
  //position: "relative", 
  //textAlign: "center", 
  verticalAlign: "middle", 
  width: "60px", 
  height: "60px", 
  border: "3px solid transparent", 
  borderTop: "2px solid transparent", 
  borderBottom: "6px solid transparent", 
  backgroundColor: "black", 
  borderColor: "#c3c0bb", 
  borderTopColor: "#eeedeb", 
  borderBottomColor: "#a6a29a", 
  boxShadow: "0 -0.125em 0 -0.063em #a6a29a, 0 0.125em 0 -0.063em rgb(0 0 0 / 50%)", 
  transition: "transform 100ms", 
  outline: "0",
  borderLeftColor: "#b2afa8", 
  borderRightColor: "#b2afa8", 
  backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 5%, transparent 10%, transparent 90%, #c9c9c9 95%, #e9e8e6)"
};

const highlightedButtonStyle = 
  {
  borderRadius: "3px", 
  //boxSizing: "border-box", 
  color: "white", 
  display: "inline-block", 
  fontFamily: "system-ui, sans-serif", 
  fontSize: "1rem", 
  //fontWeight: "bold", 
  lineHeight: "1.125", 
  padding: "0.33em 0.66em", 
  //position: "relative", 
  //textAlign: "center", 
  verticalAlign: "middle", 
  width: "60px", 
  height: "60px", 
  border: "3px solid transparent", 
  borderTop: "2px solid transparent", 
  borderBottom: "6px solid transparent", 
  backgroundColor: "#43e272", 
  borderColor: "#c3c0bb", 
  borderTopColor: "#eeedeb", 
  borderBottomColor: "#a6a29a", 
  boxShadow: "0 -0.125em 0 -0.063em #a6a29a, 0 0.125em 0 -0.063em rgb(0 0 0 / 50%)", 
  transition: "transform 100ms", 
  outline: "0",
  borderLeftColor: "#b2afa8", 
  borderRightColor: "#b2afa8", 
  backgroundImage: "linear-gradient(to right, green, #c9c9c9 5%, transparent 10%, transparent 90%, #c9c9c9 95%, green)"
};

const shiftButtonStyle = 
{
    borderRadius: "3px", 
    boxSizing: "border-box", 
    color: "white", 
    display: "inline-block", 
    fontFamily: "system-ui, sans-serif", 
    fontSize: "1rem", 
    fontWeight: "bold", 
    lineHeight: "1.125", 
    padding: "0.33em 0.66em", 
    position: "relative", 
    textAlign: "center", 
    verticalAlign: "middle", 
    width: "140px", 
    height: "60px", 
    border: "3px solid transparent", 
    borderTop: "2px solid transparent", 
    borderBottom: "6px solid transparent", 
    backgroundColor: "black", 
    borderColor: "#c3c0bb", 
    borderTopColor: "#eeedeb", 
    borderBottomColor: "#a6a29a", 
    boxShadow: "0 -0.125em 0 -0.063em #a6a29a, 0 0.125em 0 -0.063em rgb(0 0 0 / 50%)", 
    transition: "transform 100ms", 
    outline: "0",
    borderLeftColor: "#b2afa8", 
    borderRightColor: "#b2afa8", 
    backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 1%, transparent 5%, transparent 95%, #c9c9c9 99%, #e9e8e6)"
  };

  const enterButtonStyle = 
{
  
    borderRadius: "3px", 
    boxSizing: "border-box", 
    color: "white", 
    display: "inline-block", 
    fontFamily: "system-ui, sans-serif", 
    fontSize: "1rem", 
    fontWeight: "bold", 
    lineHeight: "1.125", 
    padding: "0.33em 0.66em", 
    position: "relative", 
    textAlign: "center", 
    verticalAlign: "middle", 
    width: "125px", 
    height: "60px", 
    border: "3px solid transparent", 
    borderTop: "2px solid transparent", 
    borderBottom: "6px solid transparent", 
    backgroundColor: "black", 
    borderColor: "#c3c0bb", 
    borderTopColor: "#eeedeb", 
    borderBottomColor: "#a6a29a", 
    boxShadow: "0 -0.125em 0 -0.063em #a6a29a, 0 0.125em 0 -0.063em rgb(0 0 0 / 50%)", 
    transition: "transform 100ms", 
    outline: "0",
    borderLeftColor: "#b2afa8", 
    borderRightColor: "#b2afa8", 
    backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 1%, transparent 5%, transparent 95%, #c9c9c9 99%, #e9e8e6)"
  };

  const capitalButtonStyle = 
{
    borderRadius: "3px", 
    fill:'#43e272',
    boxSizing: "border-box", 
    color: "white", 
    display: "inline-block", 
    fontFamily: "system-ui, sans-serif", 
    fontSize: "1rem", 
    fontWeight: "bold", 
    lineHeight: "1.125", 
    padding: "0.33em 0.66em", 
    position: "relative", 
    textAlign: "center", 
    verticalAlign: "middle", 
    width: "120px", 
    height: "60px", 
    border: "3px solid transparent", 
    borderTop: "2px solid transparent", 
    borderBottom: "6px solid transparent", 
    backgroundColor: "black", 
    borderColor: "#c3c0bb", 
    borderTopColor: "#eeedeb", 
    borderBottomColor: "#a6a29a", 
    boxShadow: "0 -0.125em 0 -0.063em #a6a29a, 0 0.125em 0 -0.063em rgb(0 0 0 / 50%)", 
    transition: "transform 100ms", 
    outline: "0",
    borderLeftColor: "#b2afa8", 
    borderRightColor: "#b2afa8", 
    backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 1%, transparent 5%, transparent 95%, #c9c9c9 99%, #e9e8e6)"
  };
  const tabButtonStyle = 
  {
      borderRadius: "3px", 
      boxSizing: "border-box", 
      color: "white", 
      display: "inline-block", 
      fontFamily: "system-ui, sans-serif", 
      fontSize: "1rem", 
      fontWeight: "bold", 
      lineHeight: "1.125", 
      padding: "0.33em 0.66em", 
      position: "relative", 
      textAlign: "center", 
      verticalAlign: "middle", 
      width: "110px", 
      height: "60px", 
      border: "3px solid transparent", 
      borderTop: "2px solid transparent", 
      borderBottom: "6px solid transparent", 
      backgroundColor: "black", 
      borderColor: "#c3c0bb", 
      borderTopColor: "#eeedeb", 
      borderBottomColor: "#a6a29a", 
      boxShadow: "0 -0.125em 0 -0.063em #a6a29a, 0 0.125em 0 -0.063em rgb(0 0 0 / 50%)", 
      transition: "transform 100ms", 
      outline: "0",
      borderLeftColor: "#b2afa8", 
       borderRightColor: "#b2afa8", 
       backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 1%, transparent 5%, transparent 95%, #c9c9c9 99%, #e9e8e6)"
      };

;
  