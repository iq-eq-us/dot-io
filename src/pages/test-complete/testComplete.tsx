import React, { ReactElement, useEffect } from 'react';
import { useStoreState, useStoreActions } from '../../store/store';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { TestControlRow } from './components/testControlsRow';
import {FaBars} from 'react-icons/fa'
import { TestStatsCard } from './components/testStatsCard';
import { useContrast } from '../../hooks/useContrast';

import {
    ManagerPageContainer,
    Table,
    ChordContainer,
    PageContainer,
    TopSectionContainer
    
    
  } from '../test-complete/testComplete.styled';
/**
 * This is the main training page.
 * It will adapt its content depending on which training scenario is currently active in the trainingStore.
 * Be sure to check out the contents of the trainingStore to understand the application logic.
 */


function TestCompletePage(): ReactElement {
    const contrast = useContrast();


  useEffect(() => {
    
  }, []); // <-- dependency array
  return (
    <React.Fragment>
    <ManagerPageContainer>
    <TestStatsCard/>
     <TestControlRow/>
     </ManagerPageContainer>
     </React.Fragment>

  );
}

export default TestCompletePage;

