import MyPage from 'components/_ui/page/MyPage';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import Hero from './hero/Hero';
import Similar from 'components/courses/similar/Similar';
import {
  coursesSel,
  getRandomCourses,
} from 'store/slices/courses/coursesSlice';
import { useEffect } from 'react';
import {
  clearCourse,
  courseSel,
  getCourseById,
  setAddModal,
} from 'store/slices/course/courseSlice';
import { useParams } from 'react-router-dom';
import Loader from 'components/loader/Loader';
import NotFound from 'components/notFound/NotFound';
import { loadStatus } from 'store/loadStatus';
import AddModal from './addModal/AddModal';

const CoursePage = () => {
  const dispatch = useDispatch();
  const { course, courseLoadStatus } = useSelector(courseSel);
  const { randomCourses, randomCoursesLoadStatus } = useSelector(coursesSel);
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearCourse());
    dispatch(getCourseById({ courseId: id }));
    dispatch(getRandomCourses());
    dispatch(setAddModal(false));
  }, [id]);

  console.log(course);

  return (
    <>
      <Header goBack={true} />
      <MyPage
        metaTitle={`140 | ${
          courseLoadStatus === loadStatus.pending
            ? 'Загрузка'
            : courseLoadStatus === loadStatus.rejected
            ? 'Ошибка'
            : courseLoadStatus === loadStatus.fulfilled
            ? course.name
            : 'Страница курса'
        }`}
        metaDescr="140 | Страница курса"
      >
        {courseLoadStatus === loadStatus.pending && <Loader />}
        {courseLoadStatus === loadStatus.rejected && (
          <NotFound
            title={'Не удалось получить курс'}
            subtitle={
              'К сожалению запрос получения курсов не смог отработать правильно, обратитесь к тех. поддержке'
            }
          />
        )}
        {courseLoadStatus === loadStatus.fulfilled && (
          <>
            {course ? (
              <>
                <Hero />
                {/* <Benefits />
                <Requirements /> */}
                <Similar
                  courses={randomCourses}
                  coursesLoadStatus={randomCoursesLoadStatus}
                />
                <AddModal course={course} />
              </>
            ) : (
              <NotFound title={'Курс не найден'} />
            )}
          </>
        )}
      </MyPage>
      <Footer />
    </>
  );
};

export default CoursePage;
