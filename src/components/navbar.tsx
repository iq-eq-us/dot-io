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



const Navbar = (): ReactElement => {
  const history = useHistory();

const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
const isThisAnEnabledDevice = useStoreState((store: any) => store.isUsingChordingEnabledDevice);

  const payload : any [] = []
  payload.push('LEXICAL');
  payload.push('10');

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
    <Link href='#/' aria-current="page" >
        <NavLogo src={IQEQLogoImage} alt="" onClick={()=>TrainingPageFunction()}/>
        </Link>
    <MobileIcon>
          <FaBars/>
        </MobileIcon>
        <NavMenu>
    <NavMenuLink href='#/manager' aria-current="page">
        <NavLinksImage src={BooksImage} alt="" />
        </NavMenuLink>
    <NavMenuLink href='#/' aria-current="page">
        <NavLinksImage src={DumbellImage} alt="" onClick={()=>TrainingPageFunction()}/>
        </NavMenuLink>
            <NavMenuLink href='#/dashboard' aria-current="page">
      <NavLinksImage src={Sample_user_Icon} alt="" />
        </NavMenuLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink style={{visibility: (isThisAnEnabledDevice == true ? '' : 'hidden'), disabled: (isThisAnEnabledDevice == true ? '' : 'true')}}> {isThisAnEnabledDevice == true ? console.log('Made it here in the navbar true '+ isThisAnEnabledDevice) : console.log('Made it here in the navbar false  '+ isThisAnEnabledDevice)}Connect</NavBtnLink>
        </NavBtn>
    </NavbarContainer>
    </NavI>
  );
};

export default Navbar;

const Logo = styled.img.attrs({
  className: `h-8 w-8 rounded-full`,
})``;

const Link = styled.a.attrs({
  className: `px-3 py-2 rounded-md hover:bg-[#333]`,
})``;

const NavMenuLink = styled.a.attrs({
  className: `py-1 rounded-md hover:bg-[#333]`,
})``;

const NavI = styled.nav `
background-color: #181818;
height: 60px;
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

const NavLogo = styled.img `
color: #fff;
height: 60px;
width: 80px;
justify-self: flex-start;
cursor:pointer;
font-size: 1.5rem;
display: flex;

text-decoration: none;
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
margin-right: -22px;

@media screen and (max-width: 768px) {
  display: none;
}
`;

const NavItem = styled.li `
height: 60px;
`
const NavLinks = styled.a `
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;

&.active{
  border-bottom: 3px solid #01bf71;
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
width: 70px;
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