import MyPage from 'components/_ui/page/MyPage';
import Header from 'components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { authSel, setToIn, setToUp } from 'store/slices/auth/authSlice';
import In from './in/In';
import Up from './up/Up';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cl from './AuthPage.module.scss';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { toIn, toUp } = useSelector(authSel);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('auth/in')) {
      dispatch(setToIn());
    } else if (pathname.includes('auth/up')) {
      dispatch(setToUp());
    }
  }, [dispatch, pathname]);

  return (
    <>
      <Header />
      <MyPage
        classNames={cl.main}
        metaTitle={`140 | ${toIn ? 'Вход' : toUp && 'Регистрация'}`}
        metaDescr={`140 | ${toIn ? 'Вход' : toUp && 'Регистрация'}`}
      >
        {toIn ? <In /> : toUp && <Up />}
      </MyPage>
    </>
  );
};

export default AuthPage;
