import MySection from 'components/_ui/section/MySection';
import resultsIco from 'assets/img/claps.svg';
import MyBtn from 'components/_ui/btn/MyBtn';
import outerCl from '../../LessonPage.module.scss';
import cl from './Results.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { testSel } from 'store/slices/test/testSlice';

const Results = ({ userSlug }) => {
  const { questions, correctAnswersCount } = useSelector(testSel);

  return (
    <MySection
      classNames={cl.section}
      containerCl={cl.container}
      innerCl={cl.inner}
    >
      <h1 className={`${cl.title} title title-page`}>Поздравляем!</h1>
      <p className={`${cl.text} text text-12`}>
        Вы набрали{' '}
        <span className="color-accent">
          {correctAnswersCount} верных ответов из {questions.length}.
        </span>
        <br /> Не останавливайтесь на достигнутом и переходите к следующему
        уроку
      </p>
      <img className={cl.img} src={resultsIco} alt="results ico" />
      <Link
        className={`${outerCl.btn} btn btn-bg max-w-280 m-x-auto fz-14`}
        to={`/profile/${userSlug}`}
      >
        Дальше-больше!
      </Link>
    </MySection>
  );
};

export default Results;
