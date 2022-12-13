import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import DumbellImage from '../assets/Dumbell.png';
import BooksImage from '../assets/Books.png';
import profileImage from '../assets/profile.png';
import { ROUTER_PATHS } from './router';
import {FaBars} from 'react-icons/fa'
import { useStoreActions, useStoreState } from 'easy-peasy';
import CM_Icon from '../assets/CM_icon.png';
import CPM_Icon from '../assets/CPM_icon.png';
import Crown_Icon from '../assets/Crown_icon.png';
import StM_Icon from '../assets/StM.png';
import tWPM_Icon from '../assets/tWPM.png';
import LockIconWhite from '../../src/pages/test/components/LockIconWhite';
import { ScoresComponent } from './scoresComponent';
import InfoIcon from '../../src/pages/test/components/InfoIcon';
import type { TrainingLevels } from '../../src/models/trainingLevels';






const Navbar = (): ReactElement => {
  const history = useHistory();

const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
const setIsDisplayingIntroductionModal = useStoreActions((store : any) => store.setIsDisplayingIntroductionModal);
const setTrainingLevel = useStoreActions((store : any) => store.setTrainingLevel);
const maxWPM = useStoreState((store) => (parseInt(Math.max.apply(Math, Object.values(store.fastestRecordedWordsPerMinute))?.toFixed()) * 5) > 200);


  function TrainingPageFunction (level : TrainingLevels, allowOnClick : boolean){
    if(allowOnClick){
    if(level == 'CPM'){
      const payload : any [] = []
      payload.push('ALPHABET');
    sessionStorage.removeItem("tempTestDeIncrement");
    setTrainingLevel('CPM')
    beginTraining(payload);
    if(!history.location.pathname.endsWith(ROUTER_PATHS.home)){
      history.push(ROUTER_PATHS.home);
    }
  }
  else if(level == 'CHM'  ){
    const payload : any [] = []
    payload.push('LEXICAL');
    sessionStorage.removeItem("tempTestDeIncrement");
    setTrainingLevel('CHM')
    beginTraining(payload);
    if(!history.location.pathname.endsWith(ROUTER_PATHS.home)){
      history.push(ROUTER_PATHS.home);
    }
  }
    }
  }


  return (
    <NavI>
    <NavbarContainer>
    <LogoLink href='#/' aria-current="page" >
        <NavLogo onClick={()=>TrainingPageFunction('CPM', true)}>dot i/o</NavLogo>
        </LogoLink>
         <MobileIcon>
          <FaBars/>
        </MobileIcon>
        <NavMenu>
        <NavMenuLink aria-current="page">
        <div className='text-white font-mono'>CPM</div>
        <NavLinksImage open = {true} src={CPM_Icon} alt=""  onClick={()=>TrainingPageFunction('CPM', true)}/>
        </NavMenuLink>
        <NavMenuLink aria-current="page">        
        <div className='text-white font-mono'>{maxWPM ? 'ChM' : <LockIconStyle><LockIconWhite/></LockIconStyle>}</div>
        <NavLinksImage open = {maxWPM} src={BooksImage} alt="" onClick={()=>TrainingPageFunction('CHM', maxWPM)}/>
        </NavMenuLink>
        <NavMenuLink aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>        
        <NavLinksImage open = {false} src={DumbellImage} alt=""/>
        </NavMenuLink>
        <NavMenuLink aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>        
        <NavLinksImage open = {false} src={StM_Icon} alt="" />
        </NavMenuLink>
        <NavMenuLink  aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>        
        <NavLinksImage open = {false} src={tWPM_Icon} alt="" />
        </NavMenuLink>
        <NavMenuLink aria-current="page">
        <LockIconStyle>
        <LockIconWhite/>        
        </LockIconStyle>
        <NavLinksImage open = {false} src={CM_Icon} alt="" />
        </NavMenuLink>
        </NavMenu>
        <ScoresComponent/>
        <NavBtn>
        <NavMenuLink aria-current="page">
        <NavLinksImage open = {false} src={Crown_Icon} alt="" />
        </NavMenuLink>
          <NavBtnLink href='#/manager'>Connect</NavBtnLink>
          <NavMenuLink aria-current="page" href='#/dashboard'>
        <NavLinksImage open = {true} src={profileImage} alt="" />
        </NavMenuLink>
        </NavBtn>
        <button onClick={() => setIsDisplayingIntroductionModal(true)}>
        <InfoIcon/>
        </button>
        
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
padding-top: 10px;
top: 0;
z-index: 10;

@media screen and (max-width: 1000px) {
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
justify-self: flex-start;
cursor:pointer;
font-size: 2rem;
display: flex;
font-family: monospace;
`;

const MobileIcon = styled.div `
display: none;

@media screen and (max-width: 1000px) {
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
margin-left: 150px;

@media screen and (max-width: 1000px) {
  display: none;
}
`;

const NavLinksImage = styled.img <{ open: boolean }> ` 
color: #fff;
display: flex;
align-items: center;
${p => (p.open == false ? [{opacity: .5}, {cursor: 'none'}] : '')}
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

const NavLinksImageTransparant = styled.img `
color: #fff;
display: flex;
opacity: .5;
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


const NavBtn = styled.a `
display: flex;
align-items: center;
@media screen and (max-width: 1000px) {
  display: none;
}
`;

const NavBtnLink = styled.a `
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