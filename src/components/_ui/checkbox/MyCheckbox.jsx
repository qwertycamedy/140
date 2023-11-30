import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import checkIco from 'assets/img/check.svg';

const MyCheckbox = ({
  labelCl,
  checkCl,
  customCl,
  icoCl,
  textCl,
  linkCl,
  required,
  isChecked,
  setIsChecked,
}) => {
  const dispatch = useDispatch();
  const onChange = () => {
    dispatch(setIsChecked(!isChecked));
  };
  return (
    <label className="checkbox-label">
      <input
        className="checkbox"
        type="checkbox"
        required={required}
        checked={isChecked}
        onChange={onChange}
      />
      <span className="checkbox-custom">
        <img
          className="checkbox-custom-img"
          loading="lazy"
          src={checkIco}
          width="30"
          height="30"
          alt="check ico"
        />
      </span>
      <span className="checkbox-text">
        Согласен на обработку персональных данных.
        <Link to="#" className="link link-accent" target="_blank">
          Подробнее*
        </Link>
      </span>
    </label>
  );
};

export default MyCheckbox;
