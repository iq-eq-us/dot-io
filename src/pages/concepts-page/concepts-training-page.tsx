import React, { ReactElement } from 'react';
import { ConceptsMasteredColumn } from './components-training-page/ConceptsMasteredColumns';
import { PageContainer } from './concepts-training-page.styled';

interface ConceptsTrainingPageProps {
  setCurrentTier: (tier: number) => void;
}

function ConceptsTrainingPage({
  setCurrentTier,
}: ConceptsTrainingPageProps): ReactElement {
  return (
    <PageContainer>
      <ConceptsMasteredColumn setCurrentTier={setCurrentTier} />
    </PageContainer>
  );
}

export default ConceptsTrainingPage;
