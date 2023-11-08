import { useEffect, useRef, useState } from 'react';
import React, { ReactElement } from 'react';
import LockIcon from '../../src/pages/dashboard/components/LockIcon';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { ROUTER_PATHS } from './router';
import type { TrainingLevels } from '../../src/models/trainingLevels';

export default function HamburgerMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
  const history = useHistory();

  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  /* eslint-disable */

  const setTrainingLevel = useStoreActions(
    (store: any) => store.setTrainingLevel,
  );
  const setModuleNumber = useStoreActions(
    (store: any) => store.setModuleNumber,
  );
  const chmTierPasswordBypass = useStoreState(
    (store: any) => store.chmTierPasswordBypass,
  );
  /* eslint-enable */

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
      } else if (level == 'CM') {
        setModuleNumber(1);
        const payload: any[] = [];
        payload.push('');
        sessionStorage.removeItem('tempTestDeIncrement');
        setTrainingLevel('CM');
        beginTraining(payload);
        if (!history.location.pathname.endsWith(ROUTER_PATHS.home)) {
          history.push(ROUTER_PATHS.home);
        }
      }
    }
  }

  return (
    <div className="flex items-center justify-between py-1">
      <nav>
        <section className="MOBILE-MENU flex rounded-md lg:hidden">
          <div
            className="HAMBURGER-ICON  space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
          </div>

          <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li
                className=" my-4 uppercase text-[#808080] hover:text-white flex"
                onClick={() => [
                  TrainingPageFunction('CPM', true),
                  setIsNavOpen(false),
                ]}
              >
                <a>CPM</a>
              </li>
              <li
                className="my-4 uppercase text-[#808080] hover:text-white flex"
                onClick={() => [
                  TrainingPageFunction('CHM', maxWPM),
                  setIsNavOpen(false),
                ]}
              >
                <a>CHM</a>
                {!(maxWPM || chmTierPasswordBypass) ? (
                  <React.Fragment>
                    <div className="pt-2">
                      <LockIcon />
                    </div>
                  </React.Fragment>
                ) : (
                  ''
                )}
              </li>
              <li className="my-4 uppercase text-[#808080] hover:text-white flex">
                <a>sWPM</a>
                <div className="pt-2">
                  <LockIcon />
                </div>
              </li>
              <li className=" my-4 uppercase text-[#808080] hover:text-white flex">
                <a>StM</a>
                <div className="pt-2">
                  <LockIcon />
                </div>
              </li>
              <li className=" my-4 uppercase text-[#808080] hover:text-white flex">
                <a>tWPM</a>
                <div className="pt-2">
                  <LockIcon />
                </div>
              </li>
              <li className=" my-4 uppercase text-[#808080] hover:text-white flex">
                <a href="#/manager" onClick={() => setIsNavOpen(false)}>
                  Manager
                </a>
              </li>
              <li className="my-4 uppercase text-[#808080] hover:text-white">
                <a href="#/dashboard" onClick={() => setIsNavOpen(false)}>
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        border-radius: 25px;
        border-color: white;
        border-style: solid;
        border-width: 2px;
        width: 50vh;
        height: 95vh;
        right: -20px;
        top: 0;
        background: #222424;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
