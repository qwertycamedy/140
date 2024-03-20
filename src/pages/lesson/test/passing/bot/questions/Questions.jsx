import { useDispatch, useSelector } from 'react-redux';
import { setCurQuestion, testSel } from 'store/slices/test/testSlice';
import cl from './Questions.module.scss';
import MyBtn from 'components/_ui/btn/MyBtn';
import { clsx } from 'clsx';

const Questions = () => {
  const dispatch = useDispatch();
  const { questions, curQuestion } = useSelector(testSel);

  const toQuestion = (ques) => {
    dispatch(setCurQuestion(ques));
  };

  return (
    <div className={cl.outer}>
      {questions?.map((q, i) => (
        <MyBtn
          classNames={clsx(cl.ques + ' btn-bg', {
            'btn-accent': q.ID === curQuestion?.ID,
          })}
          key={q.ID}
          onClick={() => toQuestion(q)}
        >
          {i + 1}
        </MyBtn>
      ))}
    </div>
  );
};

export default Questions;
