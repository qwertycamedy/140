import MySection from 'components/_ui/section/MySection';
import cl from './Hero.module.scss';
import img from 'assets/img/course-img.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';

const Hero = () => {
  const {user} = useSelector(authSel);

  return (
    <MySection classNames={cl.hero}>
      <h1 className={`${cl.title} title title-page`}>Самая Вышка!</h1>
      <p className={cl.descr + ' text-12'}>
        Данный курс подойдет Вам, если Вы если Вы хотите добиться максимального балла!
        Данный курс подойдет Вам, если Вы хотите хотите хотите добиться максимального максимального балла!
        Данный курс подойдет Вам, если Вы хотите добиться максимального балла!  
      </p>
      <img className={`${cl.img} w-full br-4`} src={img} alt="course img" width={344} height={189} />
      <Link className={cl.btn + ' btn btn-bg'} to={`/${user?.slug}/highest/1`}>Начать</Link>
    </MySection>
  );
};

export default Hero;
