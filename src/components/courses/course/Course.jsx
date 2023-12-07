import { Link } from 'react-router-dom';
import cl from './Course.module.scss';

const Course = ({ course }) => {
  return (
    <Link
      className={cl.course}
      to={`/courses/${course.id}`}
      style={
        course.style && {
          background: course.style.background,
          color: course.style.color,
        }
      }
    >
      <p className={cl.category}>{course.category}</p>
      <h5 className={`${cl.title} title title-block`}>{course.title}</h5>
      <p className={`${cl.descr} text`}>{course.descr}</p>
    </Link>
  );
};

export default Course;
