import styled from 'styled-components';

const height = 'height: calc(100vh - 64px);';

interface PageContainerProps {
  contrast: string;
}

export const PageContainer = styled.div.attrs<PageContainerProps>({
  className: 'text-gray-600 body-font flex flex-row',
})<PageContainerProps>`
  background-color: ${(props) => props.contrast};
  ${height}
`;
