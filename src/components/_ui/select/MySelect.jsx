import React from 'react';

import selectArrow from 'assets/img/select-arrow.svg';
import { useDispatch } from 'react-redux';

const MySelect = ({
  outerCl,
  labelCl,
  selectCl,
  titleCl,
  title,
  icoCl,
  options,
  optionCl,
  placeholder,
  placeholderCl,
  selected,
  setSelected,
}) => {
  const dispatch = useDispatch();
  const onChange = (e) => {
    const value = e.target.value;
    dispatch(setSelected(value));
  }
  return (
    <div className={`${outerCl} select-outer`}>
      {title && <span className={`${titleCl} select-title`}>{title}</span>}
      <label className={`${labelCl} select-label`}>
        <select className={`${selectCl} select radius-mobile`} value={selected ? selected.value : placeholder} onChange={onChange} required>
          <option
            className={`${optionCl} ${placeholderCl} option option-placeholder`}
            value={placeholder}
            disabled
            hidden
          >
            {placeholder}
          </option>
          {options?.map((option) => (
            <option className={`${optionCl} option`} value={option.value} key={option.id}>
              {option.value}
            </option>
          ))}
        </select>
        <img
          className={`${icoCl} select-ico`}
          loading="lazy"
          src={selectArrow}
          width="20"
          height="15"
          alt="arrow"
        />
      </label>
    </div>
  );
};

export default MySelect;
