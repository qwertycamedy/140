import MyBtn from "components/_ui/btn/MyBtn";
import MyForm from "components/_ui/form/MyForm";
import MyInput from "components/_ui/input/MyInput";
import MySection from "components/_ui/section/MySection"
import Other from "components/auth/other/Other";
import { useSelector } from "react-redux";
import { authSel, setConfirmPass, setEmail, setName, setPass, setToAdmin, setToIn, setToUp } from "store/slices/auth/authSlice";
import outerCl from '../AuthPage.module.scss';

const Up = () => {
  const { toIn, toUp, name, email, pass, confirmPass } = useSelector(authSel);

  return (
    <MySection
      classNames={outerCl.section}
      containerCl={outerCl.container}
      innerCl={outerCl.inner}
    >
      <h1 className={`${outerCl.title} title title-section`}>Регистрация</h1>
      <MyForm classnames={outerCl.form}>
        <MyInput value={name} setValue={setName} type='text' required placeholder={'Имя'} />
        <MyInput value={email} setValue={setEmail} type='email' required placeholder={'E-mail'} />
        <MyInput value={pass} setValue={setPass} type='password' required placeholder={'Пароль'} />
        <MyInput value={confirmPass} setValue={setConfirmPass} type='password' required placeholder={'Подтвердите пароль'} />
        <MyBtn classNames={outerCl.submit + ' btn-bg w-full'}>Зарегистрироваться</MyBtn>
      </MyForm>
      <Other toIn={toIn} toUp={toUp} setToIn={setToIn} setToUp={setToUp} setToAdmin={setToAdmin} />
    </MySection>
  )
}

export default Up