import MyBtn from 'components/_ui/btn/MyBtn';
import MyModalBot from 'components/_ui/modals/modalBot/MyModalBot';
import cl from './Modal.module.scss';
import Guides from './guides/Guides';
import Goals from './goals/Goals';

const Modal = ({ modalIsOpen, closeModal, courses }) => {
  const coursesCount = courses?.length;

  return (
    <MyModalBot modalIsOpen={modalIsOpen} closeModal={closeModal}>
      <Goals />
      <Guides />
      <MyBtn classNames={cl.btn + ' btn-bg w-full'} onClick={closeModal}>
        Показать {courses.length}{' '}
        {coursesCount < 5 ? 'курса' : coursesCount < 2 ? 'курс' : 'курсов'}
      </MyBtn>
    </MyModalBot>
  );
};

export default Modal;
