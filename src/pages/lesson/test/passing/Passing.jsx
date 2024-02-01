import MySection from 'components/_ui/section/MySection';
import outerCl from '../../LessonPage.module.scss';
import Bot from './bot/Bot';
import { useDispatch, useSelector } from 'react-redux';
import { setCurQuestion, testSel } from 'store/slices/test/testSlice';
import Answers from './answers/Answers';
import { useEffect } from 'react';
import cl from './Passing.module.scss'

const Passing = ({ lesson }) => {
  const dispatch = useDispatch();
  const { questions, curQuestion } = useSelector(testSel);

  useEffect(() => {
    dispatch(setCurQuestion(questions[0]));
  }, [])

  console.log(questions)

  return (
    <MySection classNames={cl.passing}>
      <p className={`${outerCl.suptitle} text text-12 color-gray`}>
        Самая Вышка! / Урок {lesson}. Где я и куда идти?
      </p>
      <h1 className={`title title-section`}>
        {curQuestion?.id}. {curQuestion?.question}
      </h1>
      <Answers answers={curQuestion?.answers} />
      <Bot />
    </MySection>
  );
};

export default Passing;
