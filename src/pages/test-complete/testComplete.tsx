import React, { ReactElement, useEffect } from 'react';
import { TestControlRow } from './components/testControlsRow';
import { TestStatsCard } from './components/testStatsCard';
import { TestCompleteGraph } from './components/testCompleteGraph';

import {
    ManagerPageContainer, 
    HorizontalRule
  } from '../test-complete/testComplete.styled';
/**
 * This is the main training page.
 * It will adapt its content depending on which training scenario is currently active in the trainingStore.
 * Be sure to check out the contents of the trainingStore to understand the application logic.
 */


function TestCompletePage(): ReactElement {

  return (
    <React.Fragment>
    <ManagerPageContainer>
    <TestStatsCard/>
    <HorizontalRule/>
    <TestCompleteGraph/>
     <TestControlRow/>
     </ManagerPageContainer>
     </React.Fragment>

  );
}

export default TestCompletePage;

