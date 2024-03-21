import MyBtn from 'components/_ui/btn/MyBtn';
import MyForm from 'components/_ui/form/MyForm';
import MyInput from 'components/_ui/input/MyInput';
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
  setToIn,
  setToUp,
} from 'store/slices/auth/authSlice';
import outerCl from '../AddModal.module.scss';
import { addCourseToProfile } from 'store/slices/course/courseSlice';
import Other from '../other/Other';
import { useNavigate } from 'react-router-dom';

const Up = ({ course }) => {
  const dispatch = useDispatch();
  const { toIn, toUp, name, email, pass, confirmPass } = useSelector(authSel);
  const navigate = useNavigate();

  const onReg = () => {
    if (pass === confirmPass) {
      dispatch(register({ name, email, password: pass })).then(() => {
        try {
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
            } catch (err) {
              console.log('reg error: ', err);
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
    <div className={outerCl.outer}>
      <h3 className={`${outerCl.title} title title-section`}>Регистрация</h3>
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
      <Other toIn={toIn} toUp={toUp} setToIn={setToIn} setToUp={setToUp} />
    </div>
  );
};

export default Up;
