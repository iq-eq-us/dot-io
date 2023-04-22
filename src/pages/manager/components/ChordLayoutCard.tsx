import React, { ReactElement, useState } from 'react';
import {
     CardLayoutContainer, 
     KeyMapTextBox, 
     KeyMapPositionTextBox, 
     KeyMapInputIdentifiers,
     KeyMapValueTextBox
    } from './ChordLayoutColumn.styled';

import usePopover from '../../../hooks/usePopover';


export function ChordLayoutCard(
  props: any,
): ReactElement {

    const keyMap : string = props.keyMap;
    const keyMapPosition : string  = props.keyMapPosition; 
    const keyMapValue : string = props.keyMapValue;

  
  return (
    <CardLayoutContainer>
        <KeyMapInputIdentifiers>Key Map<KeyMapTextBox 
        placeholder={keyMap}
        />
        </KeyMapInputIdentifiers>
        <KeyMapInputIdentifiers>
        Key Map Position
        <KeyMapPositionTextBox 
        placeholder={keyMapPosition}
        />
        </KeyMapInputIdentifiers>
        <KeyMapInputIdentifiers>Key Map Value
        <KeyMapValueTextBox 
        placeholder={keyMapValue}
        />
        </KeyMapInputIdentifiers>
    </CardLayoutContainer>

  );
}
