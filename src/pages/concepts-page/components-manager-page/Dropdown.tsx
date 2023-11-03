import React, { ReactElement } from 'react';

interface DropdownProps {
  options: string[];
  name: string;
  selected: number;
  onSelectedChange: (selected: number) => void;
}

const Dropdown = ({
  options,
  name,
  selected,
  onSelectedChange,
}: DropdownProps): ReactElement => {
  const optionsList = options.map((option, index) => {
    return (
      <option key={index} value={index} style={{ height: '40px' }}>
        {option}
      </option>
    );
  });
  console.log(options);

  return (
    <select
      name={name}
      value={selected}
      onChange={(e) => onSelectedChange(parseInt(e.target.value))}
      style={{
        width: '200px',
        height: '100%',
        color: 'white',
        alignSelf: 'top',
        padding: '0.5rem',
        backgroundColor: '#515151',
        borderRadius: '0.25rem',
        marginBottom: '1rem',
        marginLeft: '.5rem',
      }}
    >
      {optionsList}
    </select>
  );
};

export default Dropdown;
