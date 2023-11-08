import React, { ReactElement } from 'react';
import { ConceptsMasteredColumn } from './components-training-page/ConceptsMasteredColumns';
import { PageContainer } from './concepts-training-page.styled';

function ConceptsTrainingPage(): ReactElement {
  return (
    <PageContainer>
      <ConceptsMasteredColumn />
    </PageContainer>
  );
}

export default ConceptsTrainingPage;
