import React, { useState, Dispatch, SetStateAction } from 'react';
import { useStoreState } from '../../../store/store';

interface CustomDropDownProps {
  setCustomTag: Dispatch<SetStateAction<string>>;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({ setCustomTag }) => {
  const tags = useStoreState((state) => state.tags) || {};
  const tagNames = Object.keys(tags);

  const [activeElementType, setActiveElementType] = useState('dropdown');
  const [customTag, setCustomTagLocal] = useState('');

  const dropDownChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (selectedValue === 'custom') {
      setActiveElementType('input');
    } else {
      setActiveElementType('dropdown');
      setCustomTagLocal(''); // Reset custom tag when selecting a predefined tag
    }
  };

  const dropDownComp = () => (
    <select onChange={dropDownChanged}>
      {tagNames.map((tagName) => (
        <option key={tagName} value={tagName}>
          {tagName}
        </option>
      ))}
      <option value="custom">New Tag?</option>
    </select>
  );

  const inputFieldComp = () => (
    <input
      type="text"
      value={customTag}
      onChange={(e) => {
        setCustomTagLocal(e.target.value);
        setCustomTag(e.target.value);
      }}
    />
  );

  return (
    <div>
      {activeElementType === 'dropdown' ? dropDownComp() : inputFieldComp()}
    </div>
  );
};

export default CustomDropDown;
