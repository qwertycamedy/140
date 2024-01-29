import MySection from 'components/_ui/section/MySection';
import outerCl from '../LessonPage.module.scss';
import img from 'assets/img/lesson-img.jpg';
import MyBtn from 'components/_ui/btn/MyBtn';

const Download = ({ lesson }) => {
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
      <MyBtn classNames={`${outerCl.btn} btn-bg max-w-280 m-x-auto fz-14`}>
        <svg
          className={'ico-24 stroke'}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M4 17.5V19.5C4 20.0304 4.21071 20.5391 4.58579 20.9142C4.96086 21.2893 5.46957 21.5 6 21.5H18C18.5304 21.5 19.0391 21.2893 19.4142 20.9142C19.7893 20.5391 20 20.0304 20 19.5V17.5M7 11.5L12 16.5M12 16.5L17 11.5M12 16.5V4.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Скачать док
      </MyBtn>
    </MySection>
  );
};

export default Download;
