import { useRef } from 'react';
import cl from './MyFileInput.module.scss';
import MyBtn from '../btn/MyBtn';

const MyFileInput = ({handleFile}) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <>
      <MyBtn className={cl.btn + ' btn btn-bg w-full'} onClick={handleClick}>
        Загрузить
      </MyBtn>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: 'none' }} // Make the file input element invisible
      />
    </>
  );
};

export default MyFileInput;
