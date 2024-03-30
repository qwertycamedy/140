import MyBtn from 'components/_ui/btn/MyBtn';
import MyForm from 'components/_ui/form/MyForm';
import MyInput from 'components/_ui/input/MyInput';
import MySection from 'components/_ui/section/MySection';
import Other from 'components/auth/other/Other';
import { useDispatch, useSelector } from 'react-redux';
import {
  authSel,
  getProfile,
  login,
  register,
  setConfirmPass,
  setEmail,
  setName,
  setPass,
  setToAdmin,
  setToIn,
  setToUp,
} from 'store/slices/auth/authSlice';
import outerCl from '../AuthPage.module.scss';
import { useNavigate } from 'react-router-dom';

const Up = () => {
  const dispatch = useDispatch();
  const { toIn, toUp, name, email, pass, confirmPass } = useSelector(authSel);
  const navigate = useNavigate();

  const onReg = () => {
    if(pass === confirmPass) {
      dispatch(register({ name, email, password: pass })).then(() => {
        try {
          dispatch(login({ email, password: pass })).then(() => {
            try {
              dispatch(getProfile()).then((action) => {
                try {
                  navigate(`/profile/${action.payload.data.ID}`);
                } catch (error) {
                  console.log('get profile error: ', error);
                }
              });
            } catch (err) {
              console.log('login error: ', err);
            }
          });
        } catch (err) {
          console.log('reg error: ', err);
        }
      });
    } else {
      alert('Пароли не совпадают');
    }
  };

  return (
    <MySection
      classNames={outerCl.section}
      containerCl={outerCl.container}
      innerCl={outerCl.inner}
    >
      <h1 className={`${outerCl.title} title title-section`}>Регистрация</h1>
      <MyForm classnames={outerCl.form} onSubmit={onReg}>
        <MyInput
          value={name}
          setValue={setName}
          type="text"
          required
          placeholder={'Имя'}
        />
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
        <MyInput
          value={confirmPass}
          setValue={setConfirmPass}
          type="password"
          required
          placeholder={'Подтвердите пароль'}
        />
        <MyBtn classNames={outerCl.submit + ' btn-bg w-full'}>
          Зарегистрироваться
        </MyBtn>
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

export default Up;
