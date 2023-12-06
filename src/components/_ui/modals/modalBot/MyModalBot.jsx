import { useSwipeable } from 'react-swipeable';
import cl from './MyModalBot.module.scss';
import { clsx } from 'clsx';
import MyBtn from 'components/_ui/btn/MyBtn';

const MyModalBot = ({
  children,
  overlayCl,
  modalCl,
  innerCl,
  contentCl,
  btnLineCl,
  modalIsOpen,
  closeModal,
}) => {
  
  const onSwipeDown = useSwipeable({
    onSwipedDown: () => closeModal(),
  });

  return (
    <div
      className={clsx(
        `overlay modal__overlay fixed-block ${cl.overlay} ${overlayCl}`,
        {
          active: modalIsOpen,
        },
      )}
      onClick={closeModal}
    >
      <div
        className={clsx(`modal ${cl.modal} ${modalCl}`, {
          [cl.modal__active]: modalIsOpen,
        })}
        onClick={(e) => {
          e.stopPropagation();
        }}
        {...onSwipeDown}
      >
        <div className={`modal__inner ${cl.inner} ${innerCl}`}>
          <button className={cl.btn}>
            <span className={`${btnLineCl} ${cl.line}`}></span>
          </button>
          <div className={`${contentCl} ${cl.content} modal__content`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModalBot;
