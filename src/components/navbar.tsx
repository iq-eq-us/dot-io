import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import DumbellImage from '../assets/Dumbell.png';
import BooksImage from '../assets/Books.png';
import profileImage from '../assets/profile.png';
import { ROUTER_PATHS } from './router';
import { FaBars } from 'react-icons/fa';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CM_Icon from '../assets/CM_icon.png';
import CPM_Icon from '../assets/CPM_icon.png';
import Crown_Icon from '../assets/Crown_icon.png';
import StM_Icon from '../assets/StM.png';
import tWPM_Icon from '../assets/tWPM.png';
import analytic_DashIcon from '../assets/AnalyticalDashboard.png';
import LockIconWhite from '../../src/pages/test/components/LockIconWhite';
import ConstructionIconWhite from '../../src/pages/test/components/ConstructionIconWhite';
import { ScoresComponent } from './scoresComponent';
import InfoIcon from '../../src/pages/test/components/InfoIcon';
import type { TrainingLevels } from '../../src/models/trainingLevels';
import Circle from './CircleHighlight';
import AnalyticalDashboardButton from '../../src/pages/test/components/AnalyticalDashboardButton';
import HamburgerMenu from './hamburgerMenu';

const Navbar = (): ReactElement => {
  const history = useHistory();

  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  const setIsDisplayingIntroductionModal = useStoreActions(
    (store: any) => store.setIsDisplayingIntroductionModal,
  );
  const setTrainingLevel = useStoreActions(
    (store: any) => store.setTrainingLevel,
  );
  const trainingLevel = useStoreState((store: any) => store.trainingLevel);
  const setModuleNumber = useStoreActions(
    (store: any) => store.setModuleNumber,
  );
  const setPasswordModuleModalToggle = useStoreActions(
    (store: any) => store.setPasswordModuleModalToggle,
  );
  const passwordModuleModalToggle = useStoreActions(
    (store: any) => store.passwordModuleModalToggle,
  );
  const chmTierPasswordBypass = useStoreState(
    (store: any) => store.chmTierPasswordBypass,
  );

  /* eslint-disable */
  const maxWPM = useStoreState(
    (store) =>
      parseInt(
        Math.max
          .apply(Math, Object.values(store.fastestRecordedWordsPerMinute))
          ?.toFixed(),
      ) *
        5 >
      200,
  );
  /* eslint-enable */
  const stable = true;

  function TrainingPageFunction(level: TrainingLevels, allowOnClick: boolean) {
    if (allowOnClick || chmTierPasswordBypass) {
      if (level == 'CPM') {
        setModuleNumber(1);
        const payload: any[] = [];
        payload.push('ALPHABET');
        sessionStorage.removeItem('tempTestDeIncrement');
        setTrainingLevel('CPM');
        beginTraining(payload);
        if (!history.location.pathname.endsWith(ROUTER_PATHS.home)) {
          history.push(ROUTER_PATHS.home);
        }
      } else if (level == 'CHM') {
        setModuleNumber(1);
        const payload: any[] = [];
        payload.push('LEXICAL');
        sessionStorage.removeItem('tempTestDeIncrement');
        setTrainingLevel('CHM');
        beginTraining(payload);
        if (!history.location.pathname.endsWith(ROUTER_PATHS.home)) {
          history.push(ROUTER_PATHS.home);
        }
      } else if (level == 'StM') {
        setModuleNumber(1);
        const payload: any[] = [];
        payload.push('LEXICALSENTENCES');
        sessionStorage.removeItem('tempTestDeIncrement');
        setTrainingLevel('StM');
        beginTraining(payload);
        if (!history.location.pathname.endsWith(ROUTER_PATHS.home)) {
          history.push(ROUTER_PATHS.home);
        }
      }
    }
  }
  function triggerPasswordModal() {
    if (maxWPM == false && !chmTierPasswordBypass) {
      setPasswordModuleModalToggle(!passwordModuleModalToggle);
    }
  }
  return (
    <NavI>
      <NavbarContainer>
        <LogoLink href="#/" aria-current="page">
          <NavLogo onClick={() => TrainingPageFunction('CPM', true)}>
            dot i/o
          </NavLogo>
        </LogoLink>
        <MobileIcon>
          <HamburgerMenu />
        </MobileIcon>
        <NavMenu>
          <NavMenuLink aria-current="page">
            {trainingLevel == 'CPM' ? <Circle /> : ''}
            <div className="text-white font-mono">CPM</div>
            <NavLinksImage
              open={true}
              src={CPM_Icon}
              alt=""
              onClick={() => TrainingPageFunction('CPM', true)}
            />
          </NavMenuLink>
          <NavMenuLink
            aria-current="page"
            onClick={() => triggerPasswordModal()}
          >
            {trainingLevel == 'CHM' ? <Circle /> : ''}
            <div className="text-white font-mono">
              {maxWPM || chmTierPasswordBypass ? (
                'ChM'
              ) : (
                <LockIconStyle>
                  <LockIconWhite />
                </LockIconStyle>
              )}
            </div>
            <NavLinksImage
              open={chmTierPasswordBypass || maxWPM}
              src={BooksImage}
              alt=""
              onClick={() => TrainingPageFunction('CHM', maxWPM)}
            />
          </NavMenuLink>
          <NavMenuLink aria-current="page">
            {trainingLevel == 'sWPM' ? <Circle /> : ''}
            <ConstructionIconStyle>
              <ConstructionIconWhite />
            </ConstructionIconStyle>
            <NavLinksImage open={false} src={DumbellImage} alt="" />
          </NavMenuLink>
          <NavMenuLink aria-current="page">
            {trainingLevel == 'StM' ? <Circle /> : ''}
            <div className="text-white font-mono"></div>
            <ConstructionIconStyle>
              <ConstructionIconWhite />
            </ConstructionIconStyle>
            <NavLinksImage
              open={false}
              src={StM_Icon}
              alt=""
              // onClick={() => TrainingPageFunction('StM', maxWPM)}
            />
          </NavMenuLink>
          <NavMenuLink aria-current="page">
            <ConstructionIconStyle>
              <ConstructionIconWhite />
            </ConstructionIconStyle>
            <NavLinksImage open={false} src={tWPM_Icon} alt="" />
          </NavMenuLink>
          <NavMenuLink aria-current="page">
            <ConstructionIconStyle>
              <ConstructionIconWhite />
            </ConstructionIconStyle>
            <NavLinksImage open={false} src={CM_Icon} alt="" />
          </NavMenuLink>
        </NavMenu>
        <ScoresComponent />

        <NavMenuLink style={{ paddingTop: '10px' }}>
          <NavLinksBtnImage
            href="#/analyticalDashboard"
            onClick={() => setTrainingLevel('')}
          >
            <img
              src={analytic_DashIcon}
              style={{ width: '40px', height: '40px' }}
            ></img>
          </NavLinksBtnImage>
        </NavMenuLink>

        <NavBtn>
          <NavMenuLink aria-current="page">
            <NavLinksImage open={false} src={Crown_Icon} alt="" />
          </NavMenuLink>
          <NavBtnLink href="#/manager" onClick={() => setTrainingLevel('')}>
            <div className="text-white">Manager</div>
          </NavBtnLink>
          <button
            className="hover:bg-[#333] rounded"
            onClick={() => setIsDisplayingIntroductionModal(true)}
          >
            <InfoIcon />
          </button>
        </NavBtn>
      </NavbarContainer>
    </NavI>
  );
};

export default Navbar;

const LockIconStyle = styled.div.attrs({
  className: `items-center justify-center pl-6`,
})``;

const ConstructionIconStyle = styled.div.attrs({
  className: `border-2 border-transparent rounded-full items-center justify-center pl-6`,
})``;

const LogoLink = styled.a.attrs({
  className: ` py-2 rounded-md`,
})``;

const NavMenuLink = styled.a.attrs({
  className: `py-1 items-center relative rounded-md hover:bg-[#333] align-center`,
})``;

const NavI = styled.nav`
  background-color: #222424;
  height: 80px;
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

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 63px;
  z-index: 1;
  width: 100%;
  padding 0 24px;
  max-width: 1100px;
`;

const NavLogo = styled.div`
  color: #fff;
  height: 60px;
  width: 124px;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  font-family: monospace;
`;

const MobileIcon = styled.div`
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

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-left: 150px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const NavLinksImage = styled.img<{ open: boolean }>`
  color: #fff;
  display: relative;
  align-items: center;
  ${(p) => (p.open == false ? [{ opacity: 0.5 }, { cursor: 'none' }] : '')}
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  color: #fff;
  height: 40px;
  width: 75px;
  justify-self: flex-start;
  font-size: 1.5rem;

  &.active {
    border-bottom: 3px solid #01bf71;
  }
`;

const NavLinksBtnImage = styled.a`
  align-items: center;
  color: #fff;
  display: relative;
  cursor: pointer;
  color: #fff;
  justify-content: center;
  justify-self: flex-start;
`;

const NavLinksImageTransparent = styled.img`
  color: #fff;
  display: flex;
  opacity: 0.5;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  color: #fff;
  height: 40px;
  width: 75px;
  justify-self: flex-start;
  font-size: 1.5rem;

  &.active {
    border-bottom: 3px solid #01bf71;
  }
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const NavBtnLink = styled.a`
  border-radius: 50px;
  white-space: nowrap;
  padding: 10px 22px;
  color: #222424;
  font-size: 16px;
  outline: none;
  border: 1px solid white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    color: #ffff;
    background: #01a049;
    transition: 0.3s ease out;
  }
`;
