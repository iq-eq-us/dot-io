import React, { ReactElement, useState } from 'react';
import Dropdown from 'react-dropdown';
import CMradialGraph from './CMradialGraph';
import styled from 'styled-components';
import 'react-dropdown/style.css';
import { CMEbbinghausGraph } from './CMEbbinhausGraph';
import { Fade } from 'react-bootstrap';
import { useStoreState } from '../../../store/store';
import CMdashboardTable from './CMDashboardTable';
import FadeIn from './FadeIn';
// import { flashCardStoreActions } from 'src/store/flashCardStore'

export function CMdashboardAnalytics(): ReactElement {
  const tags = useStoreState((state) => state.tags);
  const flashcard = useStoreState((state) => state.flashCards);
  const percentageCompleted = useStoreState(
    (state) => state.percentageCompleted,
  );

  const components = Object.keys(tags).map((tag) => {
    return { name: tag, progress: percentageCompleted(tag) * 100 };
  });

  const [show, setShow] = useState(false);

  // component to show is described by the index of the dropdown
  const [componentToShow, setComponentToShow] = useState(0);
  const [componentName, setComponentName] = useState('');

  const updateFlashcardName = (e) => {
    // e is the event object, it has value = the name of the component

    // update the index of the component to show
    components.forEach((component, index) => {
      if (component.name === e.value) {
        setComponentToShow(index);
        setComponentName(component.name);
      }
    });

    setShow(true);
  };

  const options = [];
  components.forEach((component) => {
    options.push(component.name);
  });

  const currentProgress = components[componentToShow].progress;

  return (
    <FadeIn className="w-full" transitionDuration={1000} delay={40}>
      <div className="h-96 w-[555px] pl-1 pr-2 text-center">
        <CMdashboardTable />
      </div>

      <div className="text-[15px] font-semibold	font-mono flex flex-col pr-2 ">
        <div className="">
          <p className="text-[22px] mb-3">Select flashcard tag... </p>

          <Dropdown
            options={options}
            onChange={updateFlashcardName}
            className="text-center"
          />
        </div>

        <div className="min-h-300 pr-2">
          {show ? (
            <div className="">
              <CMradialGraph
                name={options[componentToShow].name}
                progress={currentProgress}
              />
            </div>
          ) : null}
          {show ? (
            <div className="">
              <CMEbbinghausGraph tag={componentName} />
            </div>
          ) : null}
        </div>
      </div>
    </FadeIn>
  );
}

// const Dropdown = styled.a`
//   border: 1px solid;
//   min-height: 800px;
//   min-width: 700px;
// `;
