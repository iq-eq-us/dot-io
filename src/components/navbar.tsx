import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CharachorderLogoImage from '../assets/cc_logo_transparent.png';
import BackButton from '../pages/dashboard/components/BackButton';
import { ROUTER_PATHS } from './router';



const Navbar = (): ReactElement => {
  const history = useHistory();
  const needsBackButton = history.location.pathname.endsWith(
    ROUTER_PATHS.training,
  );

  return (
    <nav
      className={`bg-[#201F20] h-16 flex flex-row items-center justify-between pr-8 ${
        !needsBackButton && 'flex-row-reverse'
      } `}
    >
      {needsBackButton && <BackButton />}
      <Link href="#/" aria-current="page">
        <Logo src={CharachorderLogoImage} alt="" />
      </Link>
      
      
    </nav>
    
  );
};

export default Navbar;

const Logo = styled.img.attrs({
  className: `h-8 w-8 rounded-full`,
})``;

const Link = styled.a.attrs({
  className: `px-3 py-2 rounded-md hover:bg-[#333]`,
})``;

