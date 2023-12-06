import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const MyRadio = ({
  labelCl,
  checkCl,
  customCl,
  icoCl,
  textCl,
  linkCl,
  required,
  name,
  options,
  selected,
  setSelected,
}) => {
  const dispatch = useDispatch();

  const onChange = (radio) => {
    dispatch(setSelected(radio));
  };

  return (
    <>
      {options?.map((option) => (
        <label className="radio-label" key={option.value}>
          <input
            className="radio"
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={option.value === selected.value}
            onChange={() => onChange(option)}
            required={required}
          />
          <span className="radio-custom"></span>
          <span className="radio-text">
            {option.label}
          </span>
        </label>
      ))}
    </>
  );
};

export default MyRadio;
