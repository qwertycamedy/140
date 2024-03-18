import MySection from 'components/_ui/section/MySection';
import cl from './Popular.module.scss';
import Courses from 'components/courses/Courses';
import { useDispatch, useSelector } from 'react-redux';
import {
  coursesSel,
  getRandomCourses,
} from 'store/slices/courses/coursesSlice';
import { useEffect } from 'react';
import { loadStatus } from 'store/loadStatus';
import Loader from 'components/loader/Loader';
import NotFound from 'components/notFound/NotFound';

const Popular = () => {
  const dispatch = useDispatch();
  const { randomCourses, randomCoursesLoadStatus } = useSelector(coursesSel);

  useEffect(() => {
    if (
      !randomCourses &&
      randomCoursesLoadStatus !== loadStatus.fulfilled
    ) {
      dispatch(getRandomCourses());
    }
  }, []);

  return (
    <MySection classNames={cl.popular}>
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
          <h3 className={`${cl.title} title title-section`}>
            Популярные курсы
          </h3>
          {randomCourses && randomCourses.length ? (
            <Courses courses={randomCourses} />
          ) : (
            <NotFound title={'Курсов нет'} />
          )}
        </>
      )}
    </MySection>
  );
};

export default Popular;
