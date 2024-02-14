import MyGroup from 'components/_ui/group/MyGroup';
import MyInput from 'components/_ui/input/MyInput';
import MyPage from 'components/_ui/page/MyPage';
import MyRadio from 'components/_ui/radio/MyRadio';
import MySection from 'components/_ui/section/MySection';
import MyTextarea from 'components/_ui/textarea/MyTextarea';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import cl from './CreateLesson.module.scss';
import {
  createLessonSel,
  setDescr,
  setSelectedType,
  setTitle,
} from 'store/slices/createLesson/createLessonSlice';

const CreateLesson = () => {
  const dispatch = useDispatch();
  const { title, descr, types, selectedType } = useSelector(createLessonSel);

  const onCreateLesson = () => {
    console.log('hello');
  };

  return (
    <>
      <Header goBack={true} />
      <MyPage metaTitle={`140 | Новый курс`} metaDescr={`140 | Новый курс`}>
        <MySection innerCl={'flex flex-col gap-12'}>
          <MyInput
            outerCl={cl.name__outer}
            inputCl={cl.name}
            placeholder={'Название курса*'}
            required={true}
            value={title}
            setValue={setTitle}
          />
          <MyGroup title={'Вид урока:'}>
            <MyRadio
              name={'lessonsType'}
              options={types}
              selected={selectedType}
              setSelected={setSelectedType}
            />
          </MyGroup>
          <MyTextarea
            placeholder={'Описание курса'}
            value={descr}
            setValue={setDescr}
          />
        </MySection>
      </MyPage>
      <Footer />
    </>
  );
};

export default CreateLesson;
