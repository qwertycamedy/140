import MySection from 'components/_ui/section/MySection';
import cl from './Benefits.module.scss';
import outerCl from '../CoursePage.module.scss';
import ico from 'assets/img/course-ico.svg';

const Benefits = () => {
  return (
    <MySection classNames={cl.benefits}>
      <h3 className={`${outerCl.list__title} title title-section`}>
        Что Вы получите:
      </h3>
      <ul className={outerCl.list}>
        <li className={outerCl.list__item}>
          <div className={outerCl.list__ico_outer}>
            <img className={outerCl.list__ico} src={ico} alt="course ico" />
          </div>
          <p className={outerCl.list__label + ' text-12'}>
            Максимально большой багаж знаний
          </p>
        </li>
        <li className={outerCl.list__item}>
          <div className={outerCl.list__ico_outer}>
            <img className={outerCl.list__ico} src={ico} alt="course ico" />
          </div>
          <p className={outerCl.list__label + ' text-12'}>
            Станете сверхчеловеком. Почти хоумлендер
          </p>
        </li>
        <li className={outerCl.list__item}>
          <div className={outerCl.list__ico_outer}>
            <img className={outerCl.list__ico} src={ico} alt="course ico" />
          </div>
          <p className={outerCl.list__label + ' text-12'}>
            У Вас высохнет пипка и для саморазвития появится еще больше времени!
          </p>
        </li>
        <li className={outerCl.list__item}>
          <div className={outerCl.list__ico_outer}>
            <img className={outerCl.list__ico} src={ico} alt="course ico" />
          </div>
          <p className={outerCl.list__label + ' text-12'}>Страна будет гордиться Вами</p>
        </li>
      </ul>
    </MySection>
  );
};

export default Benefits;
