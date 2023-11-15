import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from '../../store/store.js';
import { ManagerTier } from './manager-tier/ManagerTier.jsx';
import { DailyTrainingTier } from './daily-training-tier/DailyTrainingTier.jsx';
import { ItemsContainer, PageContainer } from './ConceptsPage.styled';
import { CustomTrainingTier } from './custom-training-tier/CustomTrainingTier.jsx';

const ConceptsPage = () => {
  const loadedFromStorage = useStoreState((state) => state.loadedFromStorage);

  const fetchUserData = useStoreActions((actions) => actions.fetchUserData);

  const [currentTier, setCurrentTier] = useState(0);

  useEffect(() => {
    if (!loadedFromStorage) {
      fetchUserData();
    }
  }, [loadedFromStorage]);

  const viewCurrentTier = () => {
    if (currentTier == 0) {
      return <DailyTrainingTier setCurrentTier={setCurrentTier} />;
    } else if (currentTier == 1) {
      return <CustomTrainingTier setCurrentTier={setCurrentTier} />;
    } else {
      return <ManagerTier />;
    }
  };

  return (
    <>
      <ItemsContainer>
        <button
          {...(currentTier == 0
            ? { className: ' text-white m-2 font-mono' }
            : { className: ' text-neutral-400 m-2 font-mono' })}
          onClick={() => [setCurrentTier(0)]}
        >
          Daily
        </button>
        <div>/</div>
        <button
          {...(currentTier == 1
            ? { className: ' text-white m-2 font-mono' }
            : { className: ' text-neutral-400 m-2 font-mono' })}
          onClick={() => [setCurrentTier(1)]}
        >
          Custom
        </button>
        <div>/</div>
        <button
          {...(currentTier == 2
            ? { className: ' text-white m-2 font-mono' }
            : { className: ' text-neutral-400 m-2 font-mono' })}
          onClick={() => [setCurrentTier(2)]}
        >
          Manager
        </button>
      </ItemsContainer>
      {loadedFromStorage ? (
        <PageContainer>{viewCurrentTier()}</PageContainer>
      ) : (
        <PageContainer>Loading...</PageContainer>
      )}
    </>
  );
};

export default ConceptsPage;
