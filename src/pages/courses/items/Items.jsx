import MySection from 'components/_ui/section/MySection';
import cl from './Items.module.scss';
import Courses from 'components/courses/Courses';
import { useSelector } from 'react-redux';
import { coursesSel } from 'store/slices/courses/coursesSlice';

const Items = () => {
  const { courses } = useSelector(coursesSel);

  return (
      <Courses courses={courses} />
  );
};

export default Items;
