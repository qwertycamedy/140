import MySection from 'components/_ui/section/MySection';
import cl from './Hero.module.scss';
import img from 'assets/img/course-img.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import { courseSel } from 'store/slices/course/courseSlice';

const Hero = () => {
  const { user } = useSelector(authSel);
  const { course } = useSelector(courseSel);

  return (
    <MySection classNames={cl.hero}>
      <p className={cl.category + ' text-10 text'}>{course.category}</p>
      <h1 className={`${cl.title} title title-page`}>{course.name}</h1>
      <p className={cl.descr + ' text-12'}>{course.descr}</p>
      <img
        className={`${cl.img} w-full br-4`}
        src={course.image}
        alt={`140 | ${course.name}`}
        width={344}
        height={189}
      />
      <Link className={cl.btn + ' btn btn-bg'} to={`/${user?.slug}/highest/1`}>
        Получить
      </Link>
    </MySection>
  );
};

export default Hero;
