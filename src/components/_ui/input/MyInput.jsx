import React from 'react';
import { useDispatch } from 'react-redux';

const MyInput = ({
  outerCl,
  labelCl,
  inputCl,
  titleCl,
  title,
  icoCl,
  ico,
  type = 'text',
  required = true,
  placeholder,
  value,
  setValue,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`${outerCl} input-outer`}>
      {title && <span className={`${titleCl} input-title`}>{title}</span>}
      <label className={`${labelCl} input-label`}>
        <input
          type={type}
          className={`${inputCl} input radius-mobile`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => dispatch(setValue(e.target.value))}
        />
        {ico && (
          <img
            className={`${icoCl} input-ico`}
            loading="lazy"
            src={ico}
            width="30"
            height="30"
            alt={title ? title : 'img'}
          />
        )}
      </label>
    </div>
  );
};

export default MyInput;
