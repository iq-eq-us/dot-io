import styled from 'styled-components';
import React, { ReactElement, useState } from 'react';
import { useStoreState, useStoreActions } from '../../store/store';
import usePopover from '../../hooks/usePopover';

export let pickerLite = false;
export let pickerV1 = false;
export let pickerNone = false;

const options = ['None', 'CharaChorder Lite', 'CharaChorder One'];

const triggerResize = () => {
  // This is done to make sure that the popover elements are in the correct position
  // The only time their position is recalculated is on scroll or resize
  // So this needs to be triggered manually
  window.dispatchEvent(new Event('resize'));
};

function DropDown(): ReactElement {
  const beginTraining = useStoreActions((store) => store.beginTrainingMode);

  const currentTrainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );

  const wordTestNumber = useStoreState((store) => store.wordTestNumber);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggling = () => setIsOpen(!isOpen);
  const { parentProps: selector, Popper: selectorProper } = usePopover(
    'This allows you to switch your training device.',
  );
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const payload = [];
  payload.push(currentTrainingScenario);
  payload.push(wordTestNumber);

  function startTrainingOver(val) {
    sessionStorage.removeItem('tempTestDeIncrement'); //remove session variable
    beginTraining(payload); // restart training
  }
  function returnElement(val: any) {
    if (val == 'CharaChorder Lite') {
      pickerLite = true;
      pickerV1 = false;
      pickerNone = true;
    } else if (val == 'CharaChorder One' || val == null) {
      pickerV1 = true;
      pickerLite = false;
      pickerNone = true;
    } else if (val == 'None') {
      pickerNone = false;
      pickerV1 = false;
      pickerLite = false;
    }
    currentTrainingScenario != null ? startTrainingOver(payload) : '';
    triggerResize();
  }

  const onOptionClicked = (value: any) => () => {
    setSelectedOption(value);
    returnElement(value);
    setIsOpen(false);
    currentTrainingScenario != null ? startTrainingOver(payload) : '';
    triggerResize();
  };

  React.useEffect(() => {
    pickerLite = false;
    pickerV1 = true;
    currentTrainingScenario != null ? startTrainingOver(payload) : '';
    triggerResize();
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (!isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

  return (
    <React.Fragment>
      {selectorProper}
      {}

      <Main
        className="flex text-sm font-bold mb-1 flex-row gap-2 items-center"
        ref={ref}
      >
        <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            {selectedOption || 'Show Device'}
          </DropDownHeader>

          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {options.map((option) => (
                  <ListItem
                    onClick={onOptionClicked(option)}
                    key={Math.random()}
                  >
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
export default DropDown;

const Main = styled('div')`
  font-family: sans-serif;
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  top: 90%;
  left: 100%;
  animation: blinker 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
  color: white;
`;

const DropDownContainer = styled('a')`
  width: 15.5em;
  margin-left: auto;
  margin-right: auto;
  right: 0;
  color: white;
  position: absolute;
`;
const Arrow = styled('div')`
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  position: relative;
  top: -11px;
  right: -160px;
  width: 10px;
  height: 10px;
  transform: rotate(225deg) translateY(25%);
  transform-origin: right;
`;

const DropDownHeader = styled('div')`
  padding: 0.6em 1.7em 0em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  width: 100%;
  font-size: 1rem;
  color: #FFFFF;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
`;

const DropDownListContainer = styled('div')``;

const DropDownList = styled('ul')`
  padding: 0.4em 0em 0em 0em;
  margin: 0;
  position: relative;
  background: white;
  width: 100%;
  float: left;
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

const ListItem = styled('li')`
  list-style: none;
  margin-bottom: 0.8em;
  padding-left: 15px;
  width: 100%;
  padding-right: 62px;
  color: black;
  &:hover {
    background: grey;
    color: black;
    font-size: 1rem;
  }
`;
