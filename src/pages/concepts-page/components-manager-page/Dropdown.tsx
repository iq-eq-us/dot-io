import React, { ReactElement } from 'react';

interface DropdownProps {
  options: string[];
  name: string;
  selected: string;
  onSelectedChange: (selected: string) => void;
}

const Dropdown = ({
  options,
  name,
  selected,
  onSelectedChange,
}: DropdownProps): ReactElement => {
  const optionsList = options.map((option, index) => {
    return (
      <option key={index} value={option} style={{ height: '40px' }}>
        {option}
      </option>
    );
  });

  return (
    <select
      name={name}
      value={selected}
      onChange={(e) => onSelectedChange(e.target.value)}
      style={{
        width: '200px',
        height: '100%',
        color: 'white',
        alignSelf: 'center',
        padding: '0.5rem',
        backgroundColor: '#515151',
        borderRadius: '0.25rem',
        marginBottom: '1rem',
        marginLeft: '.5rem',
        justifySelf: 'center',
        marginRight: '1rem',
        marginTop: '.5rem',
      }}
    >
      {optionsList}
    </select>
  );
};

export default Dropdown;
