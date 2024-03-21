import { useRef, useState } from 'react';
import cl from './UserCourse.module.scss';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { useSpring, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import { getCourseLessons } from 'store/slices/lessons/lessonsSlice';
import { loadStatus } from 'store/loadStatus';
import Loader from 'components/loader/Loader';
import NotFound from 'components/notFound/NotFound';

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
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const [lessons, setLessons] = useState(null);
  const [lessonsLoadStatus, setLessonsLoadStatus] = useState('idle');

  const onClick = (course) => {
    onCourse(course);
    setLessonsLoadStatus(loadStatus.pending);
    dispatch(getCourseLessons({ courseId: course.ID })).then((action) => {
      try {
        setLessonsLoadStatus(loadStatus.fulfilled);
        setLessons(action.payload.data);
      } catch (err) {
        setLessonsLoadStatus(loadStatus.rejected);
        console.log('get course lessons error: ', err);
      }
    });
  };

  const springProps = useSpring({
    opacity: course?.ID === currentUserCourse?.ID ? '1' : '0',
    maxHeight:
      course?.ID === currentUserCourse?.ID
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

  return (
    <div
      className={clsx(cl.course + ` ${classNames}`, {
        [cl.course__active]: course?.ID === currentUserCourse?.ID,
      })}
    >
      <div
        className={cl.head}
        style={{
          background: course.background_color,
          color: course.text_color === 'dark' ? '#000000' : '#ffffff',
        }}
        onClick={() => onClick(course)}
      >
        <p className="text text-10 color-gray">{course.category}</p>
        <h5 className={`${cl.title} title title-block ${titleCl}`}>
          {formattedIndex} - {course.name}
        </h5>
        <p className={`${cl.descr} text-12`}>{course.descr}</p>
      </div>
      <animated.div className={cl.lessons} style={springProps} ref={contentRef}>
        {lessonsLoadStatus === loadStatus.pending && <Loader />}
        {lessonsLoadStatus === loadStatus.rejected && (
          <NotFound
            title={'Не удалось получить уроки'}
            titleCl={cl.notFound_title}
            subtitle={
              'К сожалению запрос получения уроков не смог отработать правильно, обратитесь к тех. поддержке'
            }
            subtitleCl={cl.notFound_subtitle}
          />
        )}
        {lessonsLoadStatus === loadStatus.fulfilled && (
          <>
            {lessons && lessons.length ? (
              lessons?.map((lesson, i) => (
                <Link
                  className={clsx(cl.lesson + ' text-12', {
                    [cl.lesson__passed]: lesson.isPassed,
                  })}
                  key={i}
                  to={`/${course.ID}/${lesson.ID}`}
                >
                  <span className="color-gray">Урок {formatIndex(i)} - </span>{' '}
                  {lesson.name}
                </Link>
              ))
            ) : (
              <NotFound
                title={'Уроки не найдены'}
                titleCl={cl.notFound_title}
                subtitleCl={cl.notFound_subtitle}
              />
            )}
          </>
        )}
      </animated.div>
    </div>
  );
};

export default UserCourse;
