import MySection from 'components/_ui/section/MySection';
import cl from './Hero.module.scss';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <MySection classNames={cl.hero} innerCl={cl.inner}>
      <h1 className={cl.title + ' title title-main'}>
        Все в твоих руках!
        <br />
        Начни готовиться с нами прямо сейчас!
      </h1>
      <p className={cl.subtitle + ' text-12'}>
        Мы обязательно добьемся всего, чего захотим, но для этого нужно как следует постараться!
      </p>
      <Link  className={cl.btn + ' btn btn-bg'} to="/courses">
        Пройти курсы
      </Link>
    </MySection>
  );
};

export default Hero;
