import styled from 'styled-components';
import React, { ReactElement } from 'react';
import Row from '../../../components/row';
import CharachorderLogoImage from '../../../assets/charachorder_logo.jpg';

const DashboardHeader = (): ReactElement => {
  return (
    <DashboardHeaderRow>
      <CharachorderLogo />
      <CharachorderTitle> LaunchPad </CharachorderTitle>
    </DashboardHeaderRow>
  );
};

export default DashboardHeader;

const DashboardHeaderRow = styled(Row)`
  padding: 24px;
`;

const LOGO_SIZE = '72px';

const Logo = styled.img`
  height: ${LOGO_SIZE};
  width: ${LOGO_SIZE};
  margin-right: 32px;
`;

const CharachorderLogo = () => <Logo src={CharachorderLogoImage} />;

const CharachorderTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 3.5rem;
  height: 3rem;
  margin: 0px;
`;
