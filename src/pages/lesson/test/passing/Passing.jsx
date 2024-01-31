import MySection from 'components/_ui/section/MySection';
import outerCl from '../../LessonPage.module.scss';
import Bot from './bot/Bot';
import { useSelector } from 'react-redux';
import { testSel } from 'store/slices/test/testSlice';
import Answers from './answers/Answers';

const Passing = ({ lesson }) => {
  const { questions, curQuestion } = useSelector(testSel);

  return (
    <MySection>
      <p className={`${outerCl.suptitle} text text-12 color-gray`}>
        Самая Вышка! / Урок {lesson}. Где я и куда идти?
      </p>
      <h1 className={`title title-section`}>
        {curQuestion?.id}. {curQuestion?.question}
      </h1>
      <Answers variants={curQuestion?.answers} />
      <Bot />
    </MySection>
  );
};

export default Passing;
