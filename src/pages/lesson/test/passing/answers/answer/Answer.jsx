import { clsx } from 'clsx';
import cl from './Answer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { markAnswer, testSel } from 'store/slices/test/testSlice';

const Answer = ({ ans, i }) => {
  const dispatch = useDispatch();
  const { curQuestion, questions } = useSelector(testSel);

  const onMark = () => {
    dispatch(markAnswer({ quesId: curQuestion.ID, ansId: ans.ID }));
  };

  return (
    <li
      className={clsx(cl.ans, { 'btn-accent': ans.is_marked })}
      onClick={onMark}
    >
      <span className={cl.index + ' title title-block'}>{i + 1}</span>
      <span className={cl.label + ' text text-12'}>{ans.label}</span>
    </li>
  );
};

export default Answer;
