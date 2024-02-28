import MyBtn from 'components/_ui/btn/MyBtn';
import MyInput from 'components/_ui/input/MyInput';
import cl from './NewQues.module.scss';
import {
  addNewQues,
  clearNewQues,
  setNewQuesQues,
  setNewQuesTitle,
  setToNewQues,
} from 'store/slices/createLesson/createLessonSlice';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

const NewQues = ({ questions, newQues }) => {
  const dispatch = useDispatch();
  const isCanBe =
    newQues.questions.filter((ques) => ques.value.length > 1).length === 5 &&
    newQues.title.length > 1;

  const onCancel = () => {
    dispatch(setToNewQues(false));
    dispatch(clearNewQues());
  };

  const onAdd = () => {
    dispatch(addNewQues(newQues));
    dispatch(clearNewQues());
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <MyInput
          outerCl={cl.title__outer}
          inputCl={cl.title}
          placeholder={`Вопрос #${questions.length + 1}`}
          value={newQues.title}
          setValue={setNewQuesTitle}
        />
        <div className="flex flex-col gap-10">
          {newQues.questions.map((ques) => (
            <div className={`${cl.ques__outer} input-outer`} key={ques.id}>
              <label className={`${cl.ques__label} input-label`}>
                <input
                  type={'text'}
                  className={`${cl.ques} input radius-mobile`}
                  placeholder={
                    ques.id === 1 ? 'Верный вариант ответа*' : 'Вариант ответа'
                  }
                  value={ques.value}
                  onChange={(e) =>
                    dispatch(
                      setNewQuesQues({ id: ques.id, value: e.target.value }),
                    )
                  }
                />
                <span className={`${cl.ques__placeholder} input-placeholder`}>
                  {ques.id === 1 ? 'Верный вариант ответа*' : 'Вариант ответа'}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex gap-10 justify-between">
        <MyBtn classNames={'btn-bg w-full'} onClick={onCancel}>
          Отмена
        </MyBtn>
        <MyBtn
          classNames={clsx('btn-accent w-full', { 'btn-dis': !isCanBe })}
          disabled={!isCanBe}
          onClick={onAdd}
        >
          Добавить
        </MyBtn>
      </div>
    </div>
  );
};

export default NewQues;
