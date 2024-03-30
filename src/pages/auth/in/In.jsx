import MySection from 'components/_ui/section/MySection';
import outerCl from '../AuthPage.module.scss';
import MyForm from 'components/_ui/form/MyForm';
import MyInput from 'components/_ui/input/MyInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  authSel,
  setEmail,
  setPass,
  setToIn,
  setToUp,
  setToAdmin,
  login,
  getProfile,
} from 'store/slices/auth/authSlice';
import MyBtn from 'components/_ui/btn/MyBtn';
import Other from 'components/auth/other/Other';
import { useNavigate } from 'react-router-dom';

const In = () => {
  const dispatch = useDispatch();
  const { toIn, toUp, email, pass } = useSelector(authSel);
  const navigate = useNavigate();

  const onLogin = () => {
    dispatch(login({ email, password: pass })).then(() => {
      try {
        dispatch(getProfile()).then((action) => {
          try {
            navigate(`/profile/${action.payload.data.ID}`);
          } catch (error) {
            alert('Неправильный email или пароль')
            console.log('get profile error: ', error);
          }
        });
      } catch (error) {
        console.log('login error: ', error);
      }
    });
  };

  return (
    <MySection
      classNames={outerCl.section}
      containerCl={outerCl.container}
      innerCl={outerCl.inner}
    >
      <h1 className={`${outerCl.title} title title-section`}>Авторизация</h1>
      <MyForm classnames={outerCl.form} onSubmit={onLogin}>
        <MyInput
          value={email}
          setValue={setEmail}
          type="email"
          required
          placeholder={'E-mail'}
        />
        <MyInput
          value={pass}
          setValue={setPass}
          type="password"
          required
          placeholder={'Пароль'}
        />
        <MyBtn classNames={outerCl.submit + ' btn-bg w-full'}>Войти</MyBtn>
      </MyForm>
      <Other
        toIn={toIn}
        toUp={toUp}
        setToIn={setToIn}
        setToUp={setToUp}
        setToAdmin={setToAdmin}
      />
    </MySection>
  );
};

export default In;
