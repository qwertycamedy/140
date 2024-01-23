import MySection from 'components/_ui/section/MySection';
import outerCl from '../AuthPage.module.scss';
import MyForm from 'components/_ui/form/MyForm';
import MyInput from 'components/_ui/input/MyInput';
import { useSelector } from 'react-redux';
import { authSel, setEmail, setPass } from 'store/slices/auth/authSlice';
import MyBtn from 'components/_ui/btn/MyBtn';
import Other from 'components/auth/other/Other';

const In = () => {
  const { toIn, toUp, email, pass } = useSelector(authSel);

  return (
    <MySection
      classNames={outerCl.section}
      containerCl={outerCl.container}
      innerCl={outerCl.inner}
    >
      <h1 className={`${outerCl.title} title title-section`}>Авторизация</h1>
      <MyForm classnames={outerCl.form}>
        <MyInput value={email} setValue={setEmail} type='email' required placeholder={'E-mail или номер телефона'} />
        <MyInput value={pass} setValue={setPass} type='password' required placeholder={'Пароль'} />
        <MyBtn classNames={outerCl.submit + ' btn-bg w-full'}>Войти</MyBtn>
      </MyForm>
      <Other toIn={toIn} toUp={toUp} />
    </MySection>
  );
};

export default In;
