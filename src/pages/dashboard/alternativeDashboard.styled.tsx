import styled from 'styled-components';

export const Column = styled.div.attrs({
  className: `flex flex-col`,
})``;

export const TopSectionContainer = styled.div.attrs({
  className: `container px-5 py-24 mx-auto`,
})``;

export const HorizontalRule = styled.hr.attrs({
  className: `mx-16 border-gray-600 mb-16`,
})``;

export const ComingSoonText = styled.p.attrs({
  className: `lg:w-2/3 mx-auto leading-relaxed text-gray-50 px-4`,
})``;

export const ComingSoonTitle = styled.h1.attrs({
  className: `sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500`,
})``;

export const ComingSoonContainer = styled.div.attrs({
  className: `flex flex-col text-center w-full pb-20`,
})``;

export const DashboardPageContainer = styled.section.attrs({
  className: `text-gray-600 body-font min-h-screen bg-[#121212]`,
})``;
