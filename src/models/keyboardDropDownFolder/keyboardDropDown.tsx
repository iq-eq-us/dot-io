import styled from 'styled-components';
import React, { ReactElement, useState } from 'react';
import { useStoreState, useStoreActions } from '../../store/store';
import HelpCircleIcon from '../../pages/training/components/HelpCircleIcon';
import usePopover from '../../hooks/usePopover';


export let pickerLite = false;
export let pickerV1 = true;


 const options = ["CharaChorder Lite", "CharaChorder One"];

 const triggerResize = () => {
  // This is done to make sure that the popover elements are in the correct position
  // The only time their position is recalculated is on scroll or resize
  // So this needs to be triggered manually
  window.dispatchEvent(new Event('resize'));
};

 function DropDown(): ReactElement {
  const beginTraining = useStoreActions((store) => store.beginTrainingMode);
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setTrainingSettings = useStoreActions(
    (store) => store.setTrainingSettings,
  );
  const updateTrainingSetting = (newProperty: Record<string, unknown>) =>
    setTrainingSettings({ ...trainingSettings, ...newProperty });
  const currentTrainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,);  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggling = () => setIsOpen(!isOpen);
  const { parentProps: selector, Popper: selectorProper } = usePopover(
    'This allows you to switch your training device.',
  );
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  function returnElement(val : any){
     if(val == 'CharaChorder Lite'){
       pickerLite = true;
       pickerV1 = false;
   } else if((val == 'CharaChorder One')||(val == null)){
       pickerV1 = true;
       pickerLite = false;
   } 
   ((currentTrainingScenario !=null) ? beginTraining(currentTrainingScenario): console.log(''));
   triggerResize();
}

    const onOptionClicked  = (value:any) => () =>{
     
      setSelectedOption(value);
      returnElement(value);
      setIsOpen(false);
      ((currentTrainingScenario !=null) ? beginTraining(currentTrainingScenario): console.log(''));
      updateTrainingSetting({ isDisplayingSettingsModal: true });
      triggerResize();
    };
    
    React.useEffect(() => {
      pickerLite = false;
      pickerV1 = true;
     ((currentTrainingScenario !=null) ? beginTraining(currentTrainingScenario): console.log(''));
     triggerResize();
     const checkIfClickedOutside = (e :any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (!isOpen && ref.current && !ref.current.contains(e.target) ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
    
  }, []);

    
return(
  <React.Fragment>
      {selectorProper}
{}
  <label className="inline-flex text-sm font-bold mb-1 flex-row gap-2 items-center"{...selector}> Device Selector   
  <HelpCircleIcon/>
  </label>
<Main className="inline-flex text-sm font-bold mb-1 flex-row gap-2 items-center" ref={ref}>
<DropDownContainer >

<DropDownHeader onClick={toggling}>
  {selectedOption || "CharaChorder One"} 
  <Arrow/>

</DropDownHeader >

{isOpen && (
  <DropDownListContainer>
    <DropDownList>
      {options.map(option => (
        <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
          {option}
        </ListItem>
      ))}
   </DropDownList>
  </DropDownListContainer>
)}
</DropDownContainer>
</Main>
</React.Fragment>
);
 }
 export default DropDown

 const Main = styled("div")`
 font-family: sans-serif;


`;

const DropDownContainer = styled("div")`
 width: 15.5em;
 margin-left: auto;
 margin-right: auto;
 left: 0;
 right: 0;
 
`;
const Arrow = styled("div")`
   border-bottom: 2px solid #fff;
   border-right: 2px solid #fff;   
   position: relative;
   top: -11px;
   right: -160px;
   width: 10px;
   height: 10px;
   transform: rotate(45deg) translateY(-50%);
   transform-origin: right;
` ;

const DropDownHeader = styled("div")`
 padding: 0.6em 1.7em 0em 1em;
 box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
 font-weight: 500;
 font-size: 1rem;
 color: #00000;
 border: #333 solid;
 background: rgba(59, 130, 246);
 border-top-right-radius: 10px;
 border-top-left-radius: 10px;
 border-bottom-right-radius: 10px;
 border-bottom-left-radius: 10px;

 
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
 padding: 0.4em 0em 0em 0em;
 margin: 0;
 position: absolute;
 background: gray;
 border: #333 solid;
 color: #00000;
 font-size: 1rem;
 font-weight: 500;
 border-top-right-radius: 10px;
 border-top-left-radius: 10px;
 border-bottom-right-radius: 10px;
 border-bottom-left-radius: 10px;
 &:first-child {
   padding-top: 0.8em;
 }
`;

const ListItem = styled("li")`
 list-style: none;
 margin-bottom: 0.8em;
 padding-left: 15px;
 padding-right: 62px;
 padding-top:5px;
 padding-bottom: 5px;
 &:hover {
   background: #efefef;
   color: black;
   font-size: 1rem;
 }
`;