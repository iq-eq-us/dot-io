import React, { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import SectorGroup from './SectorGroup';
import charachorderBackground from '../../../assets/charachorder_background_feathered_no_center.png';
import styled from 'styled-components';
import useWindowSize from '../../../hooks/useWindowSize';
import charachorderLiteBackground from '../../../assets/CharaChorder_Lite.png';
import { useStoreState } from '../../../store/store';
import type { Position, Row } from '../../../models/keyHighlightPositionsCharachorderLite';
import {pickerV1} from '../../../models/keyboardDropDownFolder/keyboardDropDown'
import {pickerLite} from '../../../models/keyboardDropDownFolder/keyboardDropDown'



interface OverlayProps {
  overrideBottom?: boolean;
}

interface OverlayContainerProps {
  width?: number;
  height?: number;
  scale?: number;
}
const triggerResize = () => {
  // This is done to make sure that the popover elements are in the correct position
  // The only time their position is recalculated is on scroll or resize
  // So this needs to be triggered manually
  window.dispatchEvent(new Event('resize'));
};

function CharachorderOverlayLite({ overrideBottom }: OverlayProps): ReactElement {
  const [hasLoadedBackgroundImage , setHasLoadedBackgroundImage] =
    useState(pickerV1);
  const setHasLoadedToTrue = () => setHasLoadedBackgroundImage(pickerV1);
  const overlayRef = useRef(null);
  const [overlayScale, setOverlayScale] = useState<OverlayContainerProps>({});

  const screenSize = useWindowSize();

  useLayoutEffect(() => {
    const scaleObject = fitToParent(overlayRef.current);
    setOverlayScale(scaleObject);
  }, [screenSize]);
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
    <OverlayContainer
      ref={overlayRef}
      scaleWidth={overlayScale?.width || 1}
      onLoad = {triggerResize}
      scaleHeight={overlayScale?.height || 1}
      scale={overlayScale?.scale || 1}
      {...{ overrideBottom }}
    >    
      {pickerLite && (
    <div className="body" style={keyboardBodyStyle}>
    <div className ="keyboard" style={keyboardStyle}>
   <div className="row" style={rowStyle}>
     <div style={buttonStyle}>esc</div>
     <div style={buttonStyle}>1 !</div>
     <div style={buttonStyle}>2 @</div>
     <div style={buttonStyle}>3 #</div>
     <div style={buttonStyle}>4 $</div>
     <div style={buttonStyle}>5 %</div>
     <div style={buttonStyle}>6 ^</div>
     <div style={buttonStyle}>7 &amp;</div>
     <div style={buttonStyle}>8 *</div>
     <div style={buttonStyle}>9 (</div>
     <div style={buttonStyle}>0 )</div>
     <div style={buttonStyle}>- _</div>
     <div style={buttonStyle}>= +</div>
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
     <div style={ compare2(2,12) ?  highlightedButtonStyle : buttonStyle}> {'{'} [</div>
     <div style={ compare2(2,13) ?  highlightedButtonStyle : buttonStyle}> {'}'} ]</div>
     <div id='backslash' style={buttonStyle}>\ |</div>
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
     <div style={ compare2(3,11) ?  highlightedButtonStyle : buttonStyle}>; :</div>
     <div style={ compare2(3,12) ?  highlightedButtonStyle : buttonStyle}>&quot; &apos;</div>
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
     <div style={ compare2(4,8) ?  highlightedButtonStyle : buttonStyle}>M </div>
     <div style={buttonStyle}>, &lt;</div>
     <div style={buttonStyle}>. &gt;</div>
     <div style={buttonStyle}>/ ?</div>
     <div style={ compare2(4,12) ? highlightedButtonStyle : buttonStyle}>⇧</div>
     <div style={buttonStyle}>↑</div>
     <div style={buttonStyle}>Del</div>
   </div>
   <div className="row" style={rowStyle}>
     <div style={buttonStyle}>⊞</div>
     <div style={buttonStyle}>Ctrl</div>
     <div style={buttonStyle}>alt</div>
     <div style={compare2(5,4) ?  highlightedEnterButtonStyle : enterButtonStyle}>Space<p>Past</p></div>
     <div style={buttonStyle}>Fn</div>
     <div style={compare2(5,6) ?  highlightedButtonStyle : buttonStyle}>DUP</div>
     <div style={enterButtonStyle}>Space<p>Plural</p></div>
     <div style={buttonStyle}>⊞</div>
     <div style={buttonStyle}>Fn</div>
     <div style={buttonStyle}>←</div>
     <div style={buttonStyle}>↓</div>
     <div style={buttonStyle}>→</div>
 
   </div>  
 </div>
 </div>
       )}    {pickerV1 && (
         <React.Fragment>
        <img
        onLoad={setHasLoadedToTrue}
        src={charachorderBackground}
        className="mt-8"
      /> 
        <div>
          {/* Left Side Sector Groups */}
          <SectorGroup
            top={28.95}
            left={11.13}
            scale={0.75}
            groupSpecifier={1}
          />
          <SectorGroup
            top={21.6}
            left={20.63}
            scale={0.74}
            groupSpecifier={2}
          />
          <SectorGroup top={17.7} left={30.6} scale={0.74} groupSpecifier={3} />
          <SectorGroup top={28} left={39.0} scale={0.74} groupSpecifier={4} />
          <SectorGroup left={41.5} top={53.3} scale={0.74} groupSpecifier={5} />
          <SectorGroup left={38.1} top={69.2} scale={0.74} groupSpecifier={6} />
          <SectorGroup left={34.0} top={84.2} scale={0.74} groupSpecifier={7} />
          <SectorGroup left={10.2} top={68.2} scale={0.55} groupSpecifier={8} />
          <SectorGroup
            left={17.2}
            top={72.9}
            scale={0.55}
            groupSpecifier={10}
          />

          {/* Right Side Sector Groups */}
          <SectorGroup left={52.9} top={28} scale={0.74} groupSpecifier={9} />
          <SectorGroup
            left={61.3}
            top={17.7}
            scale={0.74}
            groupSpecifier={11}
          />
          <SectorGroup
            left={71.4}
            top={21.5}
            scale={0.74}
            groupSpecifier={12}
          />
          <SectorGroup
            left={80.9}
            top={29.0}
            scale={0.74}
            groupSpecifier={13}
          />
          <SectorGroup
            left={50.4}
            top={53.3}
            scale={0.74}
            groupSpecifier={14}
          />
          <SectorGroup
            left={53.9}
            top={69.1}
            scale={0.74}
            groupSpecifier={15}
          />
          <SectorGroup
            left={57.9}
            top={84.2}
            scale={0.74}
            groupSpecifier={16}
          />
          <SectorGroup
            left={74.5}
            top={72.9}
            scale={0.55}
            groupSpecifier={10}
          />
          <SectorGroup left={81.5} top={68.2} scale={0.55} groupSpecifier={8} />
        </div>
        </React.Fragment>
      )}    
     
    </OverlayContainer> 
    </React.Fragment>
  );
}

interface Props {
  scaleHeight: number;
  scaleWidth: number;
  scale: number;
}

const OverlayContainer = styled.div.attrs<Props>({})<Props>`
  position: absolute;

  ${(props) => `transform: scale(${Math.min(1, props.scale)})`};
  ${(props) => `top: ${(-(1 - props.scaleHeight) * 532) / 2}px`};
  ${(props) => `left: ${(-(1 - props.scaleWidth) * 1000) / 2}px`};

  width: 1000px;
  height: 532px;
`;

const keyboardBodyStyle ={
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center" as const, 
   color: "#999",
  fontFamily: "system-ui, sans-serif" as const,
  marginTop:"80px"
      }

const keyboardStyle = {
  display: "flex", 
  flexDirection: 'column' as const ,  
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
  //verticalAlign: "baseline",
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
boxSizing: "border-box" as const, 
color: "white", 
display: "inline-block", 
fontFamily: "system-ui, sans-serif", 
fontSize: "1rem", 
fontWeight: "bold" as const, 
lineHeight: "1.125", 
padding: "0.33em 0.66em", 
position: "relative" as const, 
textAlign: "center" as const, 
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
backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 5%, transparent 5%, transparent 95%, #c9c9c9 95%, #e9e8e6)"
};

const highlightedButtonStyle = 
{
borderRadius: "3px", 
boxSizing: "border-box" as const, 
color: "white", 
display: "inline-block", 
fontFamily: "system-ui, sans-serif", 
fontSize: "1rem", 
fontWeight: "bold" as const, 
lineHeight: "1.125", 
padding: "0.33em 0.66em", 
position: "relative" as const, 
textAlign: "center" as const, 
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
backgroundImage: "linear-gradient(to right, green, #c9c9c9 5%, transparent 5%, transparent 95%, #c9c9c9 95%, green)",
transform: "scale(0.96,0.96)     translate(0, 3px)"
};

const shiftButtonStyle = 
{
  borderRadius: "3px", 
  boxSizing: "border-box" as const, 
  color: "white", 
  display: "inline-block", 
  fontFamily: "system-ui, sans-serif", 
  fontSize: "1rem", 
  fontWeight: "bold" as const, 
  lineHeight: "1.125", 
  padding: "0.33em 0.66em", 
  position: "relative" as const, 
  textAlign: "center" as const, 
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
  backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 2%, transparent 2%, transparent 98%, #c9c9c9 98%, #e9e8e6)"
};

const enterButtonStyle = 
{

  borderRadius: "3px", 
  boxSizing: "border-box" as const, 
  color: "white", 
  display: "inline-block", 
  fontFamily: "system-ui, sans-serif", 
  fontSize: "1rem", 
  fontWeight: "bold" as const, 
  lineHeight: "1.125", 
  padding: "0.33em 0.66em", 
  position: "relative" as const, 
  textAlign: "center" as const, 
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
  backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 3%, transparent 5%, transparent 95%, #c9c9c9 97%, #e9e8e6)"
};
const highlightedEnterButtonStyle = 
{

  borderRadius: "3px", 
  boxSizing: "border-box" as const, 
  color: "white", 
  display: "inline-block", 
  fontFamily: "system-ui, sans-serif", 
  fontSize: "1rem", 
  fontWeight: "bold" as const, 
  lineHeight: "1.125", 
  padding: "0.33em 0.66em", 
  position: "relative" as const, 
  textAlign: "center" as const, 
  verticalAlign: "middle", 
  width: "125px", 
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
backgroundImage: "linear-gradient(to right, green, #c9c9c9 5%, transparent 5%, transparent 95%, #c9c9c9 95%, green)",
transform: "scale(0.96,0.96)     translate(0, 3px)"
};

const capitalButtonStyle = 
{
  borderRadius: "3px", 
  fill:'#43e272',
  boxSizing: "border-box" as const, 
  color: "white", 
  display: "inline-block", 
  fontFamily: "system-ui, sans-serif", 
  fontSize: "1rem", 
  fontWeight: "bold" as const, 
  lineHeight: "1.125", 
  padding: "0.33em 0.66em", 
  position: "relative" as const, 
  textAlign: "center" as const, 
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
  backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 3%, transparent 5%, transparent 95%, #c9c9c9 97%, #e9e8e6)"
};
const tabButtonStyle = 
{
    borderRadius: "3px", 
    boxSizing: "border-box" as const, 
    color: "white", 
    display: "inline-block", 
    fontFamily: "system-ui, sans-serif", 
    fontSize: "1rem", 
    fontWeight: "bold" as const, 
    lineHeight: "1.125", 
    padding: "0.33em 0.66em", 
    position: "relative" as const, 
    textAlign: "center" as const, 
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
     backgroundImage: "linear-gradient(to right, #e9e8e6, #c9c9c9 3%, transparent 1%, transparent 99%, #c9c9c9 97%, #e9e8e6)"
    };

function fitToParent(element: HTMLElement | null) {
  const width = element?.parentElement?.clientWidth || 0;
  const height = element?.parentElement?.clientHeight || 0;
  const idealWidth = 1000;
  const idealHeight = 532;

  return {
    width: width / idealWidth,
    height: height / idealHeight,
    scale: Math.min(width / idealWidth, height / idealHeight),
  };
}

export default CharachorderOverlayLite;
