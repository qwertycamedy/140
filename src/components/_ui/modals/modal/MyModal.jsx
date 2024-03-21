
import { clsx } from 'clsx';

import closeImg from 'assets/img/close.svg';

const MyModal = ({
  children,
  overlayCl,
  modalCl,
  innerCl,
  contentCl,
  closeCl,
  modalIsOpen,
  closeModal,
}) => {

  return (
    <div
      className={clsx(
        `overlay modal__overlay fixed-block ${overlayCl}`,
        { 'active': modalIsOpen },
      )}
      onClick={closeModal}
    >
      <div
        className={`modal ${modalCl}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`modal__inner ${innerCl}`}>
          {closeModal && (
            <button
              className={`modal__close ${closeCl}`}
              onClick={closeModal}
            >
              <img src={closeImg} alt="close modal" />
            </button>
          )}
          <div className={`${contentCl} modal__content`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
