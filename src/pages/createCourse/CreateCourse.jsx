import MyBtn from 'components/_ui/btn/MyBtn';
import MyGroup from 'components/_ui/group/MyGroup';
import MyInput from 'components/_ui/input/MyInput';
import MyPage from 'components/_ui/page/MyPage';
import MyRadio from 'components/_ui/radio/MyRadio';
import MySection from 'components/_ui/section/MySection';
import MyTextarea from 'components/_ui/textarea/MyTextarea';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCourse,
  createCourseSel,
  setDescr,
  setSelectedGoal,
  setSelectedGuide,
  setTitle,
} from 'store/slices/createCourse/createCourseSlice';
import cl from './CreateCourse.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { authSel } from 'store/slices/auth/authSlice';
import MyBotBar from 'components/_ui/botBar/MyBotBar';

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(authSel);
  const {
    title,
    descr,
    goals,
    selectedGoal,
    guides,
    selectedGuide,
    createLoadStatus,
    createdCourse,
  } = useSelector(createCourseSel);

  const onGuide = (guide) => {
    dispatch(setSelectedGuide(guide));
  };

  const onCreateCourse = async () => {
    const actionResult = await dispatch(
      createCourse({
        category: 'test',
        title: 'test',
        descr: 'test',
        style_bg: '#F6F6DC',
        style_color: 'dark',
      }),
    );

    if (actionResult.meta.requestStatus === 'fulfilled') {
      // Передайте необходимые параметры для навигации, например, ID созданного курса
      navigate(`/admin/${user.slug}/${actionResult.payload.ID}/createLesson`);
    }
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
          <MyTextarea
            placeholder={'Описание курса'}
            value={descr}
            setValue={setDescr}
          />

          <MyGroup title={'Цель:'}>
            <MyRadio
              name={'goals'}
              options={goals}
              selected={selectedGoal}
              setSelected={setSelectedGoal}
            />
          </MyGroup>

          <MyGroup title={'Направление:'} groupCl={cl.guides}>
            {guides?.map((guide) => (
              <MyBtn
                classNames={clsx('fz-12', {
                  'btn-g': selectedGuide.id !== guide.id,
                  'btn-bg': selectedGuide.id === guide.id,
                })}
                key={guide.id}
                onClick={() => onGuide(guide)}
              >
                {guide.label}
              </MyBtn>
            ))}
          </MyGroup>

          <MyBotBar>
            <MyBtn classNames={'btn-bg w-full'} onClick={() => navigate(-1)}>
              Отмена
            </MyBtn>
            <MyBtn classNames={'btn-accent w-full'} onClick={onCreateCourse}>
              Далее
            </MyBtn>
          </MyBotBar>
        </MySection>
      </MyPage>
      <Footer />
    </>
  );
};

export default CreateCourse;
