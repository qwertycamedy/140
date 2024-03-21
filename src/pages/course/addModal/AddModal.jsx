import MyModal from 'components/_ui/modals/modal/MyModal';
import { enableScroll } from 'hooks/enableScroll';
import { useDispatch, useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import { courseSel, setAddModal } from 'store/slices/course/courseSlice';
import In from './in/In';
import Up from './up/Up';
import cl from './AddModal.module.scss';

const AddModal = ({ course }) => {
  const dispatch = useDispatch();
  const { toIn, toUp } = useSelector(authSel);
  const { addModal } = useSelector(courseSel);

  const onCloseModal = () => {
    dispatch(setAddModal(false));
    enableScroll();
  };

  return (
    <MyModal
      overlayCl={cl.overlay}
      modalCl={cl.modal}
      innerCl={cl.inner}
      contentCl={cl.context}
      modalIsOpen={addModal}
      closeModal={onCloseModal}
      closeCl={cl.close}
    >
      <div className={cl.head}>
        <h3 className={cl.title + ' title title-section'}>
          Войдите и получите курс:
        </h3>
        <p className={cl.text + ' text text-16 color-accent'}>{course.name}</p>
      </div>
      {toIn && <In course={course} />}
      {toUp && <Up course={course} />}
    </MyModal>
  );
};

export default AddModal;
