import MySection from 'components/_ui/section/MySection';
import cl from './Hero.module.scss';
import img from 'assets/img/course-img.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import { addCourseToProfile, courseSel } from 'store/slices/course/courseSlice';
import MyBtn from 'components/_ui/btn/MyBtn';
import { useEffect } from 'react';

const Hero = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector(authSel);
  const { course } = useSelector(courseSel);
  const navigate = useNavigate();

  const linkPath = isAuth ? `profile/${user?.slug}` : '/auth/in';

  const addCourse = () => {
    if (isAuth) {
      dispatch(addCourseToProfile(course.ID)).then(() => {
        try {
          navigate(`/profile/${user.ID}`);
        } catch (err) {
          alert('Не удалось добавить курс в профиль')
          console.log('add course to profile error: ', err);
        }
      });
    } else {
      navigate('/auth/in');
    }
  };

  return (
    <MySection classNames={cl.hero}>
      <p className={cl.category + ' text-10 text'}>{course.category}</p>
      <h1 className={`${cl.title} title title-page`}>{course.name}</h1>
      <img
        className={`${cl.img} w-full br-4`}
        src={course.image}
        alt={`140 | ${course.name}`}
        width={344}
        height={189}
      />
      <p className={cl.descr + ' text-12'}>{course.descr}</p>
      <MyBtn className={cl.btn + ' btn btn-bg'} onClick={addCourse}>
        Получить
      </MyBtn>
    </MySection>
  );
};

export default Hero;
