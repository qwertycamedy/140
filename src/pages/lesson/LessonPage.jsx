import MyPage from 'components/_ui/page/MyPage';
import Header from 'components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { authSel } from 'store/slices/auth/authSlice';
import { useParams } from 'react-router-dom';
import Test from './test/Test';
import { getLesson, lessonSel } from 'store/slices/lesson/lessonSlice';
import { useEffect } from 'react';
import { loadStatus } from 'store/loadStatus';
import Loader from 'components/loader/Loader';
import NotFound from 'components/notFound/NotFound';
import { courseSel, getCourseById } from 'store/slices/course/courseSlice';

const LessonPage = () => {
  const dispatch = useDispatch();
  const { course } = useSelector(courseSel);
  const { lesson, lessonLoadStatus } = useSelector(lessonSel);
  const { user } = useSelector(authSel);
  const { courseId, lessonId } = useParams();

  useEffect(() => {
      dispatch(getCourseById({ courseId }));
      dispatch(getLesson({ courseId, lessonId }));
  }, []);

  return (
    <>
      <Header goBack={true} />
      <MyPage
        metaTitle={`140 | ${
          lessonLoadStatus === loadStatus.pending
            ? 'Загрузка'
            : lessonLoadStatus === loadStatus.rejected
            ? 'Ошибка'
            : lessonLoadStatus === loadStatus.fulfilled
            ? lesson.name
            : 'Страница курса'
        }`}
        metaDescr={`140 | Урок ${lesson}`}
      >
        {/* {lessonFormat === 'read' ? (
          <Read lesson={lesson} />
        ) : lessonFormat === 'test' ? ( */}
        {lessonLoadStatus === loadStatus.pending && <Loader />}
        {lessonLoadStatus === loadStatus.rejected && (
          <NotFound
            title={'Не удалось получить курсы'}
            subtitle={
              'К сожалению запрос получения урока не смог отработать правильно, обратитесь к тех. поддержке'
            }
          />
        )}
        {lessonLoadStatus === loadStatus.fulfilled && (
          <>
            {lesson ? (
              <Test course={course} lesson={lesson} userSlug={user?.ID} />
            ) : (
              <NotFound title={'Урок не найден'} />
            )}
          </>
        )}
        {/* ) : lessonFormat === 'download' ? (
          <Download lesson={lesson} />
        ) : (
          'Урок не найден'
        )} */}
      </MyPage>
    </>
  );
};

export default LessonPage;
