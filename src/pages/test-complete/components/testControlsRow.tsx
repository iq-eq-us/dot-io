import React, { ReactElement } from 'react';
import styled from 'styled-components';
import NextTestButton from '../../../../src/pages/test/components/NextTestButton';
import RefreshButton from '../../../../src/pages/test/components/RefreshButton';


export function TestControlRow(): ReactElement {


    return (
        <React.Fragment>
        <RowContainer>
            <ItemsContainer>
      <NextTestButton />
         </ItemsContainer>
      </RowContainer>    
       <TeirSelector>
       </TeirSelector>
       </React.Fragment>
      );
  }

  const TeirSelector = styled.div `
background-color: #181818;
height: 60px;
min-width: 100%;


`;
  const ItemsContainer = styled.div `
  height: 50px;
  display: flex;
  position: relative;
  flex-direction: row;
  padding: '1rem';  
  justify-content: center; 
  align-items: center; 
  `
  const RowContainer = styled.div `
background-color: #181818;
height: 60px;
display: flex;
justify-content: center;
align-items: center;
font-size: 1rem;
position: sticky;
top: 0;
z-index: 10;

@media screen and (max-width: 960px) {
  transition: 0.8s all ease;
}
`;