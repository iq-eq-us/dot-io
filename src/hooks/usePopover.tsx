import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

export default function usePopover(text: string): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentProps: { onMouseOver: () => void; onMouseOut: () => void; ref: any };
  Popper: JSX.Element;
} {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const parentElementProps = {
    onMouseOver: () => setIsShowing(true),
    onMouseOut: () => setIsShowing(false),
    ref: setReferenceElement,
  };
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement, padding: 6 } },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  return {
    parentProps: parentElementProps,
    Popper: (
      <PopperContainer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={setPopperElement as any}
        style={styles.popper}
        isOpen={isShowing || false}
        {...attributes.popper}
      >
        {text}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Arrow ref={setArrowElement as any} style={styles.arrow} />
      </PopperContainer>
    ),
  };
}

const Arrow = styled.div.attrs({
  className: `arrow z-10 absolute -top-1`,
})``;

interface Props {
  isOpen?: boolean;
}

const PopperContainer = styled.div.attrs<Props>({
  className: `z-10 relative text-gray-800 pointer-events-none font-normal text-base normal-case`,
})<Props>`
  ${(props) => (!props.isOpen ? 'opacity: 0;' : 'opacity: 100;')}
  transition: opacity 0.1s;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: white;
  padding: 10px 20px;
  text-align: center;
  max-width: 400px;

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;

    &:after {
      content: ' ';
      position: absolute;
      top: 0px; // we account for the PopperContainer padding
      left: 0;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background-color: white;
      box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement^='top'] > .arrow {
    bottom: -4px;
    top: unset;
    :after {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
  }
`;
