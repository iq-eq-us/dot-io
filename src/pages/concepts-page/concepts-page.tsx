import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConceptsTrainingPage from './concepts-training-page';
import ConceptsManagerPage from './concepts-manager-page';
import { useStoreState, useStoreActions } from '../../store/store.js';
import { PageContainer } from './concepts-training-page.styled';

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
      return <ConceptsTrainingPage />;
    } else if (currentTier == 1) {
      return <ConceptsTrainingPage />;
    } else {
      return <ConceptsManagerPage />;
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
        <>{viewCurrentTier()}</>
      ) : (
        <PageContainer>Loading...</PageContainer>
      )}
    </>
  );
};

export default ConceptsPage;

const ItemsContainer = styled.div`
  height: 50px;
  display: flex;
  color: white;
  position: relative;
  flex-direction: row;
  padding: '1rem';
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #222424;
`;
