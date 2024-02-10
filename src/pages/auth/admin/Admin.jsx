import MyBtn from 'components/_ui/btn/MyBtn';
import MyForm from 'components/_ui/form/MyForm';
import MyInput from 'components/_ui/input/MyInput';
import MySection from 'components/_ui/section/MySection';
import outerCl from '../AuthPage.module.scss';
import { useSelector } from 'react-redux';
import { authSel, setEmail, setPass } from 'store/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { email, pass } = useSelector(authSel);
  const navigate = useNavigate();

  return (
    <MySection
      classNames={outerCl.section}
      containerCl={outerCl.container}
      innerCl={outerCl.inner}
    >
      <h1 className={`${outerCl.title} title title-section`}>Вход в админку</h1>
      <MyForm classnames={outerCl.form}>
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
      <button
        className={'link link-accent link-ul-a'}
        onClick={() => navigate(-1)}
      >
        Вернуться назад
      </button>
    </MySection>
  );
};

export default Admin;
