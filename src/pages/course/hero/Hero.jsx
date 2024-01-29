import MySection from 'components/_ui/section/MySection';
import cl from './Hero.module.scss';
import img from 'assets/img/course-img.jpg';
import MyBtn from 'components/_ui/btn/MyBtn';

const Hero = () => {
  return (
    <MySection classNames={cl.hero}>
      <h1 className={`${cl.title} title title-page`}>Самая Вышка!</h1>
      <p className={cl.descr + ' text-12'}>
        Данный курс подойдет Вам, если Вы если Вы хотите добиться максимального балла!
        Данный курс подойдет Вам, если Вы хотите хотите хотите добиться максимального максимального балла!
        Данный курс подойдет Вам, если Вы хотите добиться максимального балла!  
      </p>
      <img className={`${cl.img} w-full br-4`} src={img} alt="course img" width={344} height={189} />
      <MyBtn classNames={cl.btn + ' btn-bg'}>Начать</MyBtn>
    </MySection>
  );
};

export default Hero;
