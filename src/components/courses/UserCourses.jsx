import MySection from 'components/_ui/section/MySection';
import cl from './Courses.module.scss';
import UserCourse from './userCourse/UserCourse';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const UserCourses = ({ userSlug, courses, currentUserCourse, setCurrentUserCourse }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentUserCourse(null));
  }, []);

  const onCourse = (item) => {
    if (currentUserCourse?.id === item?.id) {
      dispatch(setCurrentUserCourse(null));
    } else {
      dispatch(setCurrentUserCourse(item));
    }
  };

  return (
    <MySection>
      <h1 className="title title-section">Ваши курсы</h1>
      <div className={cl.courses}>
        {courses?.map((obj, i) => (
          <UserCourse
            userSlug={userSlug}
            course={obj}
            key={obj.id}
            index={i}
            currentUserCourse={currentUserCourse}
            onCourse={onCourse}
          />
        ))}
      </div>
    </MySection>
  );
};

export default UserCourses;
