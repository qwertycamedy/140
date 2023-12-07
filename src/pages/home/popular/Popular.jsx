import MySection from 'components/_ui/section/MySection';
import cl from './Popular.module.scss';
import Courses from 'components/courses/Courses';
import { useSelector } from 'react-redux';
import { coursesSel } from 'store/slices/courses/coursesSlice';

const Popular = () => {
  const { courses } = useSelector(coursesSel);

  return (
    <MySection classNames={cl.popular}>
      <h3 className={`${cl.title} title title-section`}>Популярные курсы</h3>
      <Courses courses={courses} />
    </MySection>
  );
};

export default Popular;
