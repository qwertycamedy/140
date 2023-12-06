import MySection from 'components/_ui/section/MySection';
import cl from './Hero.module.scss';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <MySection classNames={cl.hero} innerCl={cl.inner}>
      <h1 className={cl.title + ' title title-main'}>
        Все в твоих руках!
        <br />
        Просто дай на лапу комиссии на тестировании
      </h1>
      <p className={cl.subtitle + ' text'}>
        Но если ты вдруг в себя поверил, то мы поможем сдать тебе честно!
      </p>
      <Link  className={cl.btn + ' btn btn-bg'} to="/courses">
        Пройти курсы
      </Link>
    </MySection>
  );
};

export default Hero;
