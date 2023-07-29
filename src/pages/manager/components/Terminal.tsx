import React, { ReactElement, useState } from 'react';
import {
  TerminalItem,
  TerminalInput,
  TerminalContainer,
  TerminalHistoryContainer,
  SendButton,
  TerminalHeader,
} from './Terminal.styled';
import { SerialCommandTable } from './SerialCommandTable';

import { useStoreState, useStoreActions } from 'easy-peasy';
import styled from 'styled-components';

export function Terminal(): ReactElement {
  const [requestInput, setRequestInput] = useState<string>('');

  const serialApiRequests = useStoreState((store) => store.serialApiRequests);
  const serialApiResponses = useStoreState((store) => store.serialApiResponses);
  const updateSerialAPiDataThunk = useStoreActions(
    (store) => store.updateSerialAPiDataThunk,
  );

  const handleSendClick = () => {
    updateSerialAPiDataThunk(requestInput);
    setRequestInput('');
  };

  return (
    <CardColumn>
      <TerminalContainer>
        <TerminalHeader>Serial Terminal</TerminalHeader>
        <TerminalHistoryContainer key={Math.random()}>
          {serialApiRequests.map((allProps) => (
            <TerminalItem key={Math.random()}>
              {'> '}
              {...allProps}{' '}
            </TerminalItem>
          ))}
          {serialApiResponses.map((props) => (
            <TerminalItem key={Math.random()}>
              {'> '}
              {...props}{' '}
            </TerminalItem>
          ))}
        </TerminalHistoryContainer>
        <InputAndButtonRow>
          <TerminalInput
            onChange={(e) => setRequestInput(e.target.value)}
            value={requestInput}
            onKeyUp={(e) => (e.key === 'Enter' ? handleSendClick() : '')}
          />
          <SendButton onClick={handleSendClick}>Send</SendButton>
        </InputAndButtonRow>
      </TerminalContainer>
    </CardColumn>
  );
}

const CardColumn = styled.div.attrs({
  className: `flex flex-row w-full`,
})``;
const InputAndButtonRow = styled.div.attrs({
  className: `flex flex-row `,
})``;
