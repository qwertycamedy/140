import { Link } from 'react-router-dom';
import cl from './Course.module.scss';

const Course = ({ course, classNames, categoryCl, titleCl, descrCl }) => {
  return (
    <Link
      className={cl.course + ` ${classNames}`}
      to={`/courses/${course.id}`}
      style={
        course.style && {
          background: course.style.background,
          color: course.style.color,
        }
      }
    >
      <p className={`cl.category ${categoryCl}`}>{course.category}</p>
      <h5 className={`${cl.title} title title-block ${titleCl}`}>{course.title}</h5>
      <p className={`${cl.descr} text ${descrCl}`}>{course.descr}</p>
    </Link>
  );
};

export default Course;
