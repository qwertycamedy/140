import MyPage from 'components/_ui/page/MyPage';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import MySection from 'components/_ui/section/MySection';
import cl from './CoursesPage.module.scss';
import Filters from './filters/Filters';
import Similar from 'components/courses/similar/Similar';
import { useDispatch, useSelector } from 'react-redux';
import {
  coursesSel,
  getAllCourses,
  getRandomCourses,
} from 'store/slices/courses/coursesSlice';
import Courses from 'components/courses/Courses';
import { useEffect } from 'react';
import { loadStatus } from 'store/loadStatus';
import Loader from 'components/loader/Loader';
import NotFound from 'components/notFound/NotFound';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, coursesLoadStatus, randomCourses, randomCoursesLoadStatus } =
    useSelector(coursesSel);

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getRandomCourses());
  }, []);

  return (
    <>
      <Header />
      <MyPage metaTitle="140 | Наши курсы" metaDescr="140 | Наши курсы">
        <MySection classNames={cl.section}>
          <h1 className={`${cl.title} title title-page`}>Все курсы</h1>
          <Filters />
          {coursesLoadStatus === loadStatus.pending && <Loader />}
          {coursesLoadStatus === loadStatus.rejected && (
            <NotFound
              title={'Не удалось получить курсы'}
              subtitle={
                'К сожалению запрос получения курсов не смог отработать правильно, обратитесь к тех. поддержке'
              }
            />
          )}
          {coursesLoadStatus === loadStatus.fulfilled && (
            <>
              {courses && courses.length ? (
                <Courses courses={courses} />
              ) : (
                <NotFound title={'Курсы не найдены'} />
              )}
            </>
          )}
        </MySection>
        {randomCoursesLoadStatus === loadStatus.pending && <Loader />}
        {randomCoursesLoadStatus === loadStatus.rejected && (
          <NotFound
            title={'Не удалось получить курсы'}
            subtitle={
              'К сожалению запрос получения курсов не смог отработать правильно, обратитесь к тех. поддержке'
            }
          />
        )}
        {randomCoursesLoadStatus === loadStatus.fulfilled && (
          <>
            {randomCourses && randomCourses.length ? (
              <Similar title={'Популярные курсы:'} courses={randomCourses} />
            ) : (
              <NotFound title={'Курсов нет'} />
            )}
          </>
        )}
      </MyPage>
      <Footer />
    </>
  );
};

export default CoursesPage;
