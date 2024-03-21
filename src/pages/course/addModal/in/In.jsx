import outerCl from '../AddModal.module.scss';
import MyForm from 'components/_ui/form/MyForm';
import MyInput from 'components/_ui/input/MyInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  authSel,
  setEmail,
  setPass,
  setToIn,
  setToUp,
  login,
  getProfile,
} from 'store/slices/auth/authSlice';
import MyBtn from 'components/_ui/btn/MyBtn';
import { useNavigate } from 'react-router-dom';
import { addCourseToProfile } from 'store/slices/course/courseSlice';
import Other from '../other/Other';

const In = ({ course }) => {
  const dispatch = useDispatch();
  const { toIn, toUp, email, pass } = useSelector(authSel);
  const navigate = useNavigate();

  const onLogin = () => {
    dispatch(login({ email, password: pass })).then(() => {
      try {
        dispatch(getProfile()).then((action) => {
          try {
            dispatch(addCourseToProfile(course.ID)).then(() => {
              try {
                navigate(`/profile/${action.payload.data.ID}`);
              } catch (err) {
                alert('Не удалось добавить курс в профиль');
                console.log('add course to profile error: ', err);
              }
            });
          } catch (error) {
            console.log('get profile error: ', error);
          }
        });
      } catch (error) {
        console.log('login error: ', error);
      }
    });
  };

  return (
    <div className={outerCl.outer}>
      <h3 className={`${outerCl.title} title title-section`}>Авторизация</h3>
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
      <Other toIn={toIn} toUp={toUp} setToIn={setToIn} setToUp={setToUp}/>
    </div>
  );
};

export default In;
