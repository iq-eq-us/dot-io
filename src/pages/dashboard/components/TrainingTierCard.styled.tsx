import styled from 'styled-components';

export const Parent = styled.div.attrs<CardBodyProps>((props) => ({
  className: `
    rounded-none overflow-hidden -mx-5 min-w-full
    sm:rounded-lg 
    lg:mx-4 lg:w-3/4 lg:min-w-0 
  ${props.areStatsOpen ? 'mb-6' : ''}`,
}))<CardBodyProps>`
  @media only screen and (max-width: 641px) {
    min-width: calc(100% + 2.5rem);
  }
`;

export const CardButton = styled.button.attrs({
  className: `flex flex-row items-center gap-1 mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded z-10 disabled:bg-gray-400 disabled:cursor-not-allowed`,
})``;

export const Row = styled.div.attrs({
  className: `flex flex-row mr-16`,
})``;

export const BodyText = styled.p.attrs({
  className: `leading-relaxed text-base`,
})``;

export const TierTitle = styled.h2.attrs({
  className: `text-xl text-gray-900 font-bold title-font mb-4`,
})``;

export const TierText = styled.h3.attrs({
  className: `tracking-widest text-indigo-500 text-sm font-semibold title-font`,
})``;

export const GreenIconContainer = styled.div.attrs({
  className: `h-10 w-10 rounded-full bg-green-200 top-4 right-4 text-green-400  flex items-center justify-center`,
})``;

export const GrayIconContainer = styled.div.attrs({
  className: `h-10 w-10 rounded-full bg-gray-200 top-4 right-4 text-gray-400 flex items-center justify-center`,
})``;

export const StatsButton = styled.div.attrs({
  className: `rounded-full bg-gray-200 p-2 hover:bg-gray-300 active:bg-gray-400`,
})``;

export const StatsButtonContainer = styled.div.attrs({
  className: `absolute bottom-4 right-16 cursor-pointer`,
})``;

export const ClearButtonContainer = styled.div.attrs({
  className: `absolute bottom-4 right-4 cursor-pointer`,
})``;

interface CardBodyProps {
  areStatsOpen?: boolean;
}
export const CardBody = styled.div.attrs<CardBodyProps>((props) => ({
  className: `rounded-none bg-white p-6 relative ${
    props.areStatsOpen ? 'rounded-none' : 'sm:rounded-b-lg'
  }
  sm:rounded-t-lg 
  `,
}))<CardBodyProps>``;

export const StatsBody = styled.tbody.attrs({
  className: `bg-white divide-y divide-gray-200`,
})``;

export const StatsHead = styled.thead.attrs({
  className: `bg-gray-50`,
})``;

export const StatsTable = styled.table.attrs({
  className: `min-w-full divide-y divide-gray-200`,
})``;

export const StatsTableContainer = styled.div.attrs({
  className: `shadow overflow-hidden border-b border-gray-200 sm:rounded-b-lg border-t-2 border-solid -mx-4 lg:-mx-0`,
})``;

export const StatsTableParent = styled.div.attrs<CardBodyProps>((props) => ({
  className: `align-middle inline-block rounded-t-none transition-all overflow-hidden overflow-y-scroll ${
    props.areStatsOpen ? 'max-h-[400px]' : 'max-h-0'
  }`,
}))<CardBodyProps>`
  min-width: calc(100% + 17px);
`;
