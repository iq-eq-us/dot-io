import styled from 'styled-components';

export const FullWidthFullHeightContainer = styled.div.attrs({
  className: 'relative h-full w-full',
})``;

export const DailyTrainingContainer = styled.div.attrs({
  className: 'flex flex-col align-center w-full',
})`
  height: calc(100vh - 191px);
`;

export const SmallScreenButtons = styled.div.attrs({
  className: 'flex flex-row justify-between w-full mb-4',
})``;

export const HelperContainer = styled.div.attrs({
  className: 'flex flex-row justify-center w-full mb-4 text-white font-mono',
})``;

export const ConceptsMasteredManagerPageContainer = styled.section.attrs({
  className: `text-white body-font bg-[#222424]`,
})``;

export const PageContainer = styled.section.attrs({
  className: `margin-left-auto margin-right-auto `,
})``;

export const Column = styled.div.attrs({
  className: `flex flex-col`,
})``;
