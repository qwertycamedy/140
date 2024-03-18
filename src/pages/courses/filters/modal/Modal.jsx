import MyBtn from 'components/_ui/btn/MyBtn';
import MyModalBot from 'components/_ui/modals/modalBot/MyModalBot';
import cl from './Modal.module.scss';
import Categories from './categories/Categories';
import { useSelector } from 'react-redux';
import { coursesSel } from 'store/slices/courses/coursesSlice';
import { clsx } from 'clsx';
import { loadStatus } from 'store/loadStatus';
import Loader from 'components/loader/Loader';

const Modal = ({ modalIsOpen, closeModal, courses }) => {
  const { filtersLoadStatus } = useSelector(coursesSel);
  const coursesCount = courses?.length;

  return (
    <MyModalBot modalIsOpen={modalIsOpen} closeModal={closeModal}>
      <Categories />
      <MyBtn
        classNames={clsx(cl.btn + ' btn-bg w-full', {
          'btn-dis':
            filtersLoadStatus === loadStatus.rejected ||
            filtersLoadStatus === loadStatus.pending,
        })}
        disabled={
          filtersLoadStatus === loadStatus.rejected ||
          filtersLoadStatus === loadStatus.pending
        }
        onClick={closeModal}
      >
        {filtersLoadStatus === "idle" && "Искать"}
        {filtersLoadStatus === loadStatus.pending && <Loader outerCl={cl.loader_outer} loaderCl={cl.loader} />}
        {filtersLoadStatus === loadStatus.rejected && <>Курсы не найдены</>}
        {filtersLoadStatus === loadStatus.fulfilled && (
          <>
            Показать {coursesCount}{' '}
            {coursesCount < 5 ? 'курса' : coursesCount < 2 ? 'курс' : 'курсов'}
          </>
        )}
      </MyBtn>
    </MyModalBot>
  );
};

export default Modal;
