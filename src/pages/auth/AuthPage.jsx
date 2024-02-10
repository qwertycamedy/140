import MyPage from 'components/_ui/page/MyPage';
import Header from 'components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  authSel,
  clearFields,
  setToAdmin,
  setToIn,
  setToUp,
} from 'store/slices/auth/authSlice';
import In from './in/In';
import Up from './up/Up';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import cl from './AuthPage.module.scss';
import Admin from './admin/Admin';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { toIn, toUp, toAdmin } = useSelector(authSel);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('auth/in')) {
      dispatch(setToIn());
    } else if (pathname.includes('auth/up')) {
      dispatch(setToUp());
    } else if (pathname.includes('auth/admin')) {
      dispatch(setToAdmin());
    }

    dispatch(clearFields());
  }, [pathname]);

  return (
    <>
      <Header />
      <MyPage
        classNames={cl.main}
        metaTitle={`140 | ${
          toIn ? 'Вход' : toUp ? 'Регистрация' : toAdmin && 'Вход в админку'
        }`}
        metaDescr={`140 | ${
          toIn ? 'Вход' : toUp ? 'Регистрация' : toAdmin && 'Вход в админку'
        }`}
      >
        {toIn ? <In /> : toUp ? <Up /> : toAdmin && <Admin />}
      </MyPage>
    </>
  );
};

export default AuthPage;
