import React, { ReactElement } from 'react';
import styled from 'styled-components';
// import CCLogoImage from '../../../assets/cc_logo_transparent.png';
import CLLogoImage from '../../../assets/cl.png';

export function BrandingMaterial(): ReactElement {
  return (
    <BrandingContainer>
      {/* <Link href="https://www.charachorder.com/">
        <CCLogo src={CCLogoImage} alt="CC Logo" />
      </Link> */}
      {/* <Link href="https://www.codeauthority.com/">
        <CALogo
          src="https://www.codeauthority.com/images/ca-logo-9kb.png"
          alt="CA Logo"
        />
      </Link>
      <Link href="https://improving.com/">
        <ImprovingLogo
          src={'https://improving.com/images/improving-logo-white.png'}
          alt="CA Logo"
        />
      </Link> */}
      <Link href="https://codelaunch.com/">
        <CLLogo src={CLLogoImage} alt="CA Logo" />
      </Link>
    </BrandingContainer>
  );
}

const Link = styled.a.attrs({
  className: 'opacity-50 hover:opacity-75 active:opacity-100',
  target: '_blank',
  rel: 'noopener noreferrer',
})``;

// const CCLogo = styled.img.attrs({
//   className: `max-w-40 max-h-40 cursor-pointer`,
// })``;

// const CALogo = styled.img.attrs({
//   className: `w-40 h-full cursor-pointer`,
// })``;

// const ImprovingLogo = styled.img.attrs({
//   className: `w-40 h-full cursor-pointer`,
// })``;

const CLLogo = styled.img.attrs({
  className: `w-64 h-full cursor-pointer`,
})``;

const BrandingContainer = styled.div.attrs({
  className: `flex flex-col gap-y-8 lg:flex-row justify-around w-full items-center py-12 px-8 bg-[#222424]`,
})``;
