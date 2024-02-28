import MyBtn from 'components/_ui/btn/MyBtn';
import Question from './question/Question';
import { useDispatch } from 'react-redux';
import { setToNewQues } from 'store/slices/createLesson/createLessonSlice';

const Questions = ({ questions, toNewQues }) => {
  const dispatch = useDispatch();
  
  const toAdd = () => {
    dispatch(setToNewQues(true));
  }

  console.log(questions)

  return (
    <div className="flex flex-col gap-10">
      <h3 className="title title-block">Вопросы:</h3>
      {questions && questions.length > 0 && (
        <div className='flex flex-col gap-10'>
          {questions?.map((ques, i) => (
            <Question index={i + 1} question={ques} key={i} />
          ))}
        </div>
      )}

      {!toNewQues && <MyBtn classNames={'btn-bg w-full'} onClick={toAdd}>Добавить вопрос</MyBtn>}
    </div>
  );
};

export default Questions;
