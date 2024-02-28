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
  setResourses,
} from 'store/slices/createLesson/createLessonSlice';

const Resourse = () => {
  const dispatch = useDispatch();
  const { descr, lessonPreview, resourses } = useSelector(createLessonSel);

  const onLessonPreview = (curFile) => {
    dispatch(setLessonPreview(curFile));
  };

  const onFile = (curFile) => {
    dispatch(setResourses(curFile));
  };

  const onDelFile = (curFile) => {
    dispatch(delFile(curFile));
  };

  return (
    <>
      <div className={outerCl.lesson}>
        <MyAddRes
          title={'Картинка урока (необязательно)'}
          btnText={'Загрузить'}
          handleFile={onLessonPreview}
          resourses={[lessonPreview]}
        />
        <MyTextarea
          placeholder={'Описание курса'}
          value={descr}
          setValue={setDescr}
        />
        <MyAddRes
          title={'Ресурсы урока'}
          btnText={'Загрузить'}
          handleFile={onFile}
          delFile={onDelFile}
          resourses={resourses}
        />
      </div>
      <MyBotBar>
        <MyBtn classNames={'w-full btn-bg'}>Отмена</MyBtn>
        <MyBtn classNames={'w-full btn-accent'}>Создать</MyBtn>
      </MyBotBar>
    </>
  );
};

export default Resourse;
