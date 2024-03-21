import { useDispatch } from 'react-redux';
import cl from './Other.module.scss';

const Other = ({ toIn, setToIn, toUp, setToUp }) => {
  const dispatch = useDispatch();
  return (
    <div className={cl.other}>
      {toIn ? (
        <button
          className={cl.link + ' link link-accent link-ul-a'}
          onClick={() => dispatch(setToUp())}
        >
          Регистрация
        </button>
      ) : (
        toUp && (
          <button
            className={cl.link + ' link link-accent link-ul-a'}
            onClick={() => dispatch(setToIn())}
          >
            Авторизация
          </button>
        )
      )}
    </div>
  );
};

export default Other;
