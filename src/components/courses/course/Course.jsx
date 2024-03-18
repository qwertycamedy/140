import { Link } from 'react-router-dom';
import cl from './Course.module.scss';

const Course = ({ course, classNames, categoryCl, titleCl, descrCl }) => {
  return (
    <Link
      className={cl.course + ` ${classNames}`}
      to={`/courses/${course.ID}`}
      style={{
        background: course.background_color,
        color: course.text_color === 'dark' ? '#000000' : '#ffffff',
      }}
    >
      <p className={`${categoryCl} text-10 color-gray`}>{course.category}</p>
      <h5 className={`${cl.title} title title-block ${titleCl}`}>
        {course.name}
      </h5>
      <p className={`${cl.descr} text-12 ${descrCl}`}>{course.descr}</p>
    </Link>
  );
};

export default Course;
