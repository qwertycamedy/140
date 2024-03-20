import MySection from 'components/_ui/section/MySection';
import cl from './Courses.module.scss';
import UserCourse from './userCourse/UserCourse';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from 'components/loader/Loader';
import { loadStatus } from 'store/loadStatus';
import NotFound from 'components/notFound/NotFound';

const UserCourses = ({
  userSlug,
  courses,
  coursesLoadStatus,
  currentUserCourse,
  setCurrentUserCourse,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUserCourse(null));
  }, []);

  const onCourse = (item) => {
    if (currentUserCourse?.ID === item?.ID) {
      dispatch(setCurrentUserCourse(null));
    } else {
      dispatch(setCurrentUserCourse(item));
    }
  };

  return (
    <MySection>
      <h1 className="title title-section">Ваши курсы</h1>
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
            <div className={cl.courses}>
              {courses?.map((obj, i) => (
                <UserCourse
                  userSlug={userSlug}
                  course={obj}
                  key={obj.ID}
                  index={i}
                  currentUserCourse={currentUserCourse}
                  onCourse={onCourse}
                />
              ))}
            </div>
          ) : (
            <NotFound title={'Курсы не найдены'} />
          )}
        </>
      )}
    </MySection>
  );
};

export default UserCourses;
