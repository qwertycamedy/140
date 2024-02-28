import { useRef } from 'react';
import cl from './UserCourse.module.scss';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useSpring, animated } from 'react-spring';

const UserCourse = ({
  userSlug,
  course,
  index,
  currentUserCourse,
  onCourse,
  classNames,
  percentCl,
  titleCl,
}) => {
  const contentRef = useRef(null);
  
  //анимация открытия объекта
  const springProps = useSpring({
    opacity: course?.id === currentUserCourse?.id ? '1' : '0',
    maxHeight:
      course?.id === currentUserCourse?.id
        ? contentRef.current !== null
          ? contentRef.current.scrollHeight + 59 + 'px'
          : '0'
        : '0',
    config: { duration: 200 },
  });

  const formatIndex = (index) => {
    let newIndex = index + 1;
    if (newIndex < 10) {
      return `0${newIndex}`;
    }

    return newIndex;
  };
  const formattedIndex = formatIndex(index);
  
  //вычисление процента завершения курса
  const passedLessons = course.lessons.filter(lesson => lesson.isPassed);
  const passedPercent = (passedLessons.length / course.lessons.length) * 100;

  return (
    <div
      className={clsx(cl.course + ` ${classNames}`, {
        [cl.course__active]: course?.id === currentUserCourse?.id,
      })}
    >
      <div
        className={cl.head}
        style={
          course.style && {
            background: course.style.background,
            color: course.style.color,
          }
        }
        onClick={() => onCourse(course)}
      >
        <p className={`${cl.percent} + ${percentCl}`}>
          Завершен на - {passedPercent}%
        </p>
        <h5 className={`${cl.title} title title-block ${titleCl}`}>
          {formattedIndex} - {course.title}
        </h5>
        <p className={`${cl.count} text-12`}>
          <span>{course.lessons.length} уроков</span>
        </p>
      </div>
      <animated.div className={cl.lessons} style={springProps} ref={contentRef}>
        {course.lessons.map((lesson, i) => (
          <Link
            className={clsx(cl.lesson + ' text-12', {
              [cl.lesson__passed]: lesson.isPassed,
            })}
            key={i}
            to={`/${userSlug}/highest/${lesson.id}`}
          >
            Урок {i + 1} {lesson.label}
          </Link>
        ))}
      </animated.div>
    </div>
  );
};

export default UserCourse;