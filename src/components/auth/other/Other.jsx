import { Link } from 'react-router-dom';
import cl from './Other.module.scss';
import { useDispatch } from 'react-redux';
import { setToIn, setToUp } from 'store/slices/auth/authSlice';

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
        to={"/auth/admin"}
        onClick={() => dispatch(setToAdmin())}
      >
        Админка
      </Link>
    </div>
  );
};

export default Other;
