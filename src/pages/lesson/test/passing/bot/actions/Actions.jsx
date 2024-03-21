import MyBtn from 'components/_ui/btn/MyBtn';
import cl from './Actions.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCorrectAnswersCount,
  setCurQuestion,
  setIsComplete,
  testSel,
} from 'store/slices/test/testSlice';

const Actions = () => {
  const dispatch = useDispatch();
  const { questions, curQuestion } = useSelector(testSel);

  const toPrev = () => {
    const newCur = questions.find((ques) => ques.ID === curQuestion.ID - 1);
    if (newCur) {
      dispatch(setCurQuestion(newCur));
    }
  };

  const toNext = () => {
    const newCur = questions.find((ques) => ques.ID === curQuestion.ID + 1);
    if (newCur) {
      dispatch(setCurQuestion(newCur));
    }
  };

  const toFinish = () => {
    const isConfirm = confirm('Вы действительно хотите завершить тест?');
    if (isConfirm) {
      let newCorrectCount = 0;
      questions.forEach((question) => {
        question.answers.forEach((answer) => {
          if (answer.is_marked && answer.is_correct) {
            newCorrectCount++;
            console.log('new correct count: ', newCorrectCount);
          }
        });
      });
      dispatch(setCorrectAnswersCount(newCorrectCount));
      dispatch(setIsComplete(true));
    }
  };

  return (
    <div className={cl.actions}>
      <MyBtn classNames={cl.prev + ` ${cl.btn} btn-bg`} onClick={toPrev}>
        <svg
          className="ico-18 stroke"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.727 3.687a1 1 0 1 0-1.454-1.374l-8.5 9a1 1 0 0 0 0 1.374l8.5 9.001a1 1 0 1 0 1.454-1.373L4.875 12z"
          ></path>
        </svg>
      </MyBtn>
      <MyBtn classNames={cl.next + ` ${cl.btn} btn-bg`} onClick={toNext}>
        <svg
          className="ico-18 stroke"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.727 3.687a1 1 0 1 0-1.454-1.374l-8.5 9a1 1 0 0 0 0 1.374l8.5 9.001a1 1 0 1 0 1.454-1.373L4.875 12z"
          ></path>
        </svg>
      </MyBtn>

      <MyBtn
        classNames={cl.finish + ` ${cl.btn} btn-accent`}
        onClick={toFinish}
      >
        Завершить
      </MyBtn>
    </div>
  );
};

export default Actions;
