import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from './EditIcon';

const EditFlashcard = () => {
  const history = useHistory();
  const handleOnClick = () => {
    console.log('ifnndi');
    history.push('/concepts-mastered');
  };

  return (
    <div className="p-2 text-white flex items-center rounded mb-4 ml-6 hover:text-gray-400">
      <button type="button" onClick={handleOnClick}>
        <EditIcon />
      </button>
    </div>
  );
};

export default EditFlashcard;
