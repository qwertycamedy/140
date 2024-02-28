import outerCl from '../CreateLesson.module.scss';
import MyBotBar from 'components/_ui/botBar/MyBotBar';
import MyBtn from 'components/_ui/btn/MyBtn';
import { useSelector } from 'react-redux';
import { createLessonSel } from 'store/slices/createLesson/createLessonSlice';
import Questions from './questions/Questions';
import NewQues from './newQues/NewQues';

const Test = () => {
  const { testQuestions, toNewQues, newQues } = useSelector(createLessonSel);

  return (
    <>
      <div className={outerCl.lesson}>
        <Questions questions={testQuestions} toNewQues={toNewQues} />
        {toNewQues && <NewQues questions={testQuestions} newQues={newQues} />}
      </div>
      <MyBotBar>
        <MyBtn classNames={'w-full btn-bg'}>Отмена</MyBtn>
        <MyBtn classNames={'w-full btn-accent'}>Создать</MyBtn>
      </MyBotBar>
    </>
  );
};

export default Test;
