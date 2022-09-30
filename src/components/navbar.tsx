import React, { ReactElement } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CharachorderLogoImage from '../assets/cc_logo_transparent.png';
import IQEQLogoImage from '../assets/iq-eq_logo_copy.png'; 
import DumbellImage from '../assets/Dumbell.png';
import BooksImage from '../assets/Books.png';
import ThemesImage from '../assets/themes.png';
import SettingsImage from '../assets/settings.png';
import StatsImage from '../assets/lineGraph.png';
import LeaderboardsImage from '../assets/leaderBoard.png';
import profileImage from '../assets/profile.png';
import Sample_user_Icon from '../assets/UserProfile.png'
import { FaTimes } from 'react-icons/fa';
import Weight from '../assets/weight_nav_icon_transparent.png';
import { ROUTER_PATHS } from './router';
import {FaBars} from 'react-icons/fa'
import { useStoreActions, useStoreState } from 'easy-peasy';
import aWPM_Icon from '../assets/aWPM_icon.png';
import ChM_Icon from '../assets/ChM_icon.png';
import CM_Icon from '../assets/CM_icon.png';
import CPM_Icon from '../assets/CPM_icon.png';
import Crown_Icon from '../assets/Crown_icon.png';
import StM_Icon from '../assets/StM.png';
import tWPM_Icon from '../assets/tWPM.png';
import LockIconWhite from '../../src/pages/test/components/LockIconWhite';
import { ConnectButton } from '../../src/pages/manager/components/connect';







const Navbar = (): ReactElement => {
  const history = useHistory();

const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
const isThisAnEnabledDevice = useStoreState((store: any) => store.isUsingChordingEnabledDevice);

  const payload : any [] = []
  payload.push('LEXICAL');
  payload.push(25);

  function TrainingPageFunction (){
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload);
    if(!history.location.pathname.endsWith(ROUTER_PATHS.home)){
      history.push(ROUTER_PATHS.home);
    }
  }

  return (
    <NavI>
    <NavbarContainer>
    <LogoLink href='#/' aria-current="page" >
        <NavLogo onClick={()=>TrainingPageFunction()}>dot i/o</NavLogo>
        </LogoLink>
    <MobileIcon>
          <FaBars/>
        </MobileIcon>
        <NavMenu>
        <NavMenuLink href='#/' aria-current="page">
        <div className='text-white'>CPM</div>
        <NavLinksImage src={CPM_Icon} alt=""  onClick={()=>TrainingPageFunction()}/>
        </NavMenuLink>
        <NavMenuLink href='#/' aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>
        <NavLinksImage src={BooksImage} alt="" />
        </NavMenuLink>
        <NavMenuLink href='#/' aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>        
        <NavLinksImage src={DumbellImage} alt=""/>
        </NavMenuLink>
        <NavMenuLink href='#/' aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>        
        <NavLinksImage src={StM_Icon} alt="" />
        </NavMenuLink>
        <NavMenuLink href='#/' aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>        
        <NavLinksImage src={tWPM_Icon} alt="" />
        </NavMenuLink>
        <NavMenuLink href='#/' aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>
        <NavLinksImage src={CM_Icon} alt="" />
        </NavMenuLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink>Connect</NavBtnLink>
          <NavMenuLink href='#/' aria-current="page">
        <NavLinksImage src={profileImage} alt="" />
        </NavMenuLink>
        </NavBtn>
        
    </NavbarContainer>
    </NavI>
  );
};

export default Navbar;

const LockIconStyle = styled.div.attrs({
  className: `items-center justify-center pl-6`,
})``;

const LogoLink = styled.a.attrs({
  className: ` py-2 rounded-md`,
})``;

const NavMenuLink = styled.a.attrs({
  className: `py-1 rounded-md hover:bg-[#333]`,
})``;

const NavI = styled.nav `
background-color: #181818;
height: 63px;
display: flex;
justify-content: center;
align-items: center;
font-size: 1rem;
position: sticky;
top: 0;
z-index: 10;

@media screen and (max-width: 960px) {
  transition: 0.8s all ease;
}
`;

const NavbarContainer = styled.div `
display: flex;
justify-content: space-between;
height: 60px;
z-index: 1;
width: 100%;
padding 0 24px;
max-width: 1100px;
`;

const NavLogo = styled.div `
color: #fff;
height: 60px;
width: 124px;
margin-left: 40px;

justify-self: flex-start;
cursor:pointer;
font-size: 2rem;
display: flex;
font-family: monospace;
`;

const MobileIcon = styled.div `
display: none;

@media screen and (max-width: 768px) {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 60%);
  font-size: 1.8rem;
  cursor: pointer;
  color: #fff;
}
`;

const NavMenu = styled.ul `
display: flex;
align-items: center;
list-style: none; 
text-align: center;

@media screen and (max-width: 768px) {
  display: none;
}
`;

const NavLinksImage = styled.img `
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
cursor: pointer;
color: #fff;
height: 40px;
width: 75px;
justify-self: flex-start;
font-size: 1.5rem;

&.active{
  border-bottom: 3px solid #01bf71;
}
`


const NavBtn = styled.nav `
display: flex;
align-items: center;
@media screen and (max-width: 768px) {
  display: none;
}
`;

const NavBtnLink = styled.div `
border-radius: 50px;
background: rgb(34 197 94);
white-space: nowrap;
padding: 10px 22px;
color: #181818;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

`