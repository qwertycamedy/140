import MySection from 'components/_ui/section/MySection';
import { Link } from 'react-router-dom';
import outerCl from '../LessonPage.module.scss';
import img from 'assets/img/lesson-img.jpg';

const Test = ({ lesson }) => {
  return (
    <MySection>
      <p className={`${outerCl.suptitle} text text-12 color-gray`}>
        Самая Вышка!
      </p>
      <h1 className={`title title-page`}>Урок {lesson}. Где я и куда идти?</h1>
      <img
        className={outerCl.img + ' br-6 w-full'}
        src={img}
        alt="lesson img"
      />
      <p className={`${outerCl.text} text text-12`}>
        Привет, на данном курсе мы предоставим Вам все нужные материалы для
        обучения. Помните, что в первую очередь все зависит от Вас и Вы должны
        усердно трудиться, чтобы добиться желаемой цели. <br />
        <br /> Для начала мы предлагаем пройти небольшой тест, для того, чтобы
        Вы поняли, как работает наша система оценивания!
      </p>
      <Link className={`${outerCl.btn} btn btn-bg max-w-280 m-x-auto fz-14`}>
        TEST
      </Link>
    </MySection>
  );
};

export default Test;
