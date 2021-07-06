import styled from 'styled-components';
import React, { ReactElement } from 'react';
import Row from '../../../components/Row';
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

const LOGO_SIZE = '54px';

const Logo = styled.img`
  height: ${LOGO_SIZE};
  width: ${LOGO_SIZE};
  margin-right: 32px;
`;

const CharachorderLogo = () => <Logo src={CharachorderLogoImage} />;

const CharachorderTitle = styled.h1`
  font-size: 3rem;
  line-height: 3.25rem;
  height: 3rem;
`;
