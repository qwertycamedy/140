import MySection from 'components/_ui/section/MySection';
import outerCl from '../../LessonPage.module.scss';
import Bot from './bot/Bot';
import { useSelector } from 'react-redux';
import { testSel } from 'store/slices/test/testSlice';
import Answers from './answers/Answers';
import cl from './Passing.module.scss';
import Loader from 'components/loader/Loader';
import NotFound from 'components/notFound/NotFound';
import { loadStatus } from 'store/loadStatus';

const Passing = ({ course, lesson }) => {
  const { questions, curQuestion, questionsLoadStatus } = useSelector(testSel);

  console.log(questions, curQuestion);

  return (
    <MySection classNames={cl.passing}>
      {questionsLoadStatus === loadStatus.pending && <Loader />}
      {questionsLoadStatus === loadStatus.rejected && (
        <NotFound
          title={'Не удалось получить курсы'}
          subtitle={
            'К сожалению запрос получения вопросов не смог отработать правильно, обратитесь к тех. поддержке'
          }
        />
      )}
      {questionsLoadStatus === loadStatus.fulfilled && (
        <>
          {questions ? (
            <>
              <p className={`${outerCl.suptitle} text text-12 color-gray`}>
                Курс - {course.name} / Урок - {lesson.name}
              </p>
              <h1 className={`title title-section`}>{curQuestion?.label}</h1>
              <Answers answers={curQuestion?.answers} />
              <Bot />
            </>
          ) : (
            <NotFound title={'Урок не найден'} />
          )}
        </>
      )}
    </MySection>
  );
};

export default Passing;
