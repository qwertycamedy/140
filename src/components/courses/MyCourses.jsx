import MySection from 'components/_ui/section/MySection';
import cl from './Courses.module.scss';
import MyCourse from './myCourse/MyCourse';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const MyCourses = ({ courses, currentMyCourse, setCurrentMyCourse }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(setCurrentMyCourse(null));
  }, []);

  const onCourse = (item) => {
    if (currentMyCourse?.id === item?.id) {
      dispatch(setCurrentMyCourse(null));
    } else {
      dispatch(setCurrentMyCourse(item));
    }
  };

  return (
    <MySection>
      <h1 className="title title-section">Ваши курсы</h1>
      <div className={cl.courses}>
        {courses?.map((obj, i) => (
          <MyCourse
            course={obj}
            key={obj.id}
            index={i}
            currentMyCourse={currentMyCourse}
            onCourse={onCourse}
          />
        ))}
      </div>
    </MySection>
  );
};

export default MyCourses;
