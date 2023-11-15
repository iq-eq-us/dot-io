import React, { ReactElement, useState } from 'react';
import Dropdown from 'react-dropdown';
import CMradialGraph from './CMradialGraph';
import styled from 'styled-components';
import 'react-dropdown/style.css';
import { CMEbbinghausGraph } from './CMEbbinhausGraph';
import FadeIn from 'react-fade-in';
import { Fade } from 'react-bootstrap';

export function CMdashboardAnalytics(): ReactElement {
  const components = [
    {
      name: 'tag 1',
      progress: 50,
    },
    {
      name: 'tag 2',
      progress: 75,
    },
    {
      name: 'tag 3',
      progress: 25,
    },
    {
      name: 'tag 4',
      progress: 100,
    },
  ];

  const [show, setShow] = useState(false);

  // component to show is described by the index of the dropdown
  const [componentToShow, setComponentToShow] = useState(0);

  const updateFlashcardName = (e) => {
    // e is the event object, it has value = the name of the component

    // update the index of the component to show
    components.forEach((component, index) => {
      if (component.name === e.value) {
        setComponentToShow(index);
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
      <div className="text-[15px] font-semibold	font-mono flex flex-col">
        <div className="">
          <p className="text-[22px] mb-3">Select flashcard tag... </p>

          <Dropdown
            options={options}
            onChange={updateFlashcardName}
            className="text-center"
          />
        </div>

        <div className="border min-h-300">
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
              <CMEbbinghausGraph />
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
