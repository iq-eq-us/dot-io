import React, { ReactElement } from 'react';
import { ConceptsMasteredColumn } from './components-training-page/ConceptsMasteredColumns';
import { PageContainer } from './concepts-training-page.styled';

interface ConceptsTrainingPageProps {
  setTier: (tier: number) => void;
}

function ConceptsTrainingPage({
  setTier,
}: ConceptsTrainingPageProps): ReactElement {
  return (
    <PageContainer>
      <ConceptsMasteredColumn setTier={setTier} />
    </PageContainer>
  );
}

export default ConceptsTrainingPage;
