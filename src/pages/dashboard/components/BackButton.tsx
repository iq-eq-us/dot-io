import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTER_PATHS } from '../../../components/router';
import ChevronLeftIcon from '../../test/components/ChevronLeftIcon';

function BackButton(): ReactElement {
  const history = useHistory();

  return (
    <div
      className="font-semibold flex flex-row text-white min-w-[200px] hover:underline cursor-pointer mx-6 my-6 items-center"
      onClick={() => {
        history.push(ROUTER_PATHS.home);
      }}
    >
      <ChevronLeftIcon />
      <span className="pb-1">Back to Dashboard</span>
    </div>
  );
}

export default BackButton;
