import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from './EditIcon';

const EditFlashcard = () => {
  const history = useHistory();
  const handleOnClick = () => history.push('/concepts-mastered');

  return (
    <div>
      <button type="button" onClick={handleOnClick}>
        <EditIcon />
      </button>
    </div>
  );
};

export default EditFlashcard;
