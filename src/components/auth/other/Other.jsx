import { Link } from 'react-router-dom';
import cl from './Other.module.scss';
import { useDispatch } from 'react-redux';

const Other = ({ toIn, toUp, setToIn, setToUp, setToAdmin }) => {
  const dispatch = useDispatch();

  return (
    <div className={cl.other}>
      {toIn ? (
        <Link
          className={cl.link + ' link link-accent link-ul-a'}
          to={'/auth/up'}
          onClick={() => dispatch(setToUp())}
        >
          Регистрация
        </Link>
      ) : (
        toUp && (
          <Link
            className={cl.link + ' link link-accent link-ul-a'}
            to={'/auth/in'}
            onClick={() => dispatch(setToIn())}
          >
            Авторизация
          </Link>
        )
      )}

      <Link
        className={cl.link + ` ${cl.admin} link link-ul-a`}
        to={"https://qwertycamedy.ru"}
        target='_blank'
        onClick={() => dispatch(setToAdmin())}
      >
        Стать админом
      </Link>
    </div>
  );
};

export default Other;
