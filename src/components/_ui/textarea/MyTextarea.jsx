import { useDispatch } from 'react-redux';

const MyTextarea = ({
  outerCl,
  labelCl,
  areaCl,
  titleCl,
  title,
  placeholder,
  value,
  setValue,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`${outerCl} textarea-outer`}>
      {title && <span className={`${titleCl} textarea-title`}>{title}</span>}
      <label className={`${labelCl} textarea-label`}>
        <textarea
          className={`${areaCl} textarea radius-mobile`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => dispatch(setValue(e.target.value))}
        ></textarea>
        <span className={' textarea-placeholder'}>{placeholder}</span>
      </label>
    </div>
  );
};

export default MyTextarea;
