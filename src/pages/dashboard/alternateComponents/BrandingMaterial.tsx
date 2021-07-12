import React, { ReactElement } from 'react';
import styled from 'styled-components';

export function BrandingMaterial(): ReactElement {
  return (
    <BrandingContainer>
      <CCLogo src={CCLogo} alt="CA Logo" />
      <CALogo
        src="https://www.codeauthority.com/images/ca-logo-9kb.png"
        alt="CA Logo"
      />
      <ImprovingLogo
        src={'https://improving.com/images/improving-logo-white.png'}
        alt="CA Logo"
      />
      <CLLogo src={CLLogo} alt="CA Logo" />
    </BrandingContainer>
  );
}

const CCLogo = styled.img.attrs({
  className: `max-w-60 max-h-20 cursor-pointer`,
})``;

const CALogo = styled.img.attrs({
  className: `w-40 h-full cursor-pointer`,
})``;

const ImprovingLogo = styled.img.attrs({
  className: `w-60 cursor-pointer`,
})``;

const CLLogo = styled.img.attrs({
  className: `w-60 cursor-pointer`,
})``;

const BrandingContainer = styled.div.attrs({
  className: `flex flex-col gap-y-8 lg:flex-row justify-around w-full items-center py-12 px-8 bg-[#181818]`,
})``;
