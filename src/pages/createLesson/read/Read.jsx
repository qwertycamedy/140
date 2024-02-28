import MyTextarea from 'components/_ui/textarea/MyTextarea';
import outerCl from '../CreateLesson.module.scss';
import MyBotBar from 'components/_ui/botBar/MyBotBar';
import MyBtn from 'components/_ui/btn/MyBtn';
import MyAddRes from 'components/_ui/addRes/MyAddRes';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLessonSel,
  delFile,
  setDescr,
  setLessonPreview,
} from 'store/slices/createLesson/createLessonSlice';

const Read = () => {
  const dispatch = useDispatch();
  const { descr, lessonPreview } = useSelector(createLessonSel);

  const onLessonPreview = (curFile) => {
    dispatch(setLessonPreview(curFile));
  };

  return (
    <>
      <div className={outerCl.lesson}>
        <MyAddRes
          title={'Картинка урока'}
          btnText={'Загрузить'}
          handleFile={onLessonPreview}
          resourses={[lessonPreview]}
        />
        <MyTextarea
          placeholder={'Описание курса'}
          value={descr}
          setValue={setDescr}
        />
      </div>
      <MyBotBar>
        <MyBtn classNames={'w-full btn-bg'}>Отмена</MyBtn>
        <MyBtn classNames={'w-full btn-accent'}>Создать</MyBtn>
      </MyBotBar>
    </>
  );
};

export default Read;
